import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2, Smartphone, Sliders, Check, ArrowRight, Phone,
  Lightbulb, Wand2, TrendingUp
} from "lucide-react";
import logo from "./assets/logo_header_h80@2x.png";

// APPS_SCRIPT_URL -> wklej tutaj URL z Deploy > Web app (np. https://script.google.com/macros/s/AK.../exec)
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyt8TyOCZ__-OGJdjYPiWrXdsKJ8Y_raL0hZcIE9VMlUPn3oPsy2jPJgzSeXrCV0y6I/exec";

const COLORS = { primary: "#031b31", accent: "#F4C542", card: "#0b2a46" };

const Button = ({ as: Tag = "button", className = "", children, style, ...props }) => (
  <Tag
    className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold hover:opacity-90 active:opacity-80 transition ${className}`}
    style={{ background: COLORS.accent, color: "#031b31", ...(style || {}) }}
    {...props}
  >
    {children}
  </Tag>
);

const OutlineButton = ({ as: Tag = "button", className = "", children, ...props }) => (
  <Tag
    className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold border border-white/20 text-white hover:border-white/40 transition ${className}`}
    {...props}
  >
    {children}
  </Tag>
);

const Pill = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide"
        style={{ color: COLORS.accent, backgroundColor: "rgba(244,197,66,0.08)", border: "1px solid rgba(244,197,66,0.35)" }}>
    <Icon className="w-3.5 h-3.5" />
    {children}
  </span>
);

const Card = ({ className = "", children, style }) => (
  <div
    className={`rounded-2xl backdrop-blur border border-white/10 shadow-sm hover:shadow-md transition ${className}`}
    style={{ backgroundColor: COLORS.card, ...(style || {}) }}
  >
    {children}
  </div>
);

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>{children}</section>
);

