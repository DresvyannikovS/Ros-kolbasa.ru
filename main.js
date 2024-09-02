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

import { showAuthForUnauthorized } from "./unauthorizedUser.js";

let token = getUserToken();

/*const burger = document.querySelector(".burger");*/

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

      <div class="blur__input-container blur__input-container-gap">
        <svg class="blur__input-icon" width="23px" height="23px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -2159.000000)" fill="currentColor">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" id="profile_round-[#1342]">

                        </path>
                    </g>
                </g>
            </g>
        </svg>
        <input name="email" type="text" class="blur__input" placeholder="Введите почту или телефон" />
      </div>

      <div class="blur__input-container blur__input-container-gap">
      <div class="visiblePassword">
      </div>
        <input name="password" type="password" class="blur__input inputPassword" placeholder="Введите пароль" />
      </div>

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
        <div class="blur__input-container">    
        <input id="first_name" name="first_name" type="text" class="blur__input blur__input_gap" placeholder="Имя" />
        </div>
        <div class="blur__input-container">
        <input id="last_name" name="last_name" type="text" class="blur__input blur__input_gap" placeholder="Фамилия" />
        </div>
        <div class="blur__input-container">
        <input id="phone" name="phone_number" type="tel" class="blur__input blur__input_gap" placeholder="Телефон" />
        </div>
        <div class="blur__input-container">
        <input id="email" name="email" type="email" class="blur__input blur__input_gap" placeholder="e-mail" />
        </div>

      <div class="blur__input-container">
      <div class="visiblePassword">
      
      </div>
        <input id="password" name="password" type="password" class="blur__input blur__input_gap inputPassword" placeholder="пароль" />
      </div>
             
      <div class="blur__input-container">
      <div class="visiblePassword">
      </div>
        <input id="password2" name="password_two" type="password" class="blur__input blur__input_gap inputPassword" placeholder="повторите пароль" />
      </div>

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

const openPasswordIcon = `
       <svg class="blur__input-icon blur__password-open" width="23px" height="23px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z" stroke="currentColor" stroke-width="1.5"/>
           <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="1.5"/>
         </svg>
     `;

const hidePasswordIcon = `
   <svg class="blur__input-icon blur__password-hide" width="23px" height="23px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.60603 6.08062C2.11366 5.86307 2.70154 6.09822 2.9191 6.60585L1.99995 6.99977C2.9191 6.60585 2.91924 6.60618 2.9191 6.60585L2.91858 6.60465C2.9183 6.604 2.91851 6.60447 2.91858 6.60465L2.9225 6.61351C2.92651 6.62253 2.93339 6.63785 2.94319 6.65905C2.96278 6.70147 2.99397 6.76735 3.03696 6.85334C3.12302 7.02546 3.25594 7.27722 3.43737 7.58203C3.80137 8.19355 4.35439 9.00801 5.10775 9.81932C5.28532 10.0105 5.47324 10.2009 5.67173 10.3878C5.68003 10.3954 5.68823 10.4031 5.69633 10.4109C7.18102 11.8012 9.25227 12.9998 12 12.9998C13.2089 12.9998 14.2783 12.769 15.2209 12.398C16.4469 11.9154 17.4745 11.1889 18.3156 10.3995C19.2652 9.50815 19.9627 8.54981 20.4232 7.81076C20.6526 7.44268 20.8207 7.13295 20.9299 6.91886C20.9844 6.81192 21.0241 6.72919 21.0491 6.67538C21.0617 6.64848 21.0706 6.62884 21.0758 6.61704L21.0808 6.60585C21.2985 6.0985 21.8864 5.86312 22.3939 6.08062C22.9015 6.29818 23.1367 6.88606 22.9191 7.39369L22 6.99977C22.9191 7.39369 22.9192 7.39346 22.9191 7.39369L22.9169 7.39871L22.9134 7.40693L22.9019 7.43278C22.8924 7.4541 22.879 7.48354 22.8618 7.52048C22.8274 7.59434 22.7774 7.69831 22.7115 7.8275C22.5799 8.08566 22.384 8.44584 22.1206 8.86844C21.718 9.5146 21.152 10.316 20.4096 11.1241L21.2071 11.9215C21.5976 12.312 21.5976 12.9452 21.2071 13.3357C20.8165 13.7262 20.1834 13.7262 19.7928 13.3357L18.9527 12.4955C18.3884 12.9513 17.757 13.3811 17.0558 13.752L17.8381 14.9544C18.1393 15.4173 18.0083 16.0367 17.5453 16.338C17.0824 16.6392 16.463 16.5081 16.1618 16.0452L15.1763 14.5306C14.4973 14.7388 13.772 14.8863 13 14.9554V16.4998C13 17.0521 12.5522 17.4998 12 17.4998C11.4477 17.4998 11 17.0521 11 16.4998V14.9556C10.2253 14.8864 9.50014 14.7386 8.82334 14.531L7.83814 16.0452C7.53693 16.5081 6.91748 16.6392 6.45457 16.338C5.99165 16.0367 5.86056 15.4173 6.16177 14.9544L6.94417 13.7519C6.24405 13.3814 5.61245 12.9515 5.04746 12.4953L4.20706 13.3357C3.81654 13.7262 3.18337 13.7262 2.79285 13.3357C2.40232 12.9452 2.40232 12.312 2.79285 11.9215L3.59029 11.1241C2.74529 10.2043 2.12772 9.292 1.71879 8.605C1.5096 8.25356 1.35345 7.95845 1.2481 7.74776C1.19539 7.64234 1.15529 7.55783 1.12752 7.49771C1.11363 7.46765 1.10282 7.44366 1.09505 7.42618L1.08566 7.4049L1.08267 7.39801L1.0816 7.39553L1.08117 7.39453C1.08098 7.39409 1.08081 7.39369 1.99995 6.99977L1.08117 7.39453C0.863613 6.8869 1.0984 6.29818 1.60603 6.08062Z" fill="currentColor"/>
     </svg>
     `;

/*
burger.addEventListener("click", () => {
  burger.classList.toggle("active");
});
*/

const getFormData = (event, form) => {
  event.preventDefault();

  const formData = new FormData(form);

  return Object.fromEntries(formData.entries());
};

const basketButtonEl = document.querySelector(".header__basket-container");

basketButtonEl.addEventListener("click", () => {
  if (token === "" || token === null) {
    showAuthForUnauthorized();
  }
});

//функция отрисовки видимости пароля
const renderPasswordVisible = (event, icon, type) => {
  const toVisiblePasswordButton =
    event.currentTarget.parentElement.querySelector(".visiblePassword");
  const inputPasswordEl =
    event.currentTarget.parentElement.querySelector(".inputPassword");

  toVisiblePasswordButton.innerHTML = icon;
  inputPasswordEl.type = type;
};

// Функция рендера формы регистрации
const onRegFormRender = () => {
  const form = modalContentSlot.querySelector(".form");
  const toVisiblePasswordButtons = modal.querySelectorAll(".visiblePassword");

  for (const toVisiblePasswordButton of toVisiblePasswordButtons) {
    toVisiblePasswordButton.innerHTML = hidePasswordIcon;

    toVisiblePasswordButton.addEventListener("click", (event) => {
      let icon = event.currentTarget.children[0].classList.contains(
        "blur__password-hide"
      )
        ? openPasswordIcon
        : hidePasswordIcon;
      let type = event.currentTarget.children[0].classList.contains(
        "blur__password-hide"
      )
        ? "text"
        : "password";

      renderPasswordVisible(event, icon, type);
    });
  }

  form.addEventListener("submit", async (event) => {
    const formData = getFormData(event, form);

    //Проверим имя
    if (formData.first_name === null || formData.first_name === "") {
      alert(`Не заполнено поле Имя`);
      return;
    }

    //Проверим фамилию
    if (formData.last_name === null || formData.last_name === "") {
      alert(`Не заполнено поле Фамилия`);
      return;
    }

    //Проверим телефон
    if (formData.phone_number === null || formData.phone_number === "") {
      alert(`Не заполнен телефон`);
      return;
    }

    //Проверим почту
    if (formData.email === null || formData.email === "") {
      alert(`Не заполнена почта`);
      return;
    }

    //Проверим совпадение паролей
    if (formData.password !== formData.password_two) {
      alert("Пароли не совпадают");
      const password2El = document.getElementById("password2");
      password2El.value = "";
      return;
    }

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
export const onAuthFormRender = () => {
  const form = modalContentSlot.querySelector(".form");

  const toRegistrationButton = modal.querySelector(".blur__button-reg");
  const toVisiblePasswordButton = modal.querySelector(".visiblePassword");
  toVisiblePasswordButton.innerHTML = hidePasswordIcon;

  if (toVisiblePasswordButton !== null) {
    toVisiblePasswordButton.addEventListener("click", (event) => {
      let icon = event.currentTarget.children[0].classList.contains(
        "blur__password-hide"
      )
        ? openPasswordIcon
        : hidePasswordIcon;
      let type = event.currentTarget.children[0].classList.contains(
        "blur__password-hide"
      )
        ? "text"
        : "password";
      renderPasswordVisible(event, icon, type);
    });
  }

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

  toLogoutButton.addEventListener("click", async () => {
    /* Отправим запрос на бэк */
    const response = await api({
      route: "/logout/",

      onError: (errorMessage) => {
        alert(errorMessage);
      },
    });

    /* Осуществим выход пользователя из хранилища, далее перерисуем кнопку хэдера и закроем форму */
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
    location.reload();
    window.location.replace("main.html");
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
  const showCallFormButtons = document.querySelectorAll(".showCallForm");

  for (const showCallFormButton of showCallFormButtons) {
    if (showCallFormButton != null) {
      showCallFormButton.addEventListener("click", () => {
        showModal();

        changeModalContent({
          content: callFormContent,
          onModalContentChange: onCallFormRender,
        });
      });
    }
  }
};

initialRender();

/* вот тут описать и вызвать функцию
которая проверит токен и перерисует кнопку хэдера. */
renderPersonalButton({ token });

initialHeaderRender({
  onShowModal: () =>
    changeModalContent(
      token === "" || token === null
        ? {
            content: authFormContent,
            onModalContentChange: onAuthFormRender,
          }
        : {
            content: logoutFormContent,
            onModalContentChange: onlogoutFormRender,
          }
    ),
});
