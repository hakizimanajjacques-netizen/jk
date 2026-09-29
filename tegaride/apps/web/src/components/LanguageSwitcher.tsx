import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, saveLanguage } from "../i18n";

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  // Keep <html lang="..."> correct for screen readers and browsers
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? "en";
  }, [i18n.resolvedLanguage]);

  return (
    <label className="flex items-center gap-2 text-sm text-ink-600">
      <span className="sr-only">{t("common.language")}</span>
      <select
        value={i18n.resolvedLanguage}
        onChange={(e) => {
          void i18n.changeLanguage(e.target.value);
          saveLanguage(e.target.value);
        }}
        className="min-h-11 rounded-lg border border-ink-200 bg-white px-2 text-ink-900"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </label>
  );
}
