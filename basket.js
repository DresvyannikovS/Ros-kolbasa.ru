import {
  changeModalContent,
  modal,
  modalContentSlot,
  showModal,
  closeModal,
} from "./modal.js";

import {
  buyProducts,
  deleteToBasket,
  getGoods,
  changeCount,
  changeCountbyInput,
} from "./goods.js";
import { renderCounter } from "./miniBasket.js";

const formEl = document.getElementById("Form");
const formContentEl = document.getElementById("basketSendSuccess");

const successFormContent = `
          <div id="basketSendSuccess" class="blur__content blur__basket">
            <h1 class="blur__title">Спасибо за покупку!</h1>
            <p class="blur__text blur__text_basket">Ваш заказ успешно отправлен, наши менеджеры свяжутся с Вами в ближайшее время</p>
            <img class="blur__image" src="img/send.png" alt="">
            <button class="blur__button red-button blur__button_basket">Ок</button>
          </div>
          `;

const basketContentEl = document.getElementById("basketContent");

const sendButtonEl = document.getElementById("sendButton");

const summEl = document.getElementById("summ");

export const renderPage = (array) => {
  if (!array.length) {
    getGoods({
      onSuccess: (goods) => {
        if (goods.length === 0) {
          location.reload();
        }
      },
    });
  }

  let summ = 0;
  const basketHtml = array.map((item) => {
    let text = `<div class="basket__item">
                    <img class="basket__img" src="" alt="">

                    // сразу после изображения идет обертка всего остального содержимого в 
                    // див basket__info-container. Это необходимо для адаптива. Сформируй начальные данные корзины также
                    <div class="basket__info-container">

                    <p class="basket__name">${item.title}</p>
                    <div class="basket__priceblock">
                        <div data-index="${item.id}" class="basket__calc">
                            <button class="basket__button-calc red-button remove"><img src="img/minus.svg" alt=""
                                    class="basket__img-calc remove"></button>
                            <input value=${
                              item.count
                            } type="number" class="basket__input">
                            <button class="basket__button-calc red-button add"><img src="img/plus.svg" alt=""
                                    class="basket__img-calc add"></button>
                        </div>
                        <button data-index="${
                          item.id
                        }" class="basket__button-container basket__delete"><?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <p class="basket__price">${Math.round(
                          item.price * item.count
                        ).toFixed(0)} ₽</p>
                    </div>

                    // тут заканчивается обертка
                    </div>
                </div>`;
    summ += Number(item.price * item.count);
    return text;
  });
  basketContentEl.innerHTML = basketHtml.join("");
  summEl.innerHTML = `<span id="summ">${Math.round(summ).toFixed(
    0
  )} ₽</span></p>`;

  /*найдем вновь отрисованные элементы*/
  const deleteButtons = document.querySelectorAll(".basket__delete");
  const calculationBlocks = document.querySelectorAll(".basket__calc");
  const inputCalcElements = document.querySelectorAll(".basket__input");

  /*Повесим события клика на все блоки калькуляции*/
  for (const calculationBlock of calculationBlocks) {
    calculationBlock.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("remove") ||
        event.target.classList.contains("add")
      ) {
        /*Если вычитаем количество у товара с count 1 тогда удаляем*/
        if (
          event.target.classList.contains("remove") &&
          event.currentTarget.querySelector(".basket__input").value === 1
        ) {
          let itemID = event.currentTarget.dataset.index;
          deleteToBasket({
            itemID,
            onSuccess: (goods) => {
              renderPage(goods);
              renderCounter(goods);
            },
          });
        }

        let routeString = event.target.classList.contains("remove")
          ? `/minus_one?product_id=${event.currentTarget.dataset.index}`
          : `/plus_one?product_id=${event.currentTarget.dataset.index}`;
        changeCount({
          routeString,
          onSuccess: (goods) => {
            renderPage(goods);
            renderCounter(goods);
          },
        });
      }
    });
  }

  /*Повесим события изменения значения на все инпуты в калькуляторах */
  for (const inputElement of inputCalcElements) {
    inputElement.addEventListener("change", (inputEvent) => {
      let itemID = inputEvent.currentTarget.parentElement.dataset.index;
      let newCount = inputEvent.currentTarget.value;

      if (newCount > 0) {
        let routeString = `/upd_basket_count?product_id=${itemID}&quantity=${newCount}`;

        changeCountbyInput({
          routeString,
          onSuccess: (goods) => {
            renderPage(goods);
            renderCounter(goods);
          },
        });
      } else {
        deleteToBasket({
          productId: itemID,
          onSuccess: (goods) => {
            renderPage(goods);
            renderCounter(goods);
          },
        });
      }
    });
  }

  /*Повесим события клика на все кнопки удаления*/
  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (item) => {
      let i = item.currentTarget.dataset.index;

      deleteToBasket({
        productId: i,
        onSuccess: (goods) => {
          renderPage(goods);
          renderCounter(goods);
        },
      });
    });
  }
};

