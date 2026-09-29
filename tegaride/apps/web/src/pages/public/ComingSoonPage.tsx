import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buttonStyles } from "../../components/ui/Button";

export default function ComingSoonPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 text-center">
      <p className="text-lg text-ink-600">{t("common.comingSoon")}</p>
      <Link to="/" className={buttonStyles({ variant: "ghost", className: "mt-6" })}>
        {t("common.backHome")}
      </Link>
    </section>
  );
}
