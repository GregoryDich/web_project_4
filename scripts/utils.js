function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
    popup.addEventListener("click", closeByClick);
  }
  function closeByClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(evt.target);
    }
  }
  function closeByEscape(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      closePopup(openedPopup);
    }
  }
  function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
    popup.removeEventListener("click", closeByClick);
  }
  export { openPopup, closePopup };