const onSuccessBuyProducts = () => {
  showModal();

  const toOkButton = modalContentSlot.querySelector(".blur__button_basket");
  const closeButton =
    modalContentSlot.parentElement.querySelector(".close-button");

  toOkButton.addEventListener("click", () => {
    closeModal();

    getGoods({
      onSuccess: (goods) => {
        renderPage(goods), renderCounter(goods);
      },
    });
  });

  closeButton.addEventListener("click", () => {
    closeModal();

    getGoods({
      onSuccess: (goods) => {
        renderPage(goods), renderCounter(goods);
      },
    });
  });
};

const showMessage = () => {
  changeModalContent({
    content: successFormContent,
    onModalContentChange: onSuccessBuyProducts,
  });
};

const sendBasketToTelegram = (goods) => {
  if (goods.length > 0) {
    const arraySend = goods.map((el) => ({
      product_id: el.id,
      count: el.count,
    }));

    buyProducts({
      productsData: arraySend,
      onSuccess: () => {
        showMessage();
      },
    });
  }
};

if (sendButtonEl != null) {
  sendButtonEl.addEventListener("click", async () => {
    getGoods({
      onSuccess: (goods) => sendBasketToTelegram(goods),
    });
  });
}

const initialCommand = () => {
  /*найдем вновь отрисованные элементы*/
  const deleteButtons = document.querySelectorAll(".basket__delete");
  const calculationBlocks = document.querySelectorAll(".basket__calc");
  const inputCalcElements = document.querySelectorAll(".basket__input");

  /*Повесим события клика на все блоки калькуляции*/
  if (calculationBlocks.length > 0) {
    for (const calculationBlock of calculationBlocks) {
      calculationBlock.addEventListener("click", (event) => {
        if (
          event.target.classList.contains("remove") ||
          event.target.classList.contains("add")
        ) {
          /*Если вычитаем количество у товара с count 1 тогда удаляем*/
          if (
            event.target.classList.contains("remove") &&
            event.currentTarget.querySelector(".basket__input").value === 1
          ) {
            let itemID = event.currentTarget.dataset.index;
            deleteToBasket({
              itemID,
              onSuccess: (goods) => {
                renderPage(goods);
                renderCounter(goods);
              },
            });
          }

          let routeString = event.target.classList.contains("remove")
            ? `/minus_one?product_id=${event.currentTarget.dataset.index}`
            : `/plus_one?product_id=${event.currentTarget.dataset.index}`;
          changeCount({
            routeString,
            onSuccess: (goods) => {
              renderPage(goods);
              renderCounter(goods);
            },
          });
        }
      });
    }
  }

  /*Повесим события изменения значения на все инпуты в калькуляторах */
  if (inputCalcElements.length > 0) {
    for (const inputElement of inputCalcElements) {
      inputElement.addEventListener("change", (inputEvent) => {
        let itemID = inputEvent.currentTarget.parentElement.dataset.index;
        let newCount = inputEvent.currentTarget.value;

        if (newCount > 0) {
          let routeString = `/upd_basket_count?product_id=${itemID}&quantity=${newCount}`;

          changeCountbyInput({
            routeString,
            onSuccess: (goods) => {
              renderPage(goods);
              renderCounter(goods);
            },
          });
        } else {
          deleteToBasket({
            productId: itemID,
            onSuccess: (goods) => {
              renderPage(goods);
              renderCounter(goods);
            },
          });
        }
      });
    }
  }

  /*Повесим события клика на все кнопки удаления*/
  if (deleteButtons.length > 0) {
    for (const deleteButton of deleteButtons) {
      deleteButton.addEventListener("click", (item) => {
        let i = item.currentTarget.dataset.index;

        deleteToBasket({
          productId: i,
          onSuccess: (goods) => {
            renderPage(goods);
            renderCounter(goods);
          },
        });
      });
    }
  }
};

initialCommand();
