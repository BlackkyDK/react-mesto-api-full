import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegister(password, email);
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="register__input"
          id="email"
          name="email"
          required
          type="email"
          placeholder="Email"
          value={email || ""}
          onChange={handleChangeEmail}
        />
        <input
          className="register__input"
          id="password"
          name="password"
          required
          type="password"
          placeholder="Пароль"
          value={password || ""}
          onChange={handleChangePassword}
        />
        <button type="submit" className="register__submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p>
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="register__link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
