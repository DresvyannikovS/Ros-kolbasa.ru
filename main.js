import api from "./api.js";

import { initialHeaderRender, renderPersonalButton } from "./header.js";

import {
  changeModalContent,
  modal,
  modalContentSlot,
  showModal,
  closeModal,
} from "./modal.js";
import { setUserToken, getUserToken, clearUserToken } from "./storage.js";

let token = getUserToken();

// Контент всех форм

const callFormContent = `
<form class="form" action="">
  <div  class="blur__content blur__call">

    <h1 class="blur__title">Свяжитесь с нами</h1>

    <p class="blur__text">

      Оставьте свои контактные данные и мы вам перезвоним

    </p>

    <input name="user_name" type="text" class="blur__input" placeholder="Имя" />

    <input name="user_phone" type="tel" class="blur__input" placeholder="Телефон" />

    <button type="submit" class="blur__button red-button">Отправить</button>

  </div>
</form>
`;

const authFormContent = `

  <form class="form" action="">

    <div class="blur__content blur__auth">

      <h1 class="blur__title">Вход в личный кабинет</h1>

      <p class="blur__text">Введите логин и пароль</p>

      <input name="email" type="text" class="blur__input" placeholder="Введите почту или телефон" />

      <input name="password" type="password" class="blur__input" placeholder="Введите пароль" />

      <button type="submit" class="blur__button red-button">Войти</button>

    </div>

  </form>

  <h2 class="blur__text blur__text-reg">Еще не зарегистрированы?</h2>

  <button class="blur__button blur__button-reg red-button">

    Зарегистрироваться

  </button>

`;

const regFormContent = `

  <form  class="form" action="">

    <div id="regForm" class="blur__content blur__reg">

      <h1 class="blur__title">Регистрация</h1>

      <p class="blur__text">Ваши данные</p>

        <input name="first_name" type="text" class="blur__input blur__input_gap" placeholder="Имя" />

        <input name="last_name" type="text" class="blur__input blur__input_gap" placeholder="Фамилия" />

        <input name="phone_number" type="tel" class="blur__input blur__input_gap" placeholder="Телефон" />

        <input name="email" type="email" class="blur__input blur__input_gap" placeholder="e-mail" />

        <input name="password" type="password" class="blur__input blur__input_gap" placeholder="пароль" />

        <input name="password_two" type="password" class="blur__input blur__input_gap" placeholder="повторите пароль" />

      <button type="submit" class="blur__button red-button">

        Зарегистрироваться

      </button>

    </div>

  </form>

  <p class="blur__privacy">

    Нажимая на кнопку вы автоматически соглашаетесь с правилами обработки

    персональных данных

  </p>

`;

const logoutFormContent = `
        <div class="blur__content">
          <p class="blur__title blur__title_logout">Вы уверены что хотите выйти?</p>
          <div class="blur__dialog-button">
            <button class="blur__button red-button blur__button_basket logoutButton">Да</button> 
            <button class="blur__button red-button blur__button_basket cancelButton">Нет</button>
          </div>
        </div>
`;

const getFormData = (event, form) => {
  event.preventDefault();

  const formData = new FormData(form);

  return Object.fromEntries(formData.entries());
};

// Функция рендера формы регистрации

const onRegFormRender = () => {
  const form = modalContentSlot.querySelector(".form");

  form.addEventListener("submit", async (event) => {
    const formData = getFormData(event, form);

    const response = await api({
      route: "/register/",

      body: formData,

      onError: (errorMessage) => {
        alert(errorMessage);
      },
    });

    console.log(response); // Что-то делаем

    if (response.message === "Вы успешно зарегистрированы!") {
      let authFormData = {
        email: formData.email,
        password: formData.password,
      };
      sendAuthData(authFormData);
    }
  });
};

//Отправка запроса аутентификации

const sendAuthData = async (formData) => {
  const response = await api({
    route: "/login/",

    body: formData,

    onError: (errorMessage) => {
      alert(errorMessage);
    },
  });

  if (response?.access_token) {
    setUserToken(response.access_token);
    renderPersonalButton({ token: response.access_token });
    initialHeaderRender({
      onShowModal: () =>
        changeModalContent({
          content: logoutFormContent,
          onModalContentChange: onlogoutFormRender,
        }),
    });
    closeModal();
  }
};

// Функция рендера формы авторизации

const onAuthFormRender = () => {
  const form = modalContentSlot.querySelector(".form");

  const toRegistrationButton = modal.querySelector(".blur__button-reg");

  form.addEventListener("submit", async (event) => {
    const formData = getFormData(event, form);

    sendAuthData(formData);
  });

  toRegistrationButton.addEventListener("click", () => {
    changeModalContent({
      content: regFormContent,

      onModalContentChange: onRegFormRender,
    });
  });
};

// Функция логаута

const onlogoutFormRender = () => {
  const toLogoutButton = modalContentSlot.querySelector(".logoutButton");
  const toCancelButton = modalContentSlot.querySelector(".cancelButton");

  toLogoutButton.addEventListener("click", () => {
    /* Осуществим выход пользователя, далее перерисуем кнопку хэдера и закроем форму */
    let token = clearUserToken();

    renderPersonalButton({ token });

    initialHeaderRender({
      onShowModal: () =>
        changeModalContent({
          content: authFormContent,
          onModalContentChange: onAuthFormRender,
        }),
    });

    closeModal();
  });

  toCancelButton.addEventListener("click", () => {
    closeModal();
  });
};

// Функция заказ обратного звонка

const onCallFormRender = () => {
  const form = modalContentSlot.querySelector(".form");

  form.addEventListener("submit", async (event) => {
    const formData = getFormData(event, form);

    const response = await api({
      route: `/send_noti?user_name=${formData.user_name}&user_phone=${formData.user_phone}`,

      onError: (errorMessage) => {
        alert(errorMessage);
      },
    });

    console.log(response); // Что-то делаем
    closeModal();
  });
};

const initialRender = () => {
  const showCallFormButton = document.getElementById("showCallForm");

  if (showCallFormButton != null) {
    showCallFormButton.addEventListener("click", () => {
      showModal();

      changeModalContent({
        content: callFormContent,
        onModalContentChange: onCallFormRender,
      });
    });
  }
};

initialRender();

/* вот тут описать и вызвать функцию
которая проверит токен и перерисует кнопку хэдера. */
renderPersonalButton({ token });

initialHeaderRender({
  onShowModal: () =>
    changeModalContent(
      (token = ""
        ? {
            content: authFormContent,
            onModalContentChange: onAuthFormRender,
          }
        : {
            content: logoutFormContent,
            onModalContentChange: onlogoutFormRender,
          })
    ),
});
