// Initialize a new ItemsController with currentId set to 0
const itemsController = new ItemsController();

// Add an 'onsubmit' event listener
const newItemForm = document.getElementById("newItemForm");
newItemForm.addEventListener("submit", (event) => {
  // Prevent default action
  event.preventDefault();

  // Select the inputs
  const newName = document.querySelector("#newItemName");
  const newDescription = document.querySelector("#newItemDescription");
  const newImgUrl = document.querySelector("#newItemImgUrl");
  const newPrice = document.querySelector("#newItemPrice");
  // Grab input values
  const name = newName.value;
  const description = newDescription.value;
  const imgUrl = newImgUrl.value;
  const price = newPrice.value

  // Add item to DB
  itemsController.saveDb({ name, description, imgUrl, price});
  // displayCards();
  itemsController.loadItems();

  // Clear the form
  newItemName.value = "";
  newItemDescription.value = "";
  newItemImgUrl.value = "";
  newItemPrice.value = "";
});

// Event Listener for cards
const list = document.getElementById("list-items");
list.addEventListener("click", (event) => {
  // Grab the target's id
  const itemId = event.target.parentNode.parentNode.getAttribute("data-id");

  if (event.target.textContent === "Delete") {
    // Delete the item with selected id from DB
    itemsController.delete(itemId);
    // Alert deleted item
    alert(`Item deleted`);
    //Reload the DB
    itemsController.loadItems();
    // Show current itemlist of DB as cards
    displayCards();
  }
});

// Event Listener for Card View button showing modal
let exampleModal = document.getElementById("exampleModal");
exampleModal.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  let button = event.relatedTarget;
  // Extract info from data-bs-* attributes
  let id = button.getAttribute("data-bs-id");
  let name = button.getAttribute("data-bs-name");
  let description = button.getAttribute("data-bs-description");
  let imgUrl = button.getAttribute("data-bs-imgUrl");
  let price = button.getAttribute("data-bs-price");

  // Update the modal's content.
  let modalTitle = exampleModal.querySelector(".modal-title");
  let modalName = exampleModal.querySelector("#name");
  let modalDescription = exampleModal.querySelector("#description");
  let modalImgUrl = exampleModal.querySelector("#imgUrl");
  let modalPrice = exampleModal.querySelector("#price");

  modalTitle.textContent = id;
  modalName.value = name;
  modalDescription.value = description;
  modalImgUrl.value = imgUrl;
  modalPrice.value = price;
});

// Event Listener for Edit in Modal
let edit = document.getElementById("edit");
edit.addEventListener("click", () => {
  // Grab the modal's content.
  let itemId = exampleModal.querySelector(".modal-title").textContent;

  let name = exampleModal.querySelector("#name").value;
  let description = exampleModal.querySelector("#description").value;
  let imgUrl = exampleModal.querySelector("#imgUrl").value;
  let price = exampleModal.querySelector("#price").value;

  let data = { name, description, imgUrl, price };
  itemsController.update(itemId, data);
  itemsController.loadItems();
});

function displayCards() {
  let list = document.getElementById("list-items");
  list.innerHTML = "";
  itemsController.items.forEach((item) => {
    let card = `
            <div class="card" data-id="${item.id}" style="width: 18rem;">
                <img src="${item.imgUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-id="${item.id}" data-bs-name="${item.name}" data-bs-description="${item.description}" data-bs-imgUrl="${item.imgUrl}" data-bs-price="${item.price}">
                        View
                    </button>
                    <a href="#" class="btn btn-primary delete">Delete</a>
                </div>
            </div>`;
    list.innerHTML += card;
  });
}
