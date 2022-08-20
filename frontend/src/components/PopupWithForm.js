import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
}) {
  return (
    <article className={`popup popup_type_${name} ${isOpen && "popup_active"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
          >
          {children}
          <button
            type="submit"
            className={`popup__save-button popup__save-button_${name}`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </article>
  );
}

export default PopupWithForm;
