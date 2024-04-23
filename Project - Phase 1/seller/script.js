//(display model + make drop downs)
//const modelDD = document.querySelector("#models")
const makeDD = document.querySelector("#makes");
//console.log(modelDD)
console.log(makeDD);

import { Car } from "../classes/Car.js";

async function loadDropDowns() {
  const response = await fetch("/json/cars.json");

  const data = await response.json();
  //console.log(data)

  let uniqueMakes = new Set();
  let uniqueModels = new Set();

  data.forEach((car) => {
    uniqueMakes.add(car["make"]);
    //uniqueModels.add(car['model'])
  });

  uniqueMakes.forEach((make) => {
    //console.log(make)
    makeDD.innerHTML += `<option value="${make}">${make}</option>`;
  });

  // uniqueModels.forEach(model => {
  //     //console.log(model)
  //     modelDD.innerHTML += `<option value="${model}">${model}</option>`
  // });
}

const addButton = document.querySelector("#add");
console.log(addButton);

//---------------------------------------------------------------------------

let seller_sales = []; //global list

const history_view = document.querySelector(".sale_item_container");
console.log(history_view);

addButton.addEventListener("click", addCar);

async function addCar(event) {
  event.preventDefault();

  console.log("add pressed ");
  let user_response = localStorage.getItem("userinfo");
  let user_data = JSON.parse(user_response);
  let user_id = user_data[0]["user_id"];

  console.log(user_id); // ok id showing

  const carsList = await getCarsFromLocalStorage();

  let price = document.getElementById("price").value;
  price = "$"+price
  let quantity = document.getElementById("quantity").value;
  let model = document.getElementById("model").value;
  let make = makeDD.value;
  let year = document.getElementById("year").value;
  let imageUrl = document.getElementById("image").value;

  let id = carsList[0]["id"] + 1;
  console.log(id); //works

  const newCar = new Car(id, make, model, year, price, imageUrl, quantity);
  console.log(newCar); // ok

  //add to list
  seller_sales.unshift(newCar);
  carsList.unshift(newCar);

  console.log("this is seller list");
  seller_sales.forEach((element) => {
    //console.log(element);
  });

  console.log(
    "this is cars list --------------------------------------------x"
  );
  carsList.forEach((element) => {
    //console.log(element);
  });

  localStorage.setItem("cars_store", JSON.stringify(carsList));
  localStorage.setItem(`${user_id}`, JSON.stringify(seller_sales));

  //add new obj to html
  loadSellerSales();
}

async function getCarsFromLocalStorage() {
  console.log("get function");
  const lsCars = JSON.parse(localStorage.getItem("cars_store"));
  // lsCars.forEach(element => {
  //     console.log(element)
  // });
  return lsCars;
}

//------------------------------------------------
let saleCounter;
let soldItemCounter;
let onSaleItemCounter;

