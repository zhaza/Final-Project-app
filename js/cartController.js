// Create a ItemsController class
class CartController {
  // Set up the items and currentId property in the constructor
  constructor(currentId = 0) {
    this.items = [];
    this.currentId = currentId;
  }

  // Create the addItem method
  addItem(name, description, imgUrl, price) {
    const item = {
      // Increment the currentId property
      id: this.currentId++,
      name: name,
      description: description,
      imgUrl: imgUrl,
      price: price,
    };

    // Push the item to the items property
    // console.log(item);
    this.items.push(item);
  }

  loadItems() {
    const list = localStorage.getItem("items");
    this.items = JSON.parse(list);
    if (window.location.href.indexOf("cart") > -1) {
      displayCart();
    }
    return this.items.length.toString();
    // fetch('http://localhost:8080/api/item/all', {
    //     method: 'GET', // or 'PUT'
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     // body: JSON.stringify(data),
    //     })
    //     .then(response => response.json())
    //     .then(dbItems => {this.items = dbItems
    //         console.log(this.items)
    //         displayCards()})
    //     .catch((error) => {
    //     console.error('Error:', error);
    //     });
  }

  saveLocal() {
    localStorage.setItem("items", JSON.stringify(this.items));
    localStorage.setItem("id", JSON.stringify(this.currentId));
  }
  // saveDb({name, description, imgUrl}){
  //     const data = { name,  description, imgUrl };

  //     fetch('http://localhost:8080/api/item/add', {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //     console.log('Success:', data);
  //     })
  //     .catch((error) => {
  //     console.error('Error:', error);
  //     });
  // }

  delete(itemId) {
    let list = JSON.parse(localStorage["items"]);
    list.splice(itemId, 1);
    list = JSON.stringify(list);
    localStorage.setItem("items", list);

    // fetch(`http://localhost:8080/api/item/${itemId}`, {
    // method: 'DELETE', // or 'PUT'
    // // mode: "no-cors",
    // headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    // },
    // // body: JSON.stringify(data),
    // })
    // .then(response => response.json())
    // .then(console.log('Success'))
    // .catch((error) => {
    // console.error('Error:', error);
    // });
  }

  // update(itemId, data){

  //     fetch(`http://localhost:8080/api/item/${itemId}`, {
  //     method: 'PUT', // or 'PUT'
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //     console.log('Success:', data);
  //     })
  //     .catch((error) => {
  //     console.error('Error:', error);
  //     });
  // }

  // findById(itemId){

  //     fetch(`http://localhost:8080/api/item/${itemId}`, {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     })
  //     .then(response => response.json())
  //     .then(dbItems => {this.items = dbItems
  //         console.log(dbItems)})
  //         // createModal(dbItems)})
  //     .then(console.log('Success'))
  //     .catch((error) => {
  //     console.error('Error:', error);
  //     });
  // }
}
