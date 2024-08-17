import {
    changeModalContent,
    modal,
    modalContentSlot,
    showModal,
    closeModal,
  } from "./modal.js";

  import {
    onAuthFormRender
  } from "./main.js";

  const authFormContent = `

  <form class="form" action="">

    <div class="blur__content blur__auth">

      <h1 class="blur__title">Для добавления товаров необходимо авторизоваться</h1>

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

export const showAuthForUnauthorized = () => {
    showModal();

    changeModalContent({
        content: authFormContent,
        onModalContentChange: onAuthFormRender,
      })
}