import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Code2, Smartphone, Sliders, Wrench, Check, ArrowRight, Phone } from "lucide-react";
import logo from "./assets/logo_header_h80@2x.png"; // retina logo @2x

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

// Ikony dziedziczą currentColor; rozmiar ujednolicony
const ICON_CLASS = "w-7 h-7 md:w-8 md:h-8";

const services = [
  {
    id: "pomiary",
    title: "Pomiary elektryczne",
    icon: <Wrench className={ICON_CLASS} strokeWidth={2} />,
    bullets: ["Pomiary odbiorcze i okresowe", "Instalacje mieszkaniowe i przemysłowe", "Protokoły PDF + rekomendacje"],
    details: [
      "Pomiary impedancji pętli zwarcia, rezystancji izolacji, ciągłości PE, RCD.",
      "Raporty z wnioskami naprawczymi oraz planem działań.",
    ],
  },
  {
    id: "pv",
    title: "Instalacje fotowoltaiczne",
    icon: <Sun className={ICON_CLASS} strokeWidth={2} />,
    bullets: ["Dobór, projekt i montaż", "Magazyny energii, backup", "Monitoring i serwis"],
    details: [
      "Przemysłowe i domowe – projekt elektryczny, konfiguracja, uruchomienie.",
      "Integracje: SmartGuard/EMMA, limity eksportu, optymalizacja zużycia.",
    ],
  },
  {
    id: "it",
    title: "Usługi informatyczne",
    icon: <Code2 className={ICON_CLASS} strokeWidth={2} />,
    bullets: ["Małe aplikacje (Python/JS)", "Integracje API i automatyzacje", "Dashboardy i raporty"],
    details: [
      "Subiekt Nexo Pro, ERP/CRM, Google Workspace, AppSheet.",
      "Tworzymy API, scrapery, ETL oraz kokpity (np. Comfort Analytics).",
    ],
  },
  {
    id: "vending",
    title: "Comfort VendPro (aplikacja vending)",
    icon: <Smartphone className={ICON_CLASS} strokeWidth={2} />,
    bullets: [
      "Panel serwisanta: pakowanie, podgląd automatów",
      "Badania okresowe: kalibracja wagi, wymiana zaparzacza",
      "Opinie/Zgłoszenia via QR",
    ],
    details: [
      "Wpisy stanów liczników → raporty w Comfort VendHub.",
      "Skan QR do opinii, zgłoszeń i awarii (z geolokalizacją/opisem/zdjęciem).",
      "Integracje z ERP/IoT; offline-first i szybkie skanowanie.",
    ],
  },
  {
    id: "optymalizacja",
    title: "Aplikacje optymalizujące procesy",
    icon: <Sliders className={ICON_CLASS} strokeWidth={2} />,
    bullets: ["Prognozowanie zakupów (AI)", "Planowanie stanów i rotacji", "Usprawnienia w magazynie"],
    details: ["MVP narzędzi do zamówień, modele popytu, automatyczne rekomendacje."],
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

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget; // <- zapamiętaj form, bo po await event bywa "zanikający"

    try {
      setSending(true);
      setSent(false);

      const fd = new FormData(form);
      const payload = {
        name: fd.get("name"),
        email: fd.get("email"),
        service: fd.get("service"),
        message: fd.get("message"),
      };

      const base = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
      if (!base) throw new Error("Brak VITE_API_URL (sprawdź ustawienia na Vercel).");

      const res = await fetch(`${base}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const raw = await res.text();
      let data = null;
      try { data = JSON.parse(raw); } catch {}

      if (!res.ok) {
        const msg = (data && (data.detail || data.message)) || `HTTP ${res.status}`;
        throw new Error(msg);
      }
      if (data && data.ok === false) throw new Error("Serwer odrzucił prośbę.");

      setSent(true);
      form.reset(); // <- użyj referencji do formularza
    } catch (err) {
      console.error("Contact form error:", err);
      alert(`Nie udało się wysłać: ${err.message || err}`);
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
            <a href="#tech" className="hover:text-white">Technologie</a>
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
                Łączymy <span style={{ color: COLORS.accent }}>pomiary</span>, PV i software w jedną usługę.
              </h1>
              <p className="mt-4 text-lg text-slate-200/90 max-w-xl">
                Od protokołu z pomiarów, przez montaż fotowoltaiki, po integracje API i aplikacje, które
                przyspieszają pracę. Jedno miejsce – jeden partner – mierzalne efekty.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a href="#uslugi"><Button>Sprawdź ofertę</Button></a>
                <a href="#case"><OutlineButton>Nasze realizacje</OutlineButton></a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Card className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-extrabold" style={{ color: COLORS.accent }}>20</div>
                    <div className="text-xs text-slate-300">zrealizowanych instalacji fotowoltaicznych</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold" style={{ color: COLORS.accent }}>&gt;30%</div>
                    <div className="text-xs text-slate-300">szybsze procesy (MVP)</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold" style={{ color: COLORS.accent }}>24/7</div>
                    <div className="text-xs text-slate-300">monitoring i wsparcie</div>
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
          <h2 className="text-3xl md:text-4xl font-extrabold">Czym się zajmujemy:</h2>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (<ServiceCard key={s.id} s={s} />))}
          </div>
        </Container>
      </Section>

      {/* CASE STUDIES */}
      <Section id="case" className="pt-0">
        <Container>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Nasze realizacje:</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold">MagElektro – integracja stanów i zamówień</h3>
              <p className="mt-2 text-slate-200/90">
                API Interelektro → Subiekt Nexo Pro: synchronizacja stanów, rekomendacje zakupów (Rotacja60/365, lead time).
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-2xl font-bold">Comfort Analytics – kokpit decyzyjny</h3>
              <p className="mt-2 text-slate-200/90">
                Dashboardy Power BI i AppSheet – instalacje PV, serwisy, stany, rozliczenia.
              </p>
            </Card>
            <Card className="p-6 md:col-span-2">
              <h3 className="text-2xl font-bold">Comfort VendPro dla Venka</h3>
              <p className="mt-2 text-slate-200/90">
                Aplikacja serwisowa i raportowa dla vendingu (Venka) – panel serwisanta, badania okresowe,
                liczniki → raporty w Comfort VendHub, opinie/awarie przez QR. Odwiedź:{" "}
                <a className="underline" href="https://www.venka.pl/" target="_blank" rel="noopener noreferrer">venka.pl</a>.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* TECH */}
      <Section id="tech" className="pt-0">
        <Container>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Technologie, które łączymy:</h2>
          <Card className="p-6">
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-slate-100/90">
              {["EN/PN – zgodność elektryczna", "SQL / Subiekt Nexo Pro", "Python / FastAPI", "Power BI / AppSheet"].map((t) => (
                <div key={t} className="rounded-xl border border-white/10 px-4 py-3 text-center">{t}</div>
              ))}
            </div>
          </Card>
        </Container>
      </Section>

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
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  required
                  placeholder="Imię i nazwisko"
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
                  defaultValue="Pomiary elektryczne"
                  className="w-full rounded-xl bg-transparent border border-white/20 px-4 py-3 outline-none focus:border-white/40"
                >
                  <option className="text-black">Pomiary elektryczne</option>
                  <option className="text-black">Instalacje PV</option>
                  <option className="text-black">Usługi informatyczne</option>
                  <option className="text-black">Comfort VendPro</option>
                  <option className="text-black">Aplikacje optymalizujące procesy</option>
                </select>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Wiadomość"
                  className="w-full rounded-xl bg-transparent border border-white/20 px-4 py-3 outline-none focus:border-white/40"
                />
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
                <span className="font-semibold">Comfort Connector</span>
              </div>
              <p className="text-slate-400">
{/*                 Pomiary elektryczne, instalacje PV i oprogramowanie — jeden partner, pełna odpowiedzialność. */}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Dane firmy</h4>
              <ul className="space-y-1 text-slate-300">
                <li>Comfort Connector – Łukasz Witt</li>
                <li>NIP: <span className="tabular-nums">7831920072</span></li>
                {/* Dodaj adres/REGON gdy będziesz chciał. */}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Szybkie linki</h4>
              <ul className="space-y-1 text-slate-300">
                <li><a href="#uslugi" className="hover:text-white">Usługi</a></li>
                <li><a href="#case" className="hover:text-white">Realizacje</a></li>
                <li><a href="#tech" className="hover:text-white">Technologie</a></li>
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
{/*             <span>Granat&nbsp;#031b31 • Akcent&nbsp;#F4C542</span> */}
          </div>
        </Container>
      </footer>
    </div>
  );
}
