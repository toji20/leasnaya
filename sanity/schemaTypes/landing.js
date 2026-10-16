import { defineType, defineField } from "sanity";

const str = (name, title, type = "string") =>
  defineField({ name, title, type });

export default defineType({
  name: "landing",
  title: "Главная страница",
  type: "document",
  fields: [
    str("eyebrow", "Надпись над заголовком"),
    defineField({
      name: "title",
      title: "Главный заголовок (каждая строка — отдельный пункт)",
      type: "array",
      of: [{ type: "string" }],
    }),
    str("aboutTitle", "Блок «О месте»: заголовок"),
    str("aboutAccent", "Блок «О месте»: выделенное слово"),
    str("aboutText", "Блок «О месте»: текст", "text"),
    defineField({
      name: "services",
      title: "Услуги",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            str("t", "Название"),
            str("d", "Описание", "text"),
            str("h", "Длительность (например, 3 часа)"),
            str("p", "Цена (например, 6 000 ₽)"),
          ],
          preview: { select: { title: "t", subtitle: "p" } },
        },
      ],
    }),
    defineField({
      name: "features",
      title: "Особенности (плашки)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "reviews",
      title: "Отзывы",
      type: "array",
      of: [
        {
          type: "object",
          fields: [str("a", "Имя автора"), str("t", "Текст отзыва", "text")],
          preview: { select: { title: "a", subtitle: "t" } },
        },
      ],
    }),
    defineField({
      name: "photos",
      title: "Фото (первое — фон на главном экране)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    str("phone", "Телефон"),
    str("telegram", "Ссылка на Telegram"),
    str("address", "Адрес"),
    str("hours", "Часы работы"),
  ],
});
