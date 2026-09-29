import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function PublicLayout() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-ink-100 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-xl font-extrabold tracking-tight text-brand-700">
            {t("brand.name")}
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-ink-100 bg-white py-6 text-center text-sm text-ink-600">
        © {new Date().getFullYear()} TegaRide · {t("brand.tagline")}
      </footer>
    </div>
  );
}
