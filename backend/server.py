from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
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
