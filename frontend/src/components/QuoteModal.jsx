import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MessageCircle, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import { useQuote } from "@/context/QuoteContext";
import { WHATSAPP_URL } from "@/i18n";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initialForm = { name: "", company: "", email: "", phone: "", service: "", message: "" };

const QuoteModal = () => {
  const { t } = useLanguage();
  const { open, setOpen } = useQuote();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/quotations`, form);
      toast.success(t.form.success);
      setForm(initialForm);
      setOpen(false);
    } catch (err) {
      toast.error(t.form.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        data-testid="quote-modal"
        className="max-h-[90vh] overflow-y-auto border-navy/10 bg-white sm:max-w-lg"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold text-navy" data-testid="quote-modal-title">
            {t.form.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-ink/60">
            {t.form.desc}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="quote-name" className="text-xs font-semibold text-navy">{t.form.name}</Label>
              <Input
                id="quote-name"
                data-testid="quote-input-name"
                required
                value={form.name}
                onChange={set("name")}
                className="border-navy/15 focus-visible:ring-gold"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="quote-company" className="text-xs font-semibold text-navy">{t.form.company}</Label>
              <Input
                id="quote-company"
                data-testid="quote-input-company"
                required
                value={form.company}
                onChange={set("company")}
                className="border-navy/15 focus-visible:ring-gold"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="quote-email" className="text-xs font-semibold text-navy">{t.form.email}</Label>
              <Input
                id="quote-email"
                data-testid="quote-input-email"
                type="email"
                required
                value={form.email}
                onChange={set("email")}
                className="border-navy/15 focus-visible:ring-gold"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="quote-phone" className="text-xs font-semibold text-navy">{t.form.phone}</Label>
              <Input
                id="quote-phone"
                data-testid="quote-input-phone"
                required
                value={form.phone}
                onChange={set("phone")}
                className="border-navy/15 focus-visible:ring-gold"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-navy">{t.form.service}</Label>
            <Select
              value={form.service}
              onValueChange={(v) => setForm({ ...form, service: v })}
              required
            >
              <SelectTrigger data-testid="quote-select-service" className="border-navy/15 focus:ring-gold">
                <SelectValue placeholder={t.form.servicePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {t.services.items.map((s) => (
                  <SelectItem key={s.title} value={s.title} data-testid={`quote-service-${s.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}>
                    {s.title}
                  </SelectItem>
                ))}
                <SelectItem value="other" data-testid="quote-service-other">{t.form.other}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="quote-message" className="text-xs font-semibold text-navy">{t.form.message}</Label>
            <Textarea
              id="quote-message"
              data-testid="quote-input-message"
              required
              rows={4}
              value={form.message}
              onChange={set("message")}
              className="border-navy/15 focus-visible:ring-gold"
            />
          </div>

          <button
            data-testid="quote-submit-button"
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-navy-600 disabled:opacity-60"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {loading ? t.form.sending : t.form.submit}
          </button>

          <a
            data-testid="quote-whatsapp-alt"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1DA851] transition-colors duration-300 hover:text-[#178a43]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t.form.waAlt}
          </a>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
