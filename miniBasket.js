const basketCounterContainer = document.getElementById(
  "basketCounterContainer"
);
const basketCounterEl = document.getElementById("basketCounter");

export const renderCounter = (array) => {
  if (array.length > 0) {
    basketCounterContainer.style.display = "flex";
    let summ = 0;
    for (const element of array) {
      summ += Number(element.count);
    }
    basketCounterEl.innerHTML = `<p id="basketCounter" class="header__count">${
      summ
    }</p>`;
  } else {
    basketCounterContainer.style.display = "none";
  }
};
