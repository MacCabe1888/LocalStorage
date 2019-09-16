const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name="item"]')).value;
  const item = {
    text,
    checked: false
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.checked ? "checked" : ""}>
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join("");
}

function toggleChecked(e) {
  if (!e.target.matches("input")) return;
  const item = items[e.target.dataset.index];
  item.checked = !item.checked;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleChecked);

populateList(items, itemsList);
