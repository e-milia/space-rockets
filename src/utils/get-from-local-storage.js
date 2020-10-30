export const getFromLocalStorage = (item) =>
  JSON.parse(localStorage.getItem(item) || "null");
