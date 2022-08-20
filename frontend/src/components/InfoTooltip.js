import React from "react";
import successIcon from "../images/icon-success.svg";
import failIcon from "../images/icon-fail.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <article
      className={`popup popup_type_infoTooltip ${isOpen && "popup_active"}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>

        {isSuccess ? (
          <>
            <img
              className="popup__register-image"
              alt="Вы успешно зарегистрировались!"
              src={successIcon}
            />
            <p className="popup__register-text">
              Вы успешно зарегистрировались!
            </p>
          </>
        ) : (
          <>
            <img
              className="popup__register-image"
              alt="Что-то пошло не так! Попробуйте ещё раз."
              src={failIcon}
            />
            <p className="popup__register-text">
              "Что-то пошло не так! Попробуйте ещё раз."
            </p>
          </>
        )}
      </div>
    </article>
  );
}

export default InfoTooltip;
