import api from "./api.js";
import { renderCounter } from "./miniBasket.js";

export let goods = [];

export const getGoods = async ({ onSuccess }) => {
  const response = await api({
    route: "/get_all_basket",
    // Для примера обработки ошибок
    onError: (response) => {
      if (response.status === 401) {
        alert("Пользователь не авторизован");
      }

      if (response.status === 422) {
        alert("Ошибка валидации");
      }
    },
  });

  goods = response.products;

  onSuccess(goods);
};

export const renderHideButton = ({ container, id }) => {
  container.innerHTML = `<button
                data-id="${id}"
                id="itemBasketButton"
                class="products__button products__decoratedtext red-button"
              >
                В КОРЗИНУ
              </button>`;
  const buttonEl = container.querySelector(".products__button");

  buttonEl.addEventListener("click", (event) => {
    let container = event.currentTarget.parentElement;
    let index = event.currentTarget.dataset.id;
    addToBasket({
      productId: index,
      onSuccess: (goods) => {
        renderCounter(goods), renderShowButton({ container, id: index });
      },
    });
  });
};

export const renderInputValue = ({ goods, input, id }) => {
  input.value = goods.find((element) => element.id === id).count;
};

export const renderShowButton = ({ goods, container, id }) => {
  container.innerHTML = `<div data-id="${id}" class="basket__calc">
  <button class="basket__button-calc red-button remove"><img src="img/minus.svg" alt=""
          class="basket__img-calc remove"></button>
  <input value=1 type="number" class="basket__input">
  <button class="basket__button-calc red-button add"><img src="img/plus.svg" alt=""
          class="basket__img-calc add"></button>
</div>`;
  const calculationBlock = container.querySelector(".basket__calc");
  const inputCalcElement = container.querySelector(".basket__input");
  renderInputValue({
    goods,
    input: inputCalcElement,
    id: Number(calculationBlock.dataset.id),
  });

  /* Повесим события клика на + и - */
  calculationBlock.addEventListener("click", (event) => {
    const input = calculationBlock.querySelector(".basket__input");
    let itemID = Number(calculationBlock.dataset.id);

    if (
      event.target.classList.contains("remove") ||
      event.target.classList.contains("add")
    ) {
      /*Если вычитаем количество у товара с count 1 тогда удаляем*/
      if (
        event.target.classList.contains("remove") &&
        Number(input.value) === 1
      ) {
        deleteToBasket({
          productId: itemID,
          onSuccess: (goods) => {
            renderCounter(goods);
            renderHideButton({ container: calculationBlock, id: itemID });
          },
        });

        return;
      }

      let routeString = event.target.classList.contains("remove")
        ? `/minus_one?product_id=${calculationBlock.dataset.id}`
        : `/plus_one?product_id=${calculationBlock.dataset.id}`;

      changeCount({
        routeString,
        onSuccess: (goods) => {
          renderCounter(goods);
          renderInputValue({ goods, input, id: itemID });
        },
      });
    }
  });

  /*Повесим события изменения значения на все инпуты в калькуляторах */
  inputCalcElement.addEventListener("change", (inputEvent) => {
      let itemID =
        inputEvent.currentTarget.parentElement.dataset.id;
      let newCount = inputEvent.currentTarget.value;

      if (newCount > 0) {
        let routeString = `/upd_basket_count?product_id=${itemID}&quantity=${newCount}`;

        changeCountbyInput({
          routeString,
          onSuccess: (goods) => {
            renderCounter(goods);
          },
        });
      } else {
        deleteToBasket({
          productId: itemID,
          onSuccess: (goods) => {
            deleteToBasket({
              productId: itemID,
              onSuccess: (goods) => {
                renderCounter(goods);
                renderHideButton({ container: calculationBlock, id: itemID });
              },
            });
            renderCounter(goods);
          },
        });
      }
    });

  };

export const addToBasket = async ({ productId, onSuccess }) => {
  const response = await api({
    route: "/add_to_basket",
    body: {
      product_id: productId,
      count: 1,
    },
    onError: (response) => {
      if (response.status === 400) {
        alert("Товар уже в корзине");
      }
    },
  });

  if (response) {
    await getGoods({
      onSuccess,
    });
  }
};

export const changeCount = async ({ routeString, onSuccess }) => {
  const response = await api({
    route: routeString,
    onError: (response) => {
      if (response.status === 422) {
        alert("ошибка");
      }
    },
  });

  if (response) {
    await getGoods({
      onSuccess,
    });
  }
};

export const changeCountbyInput = async ({ routeString, onSuccess }) => {
  const response = await api({
    route: routeString,
    onError: (response) => {
      if (response.status === 422) {
        alert("ошибка");
      }
    },
  });

  if (response) {
    await getGoods({
      onSuccess,
    });
  }
};

export const deleteToBasket = async ({ productId, onSuccess }) => {
  const response = await api({
    route: `/dell_to_basket?product_id=${productId}`,
  });

  if (response) {
    await getGoods({
      onSuccess,
    });
  }
};

export const buyProducts = async ({ productsData, onSuccess }) => {
  const response = await api({
    route: "/buy_products",
    body: {
      products_data: productsData,
    },
  });

  if (response) {
    onSuccess();
  }
};
