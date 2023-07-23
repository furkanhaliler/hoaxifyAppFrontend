import logo from "../assets/hoaxify.png";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/AuthActions";

const TopBar = () => {
  const { t } = useTranslation();

  const { username, isLoggedIn } = useSelector((store) => {
    return {
      isLoggedIn: store.isLoggedIn,
      username: store.username,
    };
  });

  const dispatch = useDispatch();

  const onLogoutSuccess = () => {
    dispatch(logoutSuccess());
  };

  let links = (
    <ul className="navbar-nav">
      <li>
        <Link className="nav-link" to="/login">
          {t("Login")}
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/signUp">
          {t("Sign Up")}
        </Link>
      </li>
    </ul>
  );
  if (isLoggedIn) {
    links = (
      <ul className="navbar-nav">
        <li>
          <Link className="nav-link" to={`/user/${username}`}>
            {username}
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/" onClick={onLogoutSuccess}>
            {t("Logout")}
          </Link>
        </li>
      </ul>
    );
  }
  return (
    <div className="shadow-sm bg-light mb-3">
      <nav className="navbar bg-body-tertiary container navbar-expand">
        <div className="container-fluid">
          <Link className="navbar-brand" to={isLoggedIn ? "/home" : "/"}>
            <img src={logo} width="60" alt="Hoaxify Logo"></img>Hoaxify
          </Link>
          {links}
        </div>
      </nav>
    </div>
  );
};

export default TopBar;
