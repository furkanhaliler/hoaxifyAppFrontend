import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        "Sign Up": "Sign Up",
        "Passwords do not match with each other.":
          "Passwords do not match with each other.",
        "User Name": "User Name",
        "Display Name": "Display Name",
        Password: "Password",
        "Password Repeat": "Password Repeat",
        Login: "Login",
        Logout: "Logout",
        HomePageLoggedOutMessage:
          "Welcome to Hoaxify. Please login to your account. If you do not have an account, you can sign up.",
        Users: "Users",
      },
    },
    tr: {
      translations: {
        "Sign Up": "Kayıt Ol",
        "Passwords do not match with each other.":
          "Şifreler birbiriyle eşleşmiyor.",
        "User Name": "Kullanıcı Adı",
        "Display Name": "Tercih Edilen İsim",
        Password: "Şifre",
        "Password Repeat": "Şifreyi Tekrarla",
        Login: "Giriş Yap",
        Logout: "Çıkış Yap",
        HomePageLoggedOutMessage:
          "Hoaxify'a hoş geldin. Lütfen giriş yap. Eğer bir hesabın yoksa, kayıt olabilirsin.",
        Users: "Kullanıcılar",
      },
    },
  },
  fallbackLng: "tr",
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    wait: true,
  },
});

export default i18n;
