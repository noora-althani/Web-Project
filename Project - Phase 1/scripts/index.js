const listings = document.querySelector("#car_grid"); //reference to main containre
const carList = []; // local list
let searchbtn = document.getElementById("searchbtn");


searchbtn.addEventListener("click", (event) => {
  event.preventDefault();
  let model_name = document.getElementById("car_model").value.toLowerCase();
  if (model_name == "" || model_name == null) {
    window.location.href = "index.html";
  } else {
    searchbumodel(model_name);
  }
});

async function loadCarsList() {
  //let ls = JSON.parse(localStorage.getItem("cars_store"));

  console.log(localStorage.hasOwnProperty("cars_store") == null);
  console.log(localStorage.getItem("cars_store") == null);

  if (localStorage.getItem("cars_store") == null) {
    //local sotrage doesnt exits

    const response = await fetch("json/cars.json");
    const data = await response.json(); // object representing whole json structure

    //console.log(response); // response - we cannot see info
    //console.log(data); // whole data - we can see info - object representing whole json structure

    let carsList = data.sort((a, b) => b.id - a.id);

    carList.forEach((element) => {
      console.log(element);
    });

    //printing car by car
    //console.log("Here is the cars list: ");

    carsList.forEach((car) => {
      //console.log(car['id']);
      let info = `  
      <div class="car_card">
        <img src="${car.image}" alt ="${car.model}" loading="lazy">
        <p>Make: <span class="make">${car.make}</span></p>
        <p>Model: <span class="model">${car.model}</span></p>
        <p>Price: ${car.price}</p>
        <button class="purchase-button" onclick="car_details('${car["id"]}')">Purchase</button>
      </div>` ;

      listings.innerHTML += info;
      carList.push(car);
    });

    localStorage.setItem("cars_store", JSON.stringify(carList)); //to local storage
  } else {
    const lsCars = JSON.parse(localStorage.getItem("cars_store"));
    //console.log("from localstorage")
    //console.log(lsCars)
    //local storage exists
    listings.innerHTML = "";
    lsCars.forEach((car) => {
      listings.innerHTML += `
      <div class="car_card">
        <img src="${car.image}" alt ="${car.model}" loading="lazy">
        <p>Make: <span class="make">${car.make}</span></p>
        <p>Model: <span class="model">${car.model}</span></p>
        <p>Price: ${car.price}</p>
        <button class="purchase-button" onclick="car_details('${car["id"]}')">Purchase</button>
      </div>`;

      carList.push(car);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadCarsList();
});

function searchbumodel(model_name) {
  let carlist = JSON.parse(localStorage.getItem("cars_store"));
  let result = carlist.filter((car) =>
    car["model"].toLowerCase().includes(model_name)
  );

  showcars(result);
}
function showcars(carlist) {
  if (carlist.length == 0) {
    listings.innerHTML = "there are no models with this name";
  } else {
    listings.innerHTML = "";
    carlist.forEach((car) => {
      listings.innerHTML += `
      <div class="car_card">
        <img src="${car.image}" alt ="${car.model}" loading="lazy">
        <p>Make: <span class="make">${car.make}</span></p>
        <p>Model: <span class="model">${car.model}</span></p>
        <p>Price: ${car.price}</p>
        <button class="purchase-button" onclick="car_details('${car["id"]}')">Purchase</button>
      </div>`;
    });
  }
}

function car_details(car_id) {
  const purchasePageUrl = "order_car.html";
  if (localStorage.getItem("userinfo") != null) {
    // Redirect to the purchase page
    window.location.href = purchasePageUrl + "?carId=" + car_id;
  } else {
    console.log("You are not logged in.");
    alert("You are not logged in please log in")
  }
}
