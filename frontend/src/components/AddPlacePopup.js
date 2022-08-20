import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_location_name"
        id="title"
        name="name"
        required
        minLength="2"
        maxLength="30"
        type="text"
        placeholder="Название"
        onChange={handleChangeName}
        value={name || ''}
      />
      <span
        className="error-message error-message_visible"
        id="error-title"
      ></span>
      <input
        className="popup__input popup__input_location_link"
        id="link"
        name="link"
        required
        type="url"
        placeholder="Ссылка на картинку"
        onChange={handleChangeLink}
        value={link || ''}
      />
      <span
        className="error-message error-message_visible"
        id="error-link"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
