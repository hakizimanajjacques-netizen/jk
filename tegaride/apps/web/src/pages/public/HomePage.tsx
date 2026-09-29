import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buttonStyles } from "../../components/ui/Button";
import { useApiHealth } from "../../hooks/useApiHealth";

export default function HomePage() {
  const { t } = useTranslation();
  const health = useApiHealth();

  const statusKey = health.isPending
    ? "status.checking"
    : health.isError
      ? "status.offline"
      : "status.online";

  const dotColor = health.isPending
    ? "bg-sun-400"
    : health.isError
      ? "bg-red-500"
      : "bg-brand-500";

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
        {t("brand.tagline")}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink-600">{t("home.subtitle")}</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/book" className={buttonStyles({ variant: "primary", size: "lg" })}>
          {t("nav.bookRide")}
        </Link>
        <Link to="/drivers/join" className={buttonStyles({ variant: "secondary", size: "lg" })}>
          {t("nav.becomeDriver")}
        </Link>
        <Link to="/business" className={buttonStyles({ variant: "ghost", size: "lg" })}>
          {t("nav.business")}
        </Link>
      </div>

      {/* Development aid: proves web -> proxy -> API is working. Removed/moved later. */}
      <p
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-ink-600 ring-1 ring-ink-100"
        aria-live="polite"
      >
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${dotColor}`} aria-hidden="true" />
        {t(statusKey)}
      </p>
    </section>
  );
}