async function loadSellerSales() {
  saleCounter = 0;
  soldItemCounter = 0;
  onSaleItemCounter = 0;
  //get user id -> the one who's logged in
  let user_response = localStorage.getItem("userinfo");
  let user_data = JSON.parse(user_response);
  let user_id = user_data[0]["user_id"];

  console.log("in seller sales " + user_id); // ok id showing

  //search for a list in local storage named by (his id)
  if (localStorage.getItem(`${user_id}`) != null) {
    console.log("there are items in seller salses");
    const seller_sale_localStorage = JSON.parse(
      localStorage.getItem(`${user_id}`)
    );
    history_view.innerHTML = "";
    seller_sales = []; //clear list

    seller_sale_localStorage.forEach((sale) => {
      saleCounter++;
      if (sale["quantity"] == 0) {
        soldItemCounter++;
        console.log("quantity is zero");
        history_view.innerHTML += `
  <div class="car_card" loading="lazy">
    <img src="${sale.image}" alt="${sale.model}" loading="lazy">
    <p id="car_id"><strong>Car Id</strong>:<span id="carId">${sale.id}</span></p>
    <p><strong>Make:</strong> <span class="make">${sale.make}</span></p>
    <p><strong>Model:</strong> <span class="model">${sale.model}</span></p>
    <p><strong>Price:</strong> ${sale.price}</p>
    <label><strong>Quantity:</strong></label>
    <input type="text" id="q" value="${sale.quantity}" style="width: 10%">
    <button id="update_info_btn" type="button"><strong>Update Info</strong></button>
    <div class="sold_banner">Sold!</div>
  </div>`;
      } else {
        onSaleItemCounter++;
        console.log("quantity is not zero");
        history_view.innerHTML += `
  <div class="car_card" loading="lazy">
    <img src="${sale.image}" alt="${sale.model}" loading="lazy">
    <p id="car_id"><strong>Car Id</strong>:<span id="carId">${sale.id}</span></p>
    <p><strong>Make:</strong> <span class="make">${sale.make}</span></p>
    <p><strong>Model:</strong> <span class="model">${sale.model}</span></p>
    <p><strong>Price:</strong> ${sale.price}</p>
    <label><strong>Quantity:</strong></label>
    <input type="text" id="q" value="${sale.quantity}" style="width: 10%">
    <button id="update_info_btn" type="button"><strong>Update Info</strong></button>
  </div>`;
      }
      seller_sales.unshift(sale);
    });
    const counterPlace = document.querySelector("#item_counter");
    counterPlace.innerHTML =
      `Total Sales: ` +
      saleCounter +
      ` | Sold Items: ` +
      soldItemCounter +
      ` | On Sale Items: ` +
      onSaleItemCounter;
  }
}

window.addEventListener("DOMContentLoaded", function (event) {
  loadDropDowns();
  loadSellerSales();

  const updateButtons = document.querySelectorAll("#update_info_btn");

  updateButtons.forEach(function (updateButton) {
    console.log(updateButton);

    updateButton.addEventListener("click", async function (event) {
      console.log("quantity updated");
      const parentContainer = event.target.closest(".car_card");
      const quantity = parentContainer.querySelector("#q").value;
      console.log(quantity); //ok

      const car_id = parentContainer.querySelector("#carId").textContent;
      console.log(car_id); //ok

      let user_response = localStorage.getItem("userinfo");
      let user_data = JSON.parse(user_response);
      let user_id = user_data[0]["user_id"]; //get user id

      //get seller sales from localsotre
      const seller_sale_localStorage = JSON.parse(
        localStorage.getItem(`${user_id}`)
      ); //search for local storage with user name = sellerId
      //console.log(seller_sale_localStorage)
      console.log("SELER SALE LS ---------------------------  ");
      seller_sale_localStorage.forEach((element) => {
        //console.log(element);
        if (car_id == element.id) {
          console.log(element.quantity);
        }
      });

      //get all cars info from localstore
      const carsList = await getCarsFromLocalStorage();
      //console.log(carsList)
      console.log("CARS LIST LS ------------------------------ ");
      carsList.forEach((element) => {
        //console.log(element);
      });

      seller_sale_localStorage.forEach((element) => {
        if (car_id == element.id) {
          console.log("id found in seller sale list this is object:");
          console.log(element["quantity"]);

          element["quantity"] = quantity;
          localStorage.setItem(
            `${user_id}`,
            JSON.stringify(seller_sale_localStorage)
          );
        }
      });

      seller_sale_localStorage.forEach((element) => {
        console.log(element);
      });

      carsList.forEach((element) => {
        if (car_id == element.id) {
          console.log("id found in cars list this is object:");
          console.log(element["quantity"]);

          element["quantity"] = quantity;
          localStorage.setItem("cars_store", JSON.stringify(carsList));
        }
      });

      carsList.forEach((element) => {
        console.log(element);
      });

      loadSellerSales();
    });
  });
});
