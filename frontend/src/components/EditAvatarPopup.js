import React, {useRef, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  useEffect(() => {
    if (isOpen) avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateAvatar={onUpdateAvatar}
    >
      <input
        className="popup__input popup__input_avatar"
        id="avatar"
        name="avatar"
        required
        type="url"
        ref={avatarRef}
        placeholder="Ссылка на аватар"
      />
      <span
        className="error-message error-message_visible"
        id="error-avatar"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
