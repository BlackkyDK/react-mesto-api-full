import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-button"
          aria-label="редактировать аватар"
          onClick={onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={`${currentUser.avatar}`}
            alt="Аватар"
          />
        </button>
        <div className="profile__biography">
          <div className="profile__info">
            <h1 className="profile__name" id="profile__name">
              {currentUser.name}
            </h1>
            <p className="profile__profession" id="profile__profession">
              {currentUser.about}
            </p>
          </div>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="редактировать профиль"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
