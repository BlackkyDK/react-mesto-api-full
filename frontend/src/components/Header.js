import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Logo from "../images/Logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="Место" />
      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="sign-in" className="header__link">
            Войти
          </Link>
        </Route>

        <Route path="/">
          <div className="header__authorized">
            <p className="header__email">{props.email}</p>
            <Link
              to="/sign-in"
              className="header__link"
              onClick={props.handleSignOut}
            >
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
