// Initialize a new CartController with currentId set to 0
  const cartController = new CartController();

// load number of items in cart on load
window.onload = function () {
  cardCounter();
};

// Set cart badge to number from load
function cardCounter() {
  let newNumber = cartController.loadItems();
  let cartBadge = document.getElementById("pill");
  if (newNumber === "0" || newNumber === undefined) {
    cartBadge.removeAttribute("class", "visible");
    cartBadge.setAttribute("class", "badge rounded-pill bg-danger invisible");
  } else {
    cartBadge.removeAttribute("class", "invisible");
    cartBadge.setAttribute("class", "badge rounded-pill bg-danger visible");
    cartBadge.innerText = newNumber;
  }
}

// Event Listener for all Add Cart Buttons
let add = document.getElementById("card-container");
if (add) {
  add.addEventListener("click", function (event) {
    if (event.target.textContent === "Add to Cart") {
      // Extract info from data-bs-* attributes
      let button = event.target.parentElement.childNodes[1].children;
      let imgUrl = button[0].src;
      let name = button[1].textContent;
      let price = button[2].textContent;
      let description = button[3].textContent;

      // Save to LocalStorage
      cartController.addItem(name, description, imgUrl, price);
      cartController.saveLocal();
      // Update badge to current items in cart
      cardCounter();
    }
  });
}
