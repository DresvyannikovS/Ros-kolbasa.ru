import { addToBasket, getGoods, renderShowButton } from "./goods.js";
import { renderCounter } from "./miniBasket.js";

const addButtons = document.querySelectorAll(".products__button");

getGoods({
  onSuccess: (goods) => renderCounter(goods),
});

for (const addButtonEl of addButtons) {
  addButtonEl.addEventListener("click", (event) => {
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
