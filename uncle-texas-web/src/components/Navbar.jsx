// src/components/Navbar.jsx
import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { user, loginWithGoogle, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsOpen(false);
  };

  const firstName = user?.displayName
    ? user.displayName.split(" ")[0]
    : null;

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="logo">UNCLE TEXAS</span>
      </div>

      {/* BOTÓN HAMBURGUESA (MÓVIL) */}
      <button
        className="navbar-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* MENÚ PRINCIPAL */}
      <nav className={`navbar-center ${isOpen ? "navbar-center--open" : ""}`}>
        <button onClick={() => scrollToSection("inicio")}>
          {t("navbar.home")}
        </button>
        <button onClick={() => scrollToSection("quienes-somos")}>
          {t("navbar.about")}
        </button>
        <button onClick={() => scrollToSection("menu")}>
          {t("navbar.menu")}
        </button>
        <button onClick={() => scrollToSection("donde-estamos")}>
          {t("navbar.location")}
        </button>
        <button onClick={() => scrollToSection("contacto")}>
          {t("navbar.contact")}
        </button>

        {/* ─────────── ZONA MÓVIL ─────────── */}
        <div className="navbar-auth-mobile">
          {/* Idioma */}
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="es">{t("lang.spanish")}</option>
            <option value="en">{t("lang.english")}</option>
          </select>

          {/* Login / Logout */}
          {user ? (
            <div className="navbar-auth-mobile-user">
              <span>
                {lang === "es" ? "Hola" : "Hi"}, {firstName}
              </span>
              <button onClick={logout}>{t("auth.logout")}</button>
            </div>
          ) : (
            <button
              className="navbar-auth-mobile-login"
              onClick={loginWithGoogle}
            >
              {t("auth.login")}
            </button>
          )}
        </div>
      </nav>

      {/* ─────────── ZONA DESKTOP ─────────── */}
      <div className="navbar-right">
        {/* Idioma */}
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="es">{t("lang.spanish")}</option>
          <option value="en">{t("lang.english")}</option>
        </select>

        {/* Login / Logout */}
        {user ? (
          <div className="navbar-right-user">
            <span>
              {lang === "es" ? "Hola" : "Hi"}, {firstName}
            </span>
            <button onClick={logout}>{t("auth.logout")}</button>
          </div>
        ) : (
          <button
            className="navbar-right-login"
            onClick={loginWithGoogle}
          >
            {t("auth.login")}
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