const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 md:px-6 ${className}`}>{children}</div>
);

const ICON_CLASS = "w-7 h-7 md:w-8 md:h-8";

/* services array (unchanged semantics) */
const services = [
  {
    id: "zakupy",
    title: "Zakupy i magazyn",
    icon: <Code2 className={ICON_CLASS} strokeWidth={2} />,
    bullets: ["Centralizacja stanów i dostawców", "Propozycje zamówień (rotacje 60/365 dni)", "Min/opt, lead time i reguły zamówień"],
    details: [
      "Automatyzacja propozycji zamówień oparta o rotacje i porównanie sprzedaż/zakupy.",
      "Integracje z grupami zakupowymi i eksporty gotowe do Subiekt (EPP/CSV)."
    ],
  },
  {
    id: "sprzedaz",
    title: "Sprzedaż / CRM",
    icon: <Smartphone className={ICON_CLASS} strokeWidth={2} />,
    bullets: ["Rejestracja klientów i zleceń", "Proste generator ofert", "Integracja procesów sprzedażowych"],
    details: [
      "Prosty CRM operacyjny dla handlowców: telefon, historia, zamówienia i priorytety.",
      "Generator ofert i kalkulatory, gotowe do wysłania klientowi w kilka klików."
    ],
  },
  {
    id: "serwis",
    title: "Serwis i operacje terenowe",
    icon: <Lightbulb className={ICON_CLASS} strokeWidth={2} />,
    bullets: ["Aplikacje terenowe offline-first", "Check-listy i audyty", "Raporty serwisowe i zdjęcia"],
    details: [
      "Mobilne aplikacje dla serwisantów z trybem offline i synchronizacją.",
      "Rejestracja zadań, zdjęć i historii prac — łatwe raporty i audyty."
    ],
  },
  {
    id: "automatyzacje",
    title: "Automatyzacje i API",
    icon: <Sliders className={ICON_CLASS} strokeWidth={2} />,
    bullets: ["Skrypty i ETL", "Integracje API (Subiekt, inne ERP)", "Automatyczne harmonogramy zadań"],
    details: [
      "Procesy ETL i automatyczne synchronizacje ograniczające ręczne prace.",
      "Zadania cykliczne: synchronizacja stanów, cenników i exporty."
    ],
  },
  {
    id: "raporty",
    title: "Dashboardy i raporty",
    icon: <TrendingUp className={ICON_CLASS} strokeWidth={2} />,
    bullets: ["Power BI / kokpity decyzyjne", "KPIs na pulpicie zarządu", "Raporty eksportowalne"],
    details: [
      "Model danych pod raportowanie i gotowe panele KPI dla codziennej decyzji.",
      "Eksporty i alerty, które dają natychmiastowy efekt operacyjny."
    ],
  },
  {
    id: "aplikacje",
    title: "Aplikacje dedykowane",
    icon: <Code2 className={ICON_CLASS} strokeWidth={2} />,
    bullets: ["Szybkie PoC (1–2 tyg.)", "Aplikacje no-/low-code i web", "Integracje z Subiekt i innymi źródłami"],
    details: [
      "Buduję lżejsze aplikacje dopasowane do procesów (serwis, sprzedaż, magazyn).",
      "Szybkie iteracje: PoC → walidacja → produkcja."
    ],
  },
];

const ServiceCard = ({ s }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 text-white">
        <div className="p-2 rounded-3xl bg-white/10 text-[#F4C542]">{s.icon}</div>
        <h3 className="text-xl font-semibold">{s.title}</h3>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-slate-200">
        {s.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="w-5 h-5 mt-0.5" style={{ color: COLORS.accent }} strokeWidth={2.25} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-sm text-white/80 hover:text-white underline underline-offset-4"
        >
          {open ? "Zwiń" : "Dowiedz się więcej"}
        </button>
      </div>
      {open && (
        <div className="mt-3 text-sm text-slate-200/90">
          <ul className="list-disc ml-5 space-y-1">
            {s.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-6">
        <a href="#kontakt">
          <OutlineButton>
            Zapytaj o wycenę <ArrowRight className="w-4 h-4" />
          </OutlineButton>
        </a>
      </div>
    </Card>
  );
};

export default function Landing() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  // handleSubmit wysyła FormData (unika preflight)
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      setSending(true);
      setSent(false);

      const fd = new FormData(form);
      // jeśli chcesz, możesz dodać dodatkowe pola do fd tutaj, np. fd.append('extra', 'value')

      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: fd
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }

      // aplikacja Apps Script powinna zwrócić JSON {ok:true} — spróbuj sparsować
      const data = await res.json().catch(() => null);
      if (data && data.ok === false) throw new Error(data.error || "Serwer zwrócił błąd");

      setSent(true);
      form.reset();
      alert("Wiadomość wysłana — dziękujemy!");
    } catch (err) {
      console.error("Contact form error:", err);
      alert("Nie udało się wysłać formularza: " + (err.message || err));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen text-white" style={{ background: COLORS.primary }}>
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#031b31]/80 backdrop-blur">
        <Container className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Comfort Connector"
              className="h-22 md:h-23 w-auto rounded-lg"
              style={{ filter: "drop-shadow(0 0 8px rgba(0,0,0,0.25))" }}
            />
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/90">
            <a href="#uslugi" className="hover:text-white">Usługi</a>
            <a href="#case" className="hover:text-white">Nasze realizacje</a>
            <a href="#kontakt" className="hover:text-white">Kontakt</a>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+48505725281" className="flex items-center gap-2 text-white/90 hover:text-white">
              <Phone className="w-4 h-4" />
              <span>+48 505 725 281</span>
            </a>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <Section>
        <Container>
          <div className="grid md:grid-cols-2 items-center gap-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Automatyzacja procesów zakupów, magazynu i serwisu dla MŚP.
              </h1>
              <p className="mt-4 text-lg text-slate-200/90 max-w-xl">
                Łączę systemy ERP, lekkie aplikacje terenowe i raporty, żeby dać jedną wersję prawdy — mniej błędów, krótszy czas realizacji i niższe koszty operacyjne.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a href="#kontakt"><Button>Umów diagnozę (30–45 min)</Button></a>
                <a href="#case"><OutlineButton>Oferta i realizacje</OutlineButton></a>
              </div>
              <p className="mt-4 text-sm text-slate-400 max-w-lg">
                Specjalizuję się w integracjach z Subiekt Nexo Pro, automatyzacjach zamówień, aplikacjach offline-first i dashboardach decyzji.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Card className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-extrabold" style={{ color: COLORS.accent }}>10+</div>
                    <div className="text-xs text-slate-300">wdrożeń / projektów</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold" style={{ color: COLORS.accent }}>&gt;30%</div>
                    <div className="text-xs text-slate-300">przyspieszenie procesów</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold" style={{ color: COLORS.accent }}>SLA</div>
                    <div className="text-xs text-slate-300">wsparcie i monitoring — w zależności od umowy</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* separator */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${COLORS.accent}, transparent)` }} />

      {/* USŁUGI */}
      <Section id="uslugi">
        <Container>
          <h2 className="text-3xl md:text-4xl font-extrabold">Czym się zajmuję:</h2>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (<ServiceCard key={s.id} s={s} />))}
          </div>
        </Container>
      </Section>

      {/* CASE STUDIES */}
      <Section id="case" className="pt-0">
        <Container>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Realizacje — wybrane projekty</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* (cases omitted here are unchanged) */}
            <Card className="p-6">
              <h3 className="text-2xl font-bold">MVP — integracja stanów i rekomendacje zamówień</h3>
              <div className="mt-4 space-y-4 text-slate-200/90">
                <div>
                  <Pill icon={Lightbulb}>Wyzwanie</Pill>
                  <p className="mt-2 pl-4 border-l-2" style={{ borderColor: COLORS.accent }}>
                    Dane rozproszone w systemach i Excelach, ręczne zamówienia i brak spójnych prognoz — co prowadziło do braków i nadwyżek magazynowych.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-2xl font-bold">Comfort Analytics — kokpit decyzyjny</h3>
              <div className="mt-4 space-y-4 text-slate-200/90">
                <div>
                  <Pill icon={Lightbulb}>Wyzwanie</Pill>
                  <p className="mt-2 pl-4 border-l-2" style={{ borderColor: COLORS.accent }}>
                    Brak jednego, wiarygodnego źródła danych dla KPI i zarządu.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-2xl font-bold">Comfort VendPro — system serwisowy dla vendingu</h3>
              <div className="mt-4 space-y-4 text-slate-200/90">
                <div>
                  <Pill icon={Lightbulb}>Wyzwanie</Pill>
                  <p className="mt-2 pl-4 border-l-2" style={{ borderColor: COLORS.accent }}>
                    Procesy serwisowe prowadzone papierowo/na Excelu, brak historii i trudne rozliczenia.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-2xl font-bold">Comfort InstallPro — aplikacja dla monterów</h3>
              <div className="mt-4 space-y-4 text-slate-200/90">
                <div>
                  <Pill icon={Lightbulb}>Wyzwanie</Pill>
                  <p className="mt-2 pl-4 border-l-2" style={{ borderColor: COLORS.accent }}>
                    Brak centralnego zarządzania projektami montażowymi: dane klienta, zadania, zdjęcia i historia użytych narzędzi były rozproszone.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-2xl font-bold">Comfort CableCut — optymalizacja cięć przewodów</h3>
              <div className="mt-4 space-y-4 text-slate-200/90">
                <div>
                  <Pill icon={Lightbulb}>Wyzwanie</Pill>
                  <p className="mt-2 pl-4 border-l-2" style={{ borderColor: COLORS.accent }}>
                    Przy dużych inwestycjach cięcie przewodów było planowane ręcznie — powodowało to nadmiar odpadów i nieoptymalne zakupy.
                  </p>
                </div>
              </div>
            </Card>

          </div>
        </Container>
      </Section>

    {/* tech section commented out */}

      {/* separator */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${COLORS.accent}, transparent)` }} />

      {/* KONTAKT */}
      <Section id="kontakt">
        <Container>
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold">Porozmawiajmy o Twoim projekcie</h3>
                <div className="mt-6 text-sm text-slate-200/90 space-y-1">
                  <p><strong>Firma:</strong> Comfort Connector – Łukasz Witt</p>
                  <p>
                    <strong>Telefon:</strong>{" "}
                    <a className="underline" href="tel:+48505725281">+48 505 725 281</a>
                  </p>
                  <p>
                    <strong>E-mail:</strong>{" "}
                    <a className="underline" href="mailto:biuro.comfortconnector@gmail.com">biuro.comfortconnector@gmail.com</a>
                  </p>
                  <p className="mt-4 text-slate-400 text-sm">
                    Umów bezpłatną diagnozę 30–45 minut — zidentyfikujemy kluczowe problemy i zaproponujemy PoC.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  required
                  placeholder="Imię i nazwisko"
                  className="w-full rounded-xl bg-transparent border border-white/20 px-4 py-3 outline-none focus:border-white/40"
                />

                {/* dodane pola company + phone */}
                <input
                  name="company"
                  placeholder="Firma (opcjonalnie)"
                  className="w-full rounded-xl bg-transparent border border-white/20 px-4 py-3 outline-none focus:border-white/40"
                />
                <input
                  name="phone"
                  placeholder="Telefon (opcjonalnie)"
                  className="w-full rounded-xl bg-transparent border border-white/20 px-4 py-3 outline-none focus:border-white/40"
                />

                <input
                  name="email"
                  type="email"
                  required
                  placeholder="E-mail"
                  className="w-full rounded-xl bg-transparent border border-white/20 px-4 py-3 outline-none focus:border-white/40"
                />
                <select
                  name="service"
                  defaultValue="Zakupy i magazyn"
                  className="w-full rounded-xl bg-transparent border border-white/20 px-4 py-3 outline-none focus:border-white/40"
                >
                  <option className="text-black">Zakupy i magazyn</option>
                  <option className="text-black">Sprzedaż / CRM</option>
                  <option className="text-black">Serwis i operacje terenowe</option>
                  <option className="text-black">Automatyzacje i API</option>
                  <option className="text-black">Raporty i dashboardy</option>
                  <option className="text-black">Aplikacje dedykowane</option>
                </select>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Wiadomość — opisz krótko problem lub oczekiwany efekt"
                  className="w-full rounded-xl bg-transparent border border-white/20 px-4 py-3 outline-none focus:border-white/40"
                />

                {/* honeypot (ukryte pole antyspamowe) */}
                <input name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <Button type="submit" className="w-full justify-center" disabled={sending}>
                  {sending ? "Wysyłanie..." : "Wyślij zapytanie"}
                </Button>
                {sent && <p className="text-sm text-green-300">Wiadomość wysłana. Dziękujemy!</p>}
              </form>
            </div>
          </Card>
        </Container>
      </Section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10">
        <Container>
          <div className="grid md:grid-cols-4 gap-8 text-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Comfort Connector" className="h-23 w-auto rounded" />
              </div>
              <p className="text-slate-400">
                IT i optymalizacja procesów dla MŚP — integracje, aplikacje terenowe i raporty decyzyjne.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Dane firmy</h4>
              <ul className="space-y-1 text-slate-300">
                <li>Comfort Connector – Łukasz Witt</li>
                <li>NIP: <span className="tabular-nums">7831920072</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Szybkie linki</h4>
              <ul className="space-y-1 text-slate-300">
                <li><a href="#uslugi" className="hover:text-white">Usługi</a></li>
                <li><a href="#case" className="hover:text-white">Realizacje</a></li>
                <li><a href="#kontakt" className="hover:text-white">Kontakt</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Kontakt</h4>
              <ul className="space-y-1 text-slate-300">
                <li><a href="tel:+48505725281" className="hover:text-white">+48 505 725 281</a></li>
                <li><a href="mailto:biuro.comfortconnector@gmail.com" className="hover:text-white">biuro.comfortconnector@gmail.com</a></li>
                <li className="mt-3">
                  <a href="#" className="underline underline-offset-4 hover:text-white">Polityka prywatności</a>
                </li>
                <li>
                  <a href="#" className="underline underline-offset-4 hover:text-white">Informacja RODO</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-3">
            <span>© {new Date().getFullYear()} Comfort Connector</span>
          </div>
        </Container>
      </footer>
    </div>
  );
}
