import React, {useContext, useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState("");
  const [userProfession, setUserProfession] = useState("");

  useEffect(() => {
    setUserName(currentUser.name);
    setUserProfession(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setUserName(evt.target.value);
  }

  function handleChangeProfession(evt) {
    setUserProfession(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: userName,
      about: userProfession,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onUpdateUser={onUpdateUser}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_profile_name"
        id="name"
        name="name"
        required
        minLength="2"
        maxLength="40"
        type="text"
        placeholder="Имя"
        value={userName || ''}
        onChange={handleChangeName}
      />
      <span
        className="error-message error-message_visible"
        id="error-name"
      ></span>
      <input
        className="popup__input popup__input_profile_profession"
        id="profession"
        name="profession"
        required
        minLength="2"
        maxLength="200"
        type="text"
        placeholder="Профессиональная деятельность"
        value={userProfession || ''}
        onChange={handleChangeProfession}
      />
      <span
        className="error-message error-message_visible"
        id="error-profession"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
