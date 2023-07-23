import React from "react";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../api/apiCalls";

const LanguageSelector = (props) => {
  const { i18n } = useTranslation();
  const onClickLanguage = (language) => {
    i18n.changeLanguage(language);
    changeLanguage(language);
  };
  return (
    <div className="container">
      <img
        src="https://flagcdn.com/16x12/tr.png"
        width="24"
        height="18"
        alt="Turkish Flag"
        onClick={() => onClickLanguage("tr")}
        style={{ cursor: "pointer" }}
      ></img>
      <img
        src="https://flagcdn.com/16x12/gb.png"
        width="24"
        height="18"
        alt="Great Britain Flag"
        onClick={() => onClickLanguage("en")}
        style={{ cursor: "pointer", marginLeft: 10 }}
      ></img>
    </div>
  );
};

export default LanguageSelector;
