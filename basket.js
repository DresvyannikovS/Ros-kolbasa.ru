import api from "./api.js";
import { buyProducts, deleteToBasket, getGoods, changeCount, changeCountbyInput } from "./goods.js";
import { renderCounter } from "./miniBasket.js";

const formEl = document.getElementById("Form");
const formContentEl = document.getElementById("basketSendSuccess");

const emptyBasketPage = document.getElementById("emptyBasket");
const fullBasketPage = document.getElementById("fullBasket");
const basketContentEl = document.getElementById("basketContent");

const sendButtonEl = document.getElementById("sendButton");

const summEl = document.getElementById("summ");

let arrGoods = [];

export const renderPage = (array) => {
  if (!array.length) {
    emptyBasketPage.style.display = "block";
    fullBasketPage.style.display = "none";

    return;
  }

  fullBasketPage.style.display = "block";

  let summ = 0;
  const basketHtml = array.map((item, index) => {
    let text = `<div class="basket__item">
                    <img class="basket__img" src="img/test/12345-1.png" alt="">
                    <p class="basket__name">${item.title}</p>
                    <div class="basket__priceblock">
                        <div data-index="${index}" class="basket__calc">
                            <button class="basket__button-calc red-button remove"><img src="img/minus.svg" alt=""
                                    class="basket__img-calc remove"></button>
                            <input value=${
                              item.count
                            } type="number" class="basket__input">
                            <button class="basket__button-calc red-button add"><img src="img/plus.svg" alt=""
                                    class="basket__img-calc add"></button>
                        </div>
                        <button data-index="${index}" class="basket__button-container basket__delete"><?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
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
          array[event.currentTarget.dataset.index].count === 1
        ) {
          let itemID = array[event.currentTarget.dataset.index].id;
          deleteToBasket({
            itemID,
            onSuccess: (goods) => {
              renderPage(goods);
              renderCounter(goods);
            },
          });
        }

        let routeString = event.target.classList.contains("remove")
          ? `/minus_one?product_id=${
              array[event.currentTarget.dataset.index].id
            }`
          : `/plus_one?product_id=${
              array[event.currentTarget.dataset.index].id
            }`;
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
      let itemID =
        array[inputEvent.currentTarget.parentElement.dataset.index].id;
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
      } else  {
        deleteToBasket({
          productId: itemID,
          onSuccess: (goods) => {
            arrGoods = arrGoods.filter((el) => el.id !== itemID);
  
            renderPage(arrGoods);
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
        productId: array[i].id,
        onSuccess: (goods) => {
          arrGoods = arrGoods.filter((el) => el.id !== array[i].id);

          renderPage(arrGoods);
          renderCounter(goods);
        },
      });
    });
  }
};

const showMessage = () => {
  formEl.style.display = "flex";
  formContentEl.style.display = "flex";
};

if (sendButtonEl != null) {
sendButtonEl.addEventListener("click", async () => {
  if (arrGoods.length > 0) {
    const arraySend = arrGoods.map((el) => ({
      product_id: el.id,
      count: el.count,
    }));

    buyProducts({
      productsData: arraySend,
      onSuccess: () => {
        arrGoods = [];
        renderPage(arrGoods);
        renderCounter(arrGoods);
        showMessage();
      },
    });
  }
});
}

const initialRender = async () => {
  await getGoods({
    onSuccess: (goods) => {
      arrGoods = goods;
    },
  });

  renderPage(arrGoods);
};

initialRender();
