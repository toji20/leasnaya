"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { QUERY } from "./query";

const MAP = "https://yandex.ru/maps/org/lesnaya_chaynaya/82712460815/";

// Запасные значения: показываются, пока поле не заполнено в админке
const DEFAULTS = {
  eyebrow: "Боброво · Бутово · 4.6 ★ на Яндекс Картах",
  title: ["Тишина,", "пар и", "чай в лесу"],
  aboutTitle: "Место, где хочется",
  aboutAccent: "задержаться",
  aboutText:
    "Уютная территория в посёлке Боброво на юге Москвы. Приезжайте компанией, парой или с семьёй: мы позаботились о печи, посуде, угле и атмосфере — вам остаётся только отдыхать. Работаем до полуночи.",
  services: [
    {
      t: "Баня на дровах",
      d: "Настоящая русская баня. Чан с водой в печи даёт мягкий пар и хорошую влажность.",
      h: "3 часа",
      p: "6 000 ₽",
    },
    {
      t: "Горячая купель на крыше",
      d: "Романтическая подсветка, чистая вода, эвкалипт с солью и эфирным маслом.",
      h: "3 часа",
      p: "4 000 ₽",
    },
    {
      t: "Мангальная зона под ключ",
      d: "Мангалы, угли, розжиг, очаг, казан, шампуры и посуда — всё уже на месте.",
      h: "6 часов",
      p: "4 000 ₽",
    },
  ],
  features: [
    "Аренда беседки",
    "Аренда мангала",
    "Можно с собакой",
    "PlayStation и настольные игры",
    "Печь и плита внутри",
    "Парковка",
    "Детский туалет",
    "Доступно для маломобильных",
  ],
  reviews: [
    {
      a: "Евгений В.",
      t: "Снимал на день рождения — всё продумано и уютно. Много посуды, есть PlayStation и настольные игры. Баня лучшая, в какой парились.",
    },
    {
      a: "Юлия М.",
      t: "Ароматная баня, беседка с мангалом, дружественная атмосфера и комфорт. Обязательно вернёмся!",
    },
    {
      a: "Наталья Н.",
      t: "Баня отличная, территория красивая и ухоженная. Вернулись домой с прекрасными впечатлениями.",
    },
  ],
  photos: [
    "https://avatars.mds.yandex.net/get-altay/20478540/2a0000019e7f9a9330137b197af988af0e95/XXL_height",
    "https://avatars.mds.yandex.net/get-altay/18769949/2a0000019e7f9a965525c4e044a07c062804/XXL_height",
    "https://avatars.mds.yandex.net/get-altay/20307868/2a000001a0578f3e6d4cca58e580d68a255a/XXL_height",
  ],
  phone: "+7 (903) 224-89-32",
  telegram: "https://t.me/teaforest",
  address: "п. г. т. Боброво, территория ДНТ Бутово, 122",
  hours: "Ежедневно, до 00:00",
};

const Reveal = ({ children, delay = 0, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function Landing({ data: initial }) {
  // Данные, зашитые при сборке, показываются сразу; затем подтягиваются свежие из Sanity
  const [live, setLive] = useState(initial);
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const ds = process.env.NEXT_PUBLIC_SANITY_DATASET;
    if (!id || !ds) return;
    fetch(
      `https://${id}.apicdn.sanity.io/v2025-01-01/data/query/${ds}?query=${encodeURIComponent(QUERY)}`,
    )
      .then((r) => r.json())
      .then((j) => j.result && setLive(j.result))
      .catch(() => {}); // при ошибке остаются данные со сборки
  }, []);

  // Пустые поля из админки не затирают запасные значения
  const filled = Object.fromEntries(
    Object.entries(live ?? {}).filter(
      ([, v]) => v != null && v !== "" && !(Array.isArray(v) && !v.length),
    ),
  );
  const d = { ...DEFAULTS, ...filled };
  const TEL = "tel:" + d.phone.replace(/[^+\d]/g, "");
  const TG = d.telegram;
  const tgName = "@" + TG.split("/").filter(Boolean).pop();

  const hero = useRef(null);
  const { scrollYProgress } = useScroll({
    target: hero,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main>
      <header className="nav">
        <a href="#top" className="logo">
          Лесная Чайная
        </a>
        <nav>
          <a href="#services">Услуги</a>
          <a href="#gallery">Галерея</a>
          <a href="#reviews">Отзывы</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <a className="btn sm" href={TEL}>
          Позвонить
        </a>
      </header>

      <section id="top" className="hero" ref={hero}>
        <motion.img
          src={d.photos[0]}
          alt="Лесная Чайная"
          className="hero-bg"
          style={{ y }}
        />
        <div className="shade" />
        <motion.div className="hero-in" style={{ opacity: fade }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {d.eyebrow}
          </motion.p>
          <h1>
            {d.title.map((w, i) => (
              <motion.span
                key={w + i}
                className="line"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.4 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.div
            className="cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <a className="btn" href={TG} target="_blank" rel="noopener">
              Забронировать в Telegram
            </a>
            <a className="btn ghost" href="#services">
              Смотреть услуги
            </a>
          </motion.div>
        </motion.div>
      </section>

      <div className="marquee">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {Array(8)
            .fill("баня на дровах · купель на крыше · мангал · беседка · ")
            .map((s, i) => (
              <span key={i}>{s}</span>
            ))}
        </motion.div>
      </div>

      <section className="sec about">
        <Reveal>
          <h2>
            {d.aboutTitle} <em>{d.aboutAccent}</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p>{d.aboutText}</p>
        </Reveal>
      </section>

      <section id="services" className="sec">
        <Reveal>
          <h2>Что вас ждёт</h2>
        </Reveal>
        <div className="grid">
          {d.services.map((s, i) => (
            <Reveal key={s.t + i} delay={i * 0.12}>
              <motion.article
                className="card"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="meta">
                  <span>{s.h}</span>
                  <b>{s.p}</b>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <ul className="tags">
            {d.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="gallery" className="sec">
        <Reveal>
          <h2>Атмосфера</h2>
        </Reveal>
        <div className="gallery">
          {d.photos.map((src, i) => (
            <motion.div
              key={src + i}
              className={`ph p${i % 4}`}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.1 }}
            >
              <img src={src} alt="" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </section>

      <section id="reviews" className="sec">
        <Reveal>
          <h2>Гости говорят</h2>
        </Reveal>
        <div className="grid">
          {d.reviews.map((r, i) => (
            <Reveal key={r.a + i} delay={i * 0.12}>
              <blockquote className="card q">
                <p>«{r.t}»</p>
                <footer>— {r.a}</footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contacts" className="sec contacts">
        <Reveal>
          <h2>
            Приезжайте <em>в гости</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <address>
            {d.address}
            <br />
            {d.hours}
            <br />
            <a href={TEL}>{d.phone}</a> ·{" "}
            <a href={TG} target="_blank" rel="noopener">
              Telegram {tgName}
            </a>
          </address>
          <div className="cta c">
            <a className="btn" href={TEL}>
              Позвонить
            </a>
            <a className="btn ghost" href={MAP} target="_blank" rel="noopener">
              Маршрут на Яндекс Картах
            </a>
          </div>
        </Reveal>
      </section>
      <footer className="foot">
        © {new Date().getFullYear()} Лесная Чайная
      </footer>
    </main>
  );
}
