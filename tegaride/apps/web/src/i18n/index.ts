import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import fr from "./fr.json";
import rw from "./rw.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "rw", label: "Kinyarwanda" },
] as const;

const STORAGE_KEY = "tegaride.lang";

function getSavedLanguage(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) return saved;
  } catch {
    // localStorage can be blocked (private mode); fall back to English
  }
  return "en";
}

export function saveLanguage(code: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // ignore
  }
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    rw: { translation: rw },
  },
  lng: getSavedLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false }, // React already escapes output (XSS-safe)
});

export default i18n;
