export const modal = document.querySelector(".modal");
export const modalContentSlot = document.querySelector(".modal-content-slot");

export const closeModal = () => {
  modal.style.display = "none";
};

export const showModal = () => {
  modal.style.display = "flex";
};

const initModal = () => {
  const closeButton = modal.querySelector(".close-button");

  closeButton.addEventListener("click", closeModal);
};

export const changeModalContent = ({ content, onModalContentChange }) => {
  modalContentSlot.innerHTML = content;

  onModalContentChange?.();
};

initModal();
