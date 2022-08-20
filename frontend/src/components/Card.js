import React, {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwner = props.card.owner._id === currentUser._id;
  // Снова проверяем, есть ли уже лайк на этой карточке
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  function handleCardClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card">
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <div className="card__location">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likes">
          <button
            type="button"
            className={`card__like-button ${
              isLiked && "card__like-button_active"
            }`}
            aria-label="Лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-number">{props.card.likes.length}</span>
        </div>
      </div>
      {isOwner && (
        <button
          type="button"
          className="card__delete-button"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
    </article>
  );
}

export default Card;
