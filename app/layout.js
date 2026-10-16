import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
const serif = Cormorant_Garamond({ subsets: ["cyrillic", "latin"], weight: ["400", "600"], style: ["normal", "italic"], variable: "--serif" });
const sans = Inter({ subsets: ["cyrillic", "latin"], variable: "--sans" });
export const metadata = {
  title: "Лесная Чайная — баня на дровах, купель и мангальная зона в Бутово",
  description: "Русская баня на дровах, горячая купель на крыше и мангальная зона под ключ. Боброво, ДНТ Бутово, 122. +7 (903) 224-89-32",
};
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#0f1f17" };
export default function RootLayout({ children }) {
  return <html lang="ru" className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>;
}
