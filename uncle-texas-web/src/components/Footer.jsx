import React from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <p>© Uncle Texas Puerto Varas — {t("footer.rights")}</p>
    </footer>
  );
};

export default Footer;
