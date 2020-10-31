export default (item) => JSON.parse(localStorage.getItem(item) || 'null');
