import { addToBasket, getGoods, renderShowButton } from "./goods.js";
import { renderCounter } from "./miniBasket.js";
import { showAuthForUnauthorized } from "./unauthorizedUser.js";
import { getUserToken } from "./storage.js";

const addButtons = document.querySelectorAll(".product__button");

getGoods({
  onSuccess: (goods) => renderCounter(goods),
});

for (const addButtonEl of addButtons) {
  addButtonEl.addEventListener("click", (event) => {
    let token = getUserToken();

    if (token === "" || token === null) {
      showAuthForUnauthorized();
      return;
    }
    
    let container = event.currentTarget.parentElement;
    let index = event.currentTarget.dataset.id;
    addToBasket({
      productId: index,
      onSuccess: (goods) => {
        renderCounter(goods),
        renderShowButton({ goods, container, id:index })
      },
    });
  });
}
