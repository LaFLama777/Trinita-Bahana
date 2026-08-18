from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
from pathlib import Path
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
import httpx
from pydantic import BaseModel, Field, EmailStr, ConfigDict, BeforeValidator
from typing import List, Optional, Annotated
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
ADMIN_EMAIL = os.environ["ADMIN_EMAIL"]

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise


def _quotation_email_html(name: str, company: str, email: str, phone: str, service: str, message: str) -> str:
    def row(label: str, value: str) -> str:
        return (
            f'<tr><td style="padding:8px 16px;font-size:13px;color:#5b6b7d;width:130px;vertical-align:top">{label}</td>'
            f'<td style="padding:8px 16px;font-size:13px;color:#0A1118;font-weight:600">{value}</td></tr>'
        )

    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="background:#F4F6F8;padding:32px 0"><tr><td align="center">'
        '<table role="presentation" width="560" cellpadding="0" cellspacing="0" '
        'style="background:#ffffff;border-radius:12px;overflow:hidden;font-family:Arial,sans-serif">'
        '<tr><td style="background:#002B5B;padding:24px 32px">'
        f'<span style="color:#C89B3C;font-size:11px;letter-spacing:3px;text-transform:uppercase">{escape(EMAIL_FROM_NAME)}</span>'
        '<h1 style="color:#ffffff;font-size:20px;margin:8px 0 0">Permintaan Penawaran Baru</h1></td></tr>'
        '<tr><td style="padding:16px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
        + row("Nama", escape(name))
        + row("Perusahaan", escape(company))
        + row("Email", escape(email))
        + row("Telepon", escape(phone))
        + row("Layanan", escape(service))
        + row("Pesan", escape(message))
        + '</table></td></tr>'
        '<tr><td style="padding:16px 32px;border-top:1px solid #eef1f4;font-size:11px;color:#8a94a0">'
        f'Email ini dikirim otomatis oleh website {escape(EMAIL_FROM_NAME)} setiap ada permintaan penawaran baru.'
        '</td></tr></table></td></tr></table>'
    )


PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        doc = self.model_dump(by_alias=True, exclude_none=True)
        doc.pop("_id", None)
        return doc

    @classmethod
    def from_mongo(cls, doc: dict):
        if doc and "_id" in doc:
            doc["_id"] = str(doc["_id"])
        return cls(**doc)


class Quotation(BaseDocument):
    name: str
    company: str
    email: EmailStr
    phone: str
    service: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class QuotationCreate(BaseModel):
    name: str
    company: str
    email: EmailStr
    phone: str
    service: str
    message: str


@api_router.get("/")
async def root():
    return {"message": "CV Trinita Bahana Persada API"}


@api_router.post("/quotations", response_model=Quotation)
async def create_quotation(input: QuotationCreate):
    quotation = Quotation(**input.model_dump())
    doc = quotation.to_mongo()
    doc["created_at"] = doc["created_at"].isoformat()
    result = await db.quotations.insert_one(doc)
    created = await db.quotations.find_one({"_id": result.inserted_id})
    if isinstance(created.get("created_at"), str):
        created["created_at"] = datetime.fromisoformat(created["created_at"])
    try:
        email_id = await send_email(
            to=ADMIN_EMAIL,
            subject=f"Quotation Request Baru - {input.service}",
            html=_quotation_email_html(
                input.name, input.company, input.email, input.phone, input.service, input.message
            ),
        )
        logger.info(f"Quotation notification email sent, id={email_id}")
    except Exception as e:
        logger.error(f"Quotation email notification failed: {e}")
    return Quotation.from_mongo(created)


@api_router.get("/quotations", response_model=List[Quotation])
async def list_quotations():
    docs = await db.quotations.find().sort("_id", -1).to_list(500)
    result = []
    for doc in docs:
        if isinstance(doc.get("created_at"), str):
            doc["created_at"] = datetime.fromisoformat(doc["created_at"])
        result.append(Quotation.from_mongo(doc))
    return result


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
