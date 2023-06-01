import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserSignUpPage from "./pages/UserSignupPage";
import LoginPage from "./pages/LoginPage";
import reportWebVitals from "./reportWebVitals";
import "./bootstrap-override.scss";
import "./i18n";
import LanguageSelector from "./components/LanguageSelector";
import ApiProgress from "./shared/ApiProgress";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div>
      <ApiProgress>
        <UserSignUpPage />
      </ApiProgress>
      <LanguageSelector></LanguageSelector>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
