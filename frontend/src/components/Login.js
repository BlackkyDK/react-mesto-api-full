import React, { useState } from "react";

function Login(props) {
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
    props.handleLogin(password, email);
  }

  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
