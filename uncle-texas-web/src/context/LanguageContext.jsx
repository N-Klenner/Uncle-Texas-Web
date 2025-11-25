import React, { createContext, useContext, useState } from "react";
import es from "../locales/es.json";
import en from "../locales/en.json";

const LanguageContext = createContext();

const languages = { es, en };

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("es");

  const t = (key) => {
    const keys = key.split(".");
    let value = languages[lang];
    for (const k of keys) value = value?.[k];
    return value ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
