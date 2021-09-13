// main loading function
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url) // call API by fetch.
    .then((response) => response.json()) // Convert api data.
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in User Interface. 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3 class="product-title">${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p class="rating">Rating: <span style="color: #EE310B;">${product.rating.rate}</span> <span class="rating-count">(${product.rating.count})</span></p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now my-button">Add To Cart</button>
      <button id="details-btn" class="info-button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="modal(${product.id})">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// Variable for count products.
let count = 0;

// Add to card item function.
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal()
  document.getElementById("total-Products").innerText = count;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value); // convert to float
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = (total).toFixed(2);
};
// get price value function.
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted; // return current price
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = (value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted <= 200) {
    setInnerText("delivery-charge", 20);
  }
  else if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  else if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  else if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// Details modal create function
const modal = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=> setModal(json))
}

// Set modal data function
const setModal = (data) => {
    document.getElementById("exampleModalLabel").innerText = `${data.title}`
    document.getElementById("description").innerText = `${data.description}`
    document.getElementById("price").innerText = `price: $ ${data.price}`
}