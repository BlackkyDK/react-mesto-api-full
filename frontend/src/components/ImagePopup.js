import React from 'react';
function ImagePopup({ card, isOpen, onClose }) {
  return (
    <article className={`popup popup_type_image ${isOpen && "popup_active"}`}>
      <div className="popup__container-image">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__title-image">{card.name}</p>
      </div>
    </article>
  );
}

export default ImagePopup;
