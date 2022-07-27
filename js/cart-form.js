// Initialize a new ItemsController with currentId set to 0
const cartController = new CartController();

window.onload = function () {
  cardCounter();
  totals();
};

// Set cart badge to number from load
function cardCounter() {
  let newNumber = cartController.loadItems();
  let cartBadge = document.getElementById("pill");
  if (newNumber === "0") {
    cartBadge.removeAttribute("class", "visible");
    cartBadge.setAttribute("class", "badge rounded-pill bg-danger invisible");
  } else {
    cartBadge.removeAttribute("class", "invisible");
    cartBadge.setAttribute("class", "badge rounded-pill bg-danger visible");
    cartBadge.innerText = newNumber;
  }
}

function displayCart() {
  let list = document.getElementById("cartList");
  list.innerHTML = "";
  cartController.items.forEach((item) => {
    let row = `
            <tr>
              <td>
                <box-icon name='x-circle' data-bs-id="${item.id}"></box-icon>
              </td>
              <td>
                <img src="${item.imgUrl}" alt="">
              </td>
              <td>${item.name}</td>
              <td>${item.price}</td>
              <td>
                <input id="quantity" type="number" value="1" min="0" data-bs-price="${item.price}">
              </td>
              <td class="subTotal">${item.price}</td>
            </tr>`;
    list.innerHTML += row;
  });
}

let cartList = document.getElementById("cartList");
cartList.addEventListener("click", function (event) {
  let x = event.target;
  // DELETE
  if (x.tagName === "BOX-ICON") {
    let row = x.parentElement.parentElement;
    let rowCount = cartList.getElementsByTagName("tr")
    let itemId = Array.prototype.slice.call(rowCount).indexOf(row);
    cartController.delete(itemId);
    row.remove();
    cardCounter();
    totals();

    // QUANTITY update
  } else if (x.tagName === "INPUT") {
    let itemQuantity = x.value;
    let itemPrice = x.getAttribute("data-bs-price");
    let itemSubTotal = x.parentElement.nextElementSibling;
    let arr = itemPrice.split("");
    arr.shift();
    itemPrice = arr.join("");
    itemSubTotal.textContent = "$" + itemPrice * itemQuantity;
    totals();
  }
});

function totals() {
  let addSubTotal = document.getElementsByClassName("subTotal");
  let sum = 0;
  for (let i = 0; i < addSubTotal.length; i++) {
    let arr = addSubTotal[i].textContent.split("");
    arr.shift();
    sub = arr.join("");
    sum += parseFloat(sub);
  }
  let subTotal = document.getElementById("subTotal");
  subTotal.textContent = "$" + sum.toString();

  let total = document.getElementById("total");
  total.textContent = "$" + sum.toString();
}
