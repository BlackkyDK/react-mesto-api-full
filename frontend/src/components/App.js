import React, { useEffect, useState } from "react";
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import api from "../utils/Api";
import * as auth from "../utils/Auth";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isEditAvatarOpen, setEditAvatarOpen] = useState(false);
  const [isAddPlaceOpen, setAddPlaceOpen] = useState(false);
  const [isImageOpen, setImageOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    checkToken();
    if (loggedIn) {
      history.push('/');
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards.reverse());
      })
      .catch((err) => {
        console.log(err);
      })
      }
  }, [loggedIn]);

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    if(token) {
      setLoggedIn(true);
    auth
      .getToken(token)
      .then((res) => {
        if(res) {
          setEmail(res.email)
        };
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
  }
  function handleCardClick(card) {
    setImageOpen(true);
    setSelectedCard(card);
  }
  function closePopups() {
    setEditProfileOpen(false);
    setEditAvatarOpen(false);
    setAddPlaceOpen(false);
    setImageOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen();
  }

  function handleUpdateUser(user) {
    api
      .editProfile(user.name, user.about)
      .then((user) => {
        setCurrentUser(user);
        closePopups();
      })
      .catch((error) => console.log(error));
  }
  function handleUpdateAvatar(avatar) {
    api
      .changeAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closePopups();
      })
      .catch((error) => console.log(error));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.log(error));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(error));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card.name, card.link)
      .then((res) => {
        setCards([res, ...cards]);
        closePopups();
      })
      .catch((error) => console.log(error));
  }

  function handleRegister(email, password) {
    return auth.register(password, email)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        history.push("/sign-in");
        console.log("1");
      })
      .catch((err) => {
        console.log("err:", err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(password, email) {
    return auth
      .authorize(email, password)
      .then((data) => {
        setEmail(email);
        localStorage.setItem("jwt", data.token);
        history.push("/");
        setLoggedIn(true);
        console.log("2");
      })
      .catch((err) => {
        console.log("err:", err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          handleSignOut={handleSignOut}
          email={email}
          loggedIn={loggedIn}
        />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
          />
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>

        {loggedIn && <Footer />}

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closePopups}
          isSuccess={isSuccess}
        />

        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closePopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarOpen}
          onClose={closePopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlaceOpen}
          onClose={closePopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonText="Да"
        ></PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={isImageOpen}
          onClose={closePopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
