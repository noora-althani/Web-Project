const addButton = document.querySelector("#add");
console.log(addButton);

const seller_name = document.querySelector('#seller_name')
console.log(seller_name)

async function loadSellerName(){
  //get id from local storage
  const ls = localStorage.getItem('sellerInfo');
  let user_data = JSON.parse(ls);
  let seller_id = ` ${user_data[0]["seller_name"]} | Id: ${user_data[0]["sellerID"]} | Username: ${user_data[0]["username"]}`;
  seller_name.innerHTML += seller_id //to set value to name


  //console.log("user data from localstorage")
  ///console.log(seller_id)// prints user username
  
  //get value from db
  const response = await fetch('/api/sellers')
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();

  //get cars by seller id
  const response2 = await fetch(`/api/test/${user_data[0]["sellerID"]}`)//add the seller id. to get specific seller info
  if (!response2.ok) {
    throw new Error('Failed to fetch data');
  }
  const data2 = await response2.json();

  //console.log(`Fetched Data 2 Cars OF user ${user_data[0]["sellerID"]}`)
  //console.log(data2) //got cars data success

  const counterPlace = document.querySelector("#item_counter");
  counterPlace.innerHTML = `Total Vehicles on Sale: ${data2.length}` 

  const history_view = document.querySelector(".sale_item_container");
  //console.log(history_view);

  history_view.innerHTML = ``
//printing seller cars (he has on sale)
  data2.forEach( async (sale) => {
    let mnf = await getmanufacturName(sale.manufacturerIDFK);

    //console.log(sale["model_name"])
    history_view.innerHTML += `
    <div class="car_card" loading="lazy">
      <img src="${sale.image}" alt=}" loading="lazy">
      <p><strong>Make:</strong> <span class="make">${mnf.manufacturer_name}</span></p>
      <p><strong>Model:</strong> <span class="model">${sale["model_name"]}</span></p>
      <p><strong>Year:</strong> <span class="year">${sale["year"]}</span></p>
      <p><strong>Price:</strong> ${sale.price}</p>
      <label><strong>Quantity:</strong></label>
      <input type="text" id="q" value="${sale.stock}" style="width: 10%">
      <button id="update_info_btn" type="button"><strong>Update Info</strong></button>
    </div>`;
  });

  //populate model dd
  //(1) get list of all cars models
  const response3 = await fetch(`/api/cars`)//add the seller id. to get specific seller info
  if (!response3.ok) {
    throw new Error('Failed to fetch data');
  }
  const data3 = await response3.json();
 // console.log("all cars")
  //console.log(data3)

  const makeDD = document.querySelector("#makes");
  //console.log(makeDD);

  data3.forEach( async (element) => {
    let mnf = await getmanufacturName(element.manufacturerIDFK);
    //console.log(mnf.manufacturer_name)
    //populate dd
    makeDD.innerHTML += `<option value="${mnf.manufacturer_name}">${mnf.manufacturer_name}</option>`;
  });


}

  loadSellerName();

  
async function getmanufacturName(mnfid) {
  const response = await fetch(`/api/manufacturers/${mnfid}`);
  const data = await response.json();
 
  return data;
}

//---------------------------------------------------------------------------

addButton.addEventListener("click", addCar);

async function addCar(event) {
  event.preventDefault();

  console.log("add pressed ");
  let user_response = localStorage.getItem("sellerInfo");
  let user_data = JSON.parse(user_response);
  let user_id = user_data[0]["sellerID"];

  console.log(user_id); // ok id showing

  //const carsList = await getCarsFromLocalStorage();

  //getting values from input
  let price = document.getElementById("price").value;
  let quantity = document.getElementById("quantity").value;
  let model = document.getElementById("model").value;
  let make = document.getElementById("makes").value;
  let year = document.getElementById("year").value;
  let imageUrl = document.getElementById("image").value;

  console.log("make is")
  console.log(typeof make)
  
  //from make get the manufacturers id
  let manId = -1;
  const response3 = await fetch(`/api/cars`)
  if (!response3.ok) {
    throw new Error('Failed to fetch data');
  }
  const data3 = await response3.json();

  for (const element of data3) {
    try {
      let mnf = await getmanufacturName(element.manufacturerIDFK);
      // console.log("Manufacturer name:", mnf.manufacturer_name);
      // console.log("Make:", make);
      if (mnf.manufacturer_name === make) {
        manId = mnf.manufacturerID;
        break;
      }
    } catch (error) {
      console.error("Error fetching manufacturer name:", error);
    }
  }

  console.log("manufacturere id is ")
  console.log(manId)// correct

  //creating new car object
  const newCar = {
    image: imageUrl,
    manufacturerIDFK: parseInt(manId),
    model_name: model,
    price: parseInt(price),
    sellerIDFK: parseInt(user_id),
    stock: parseInt(quantity),
    year: parseInt(year),
  };
  console.log("Then new created object")
  console.log(newCar);//print it


  const response = await fetch("/api/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",//stating that the content sent is in json format
    },
    body: JSON.stringify(newCar), // Send newCar directly, not within another object
  });

  const data = await response.json();

  //resent inputz
  document.getElementById("price").value = "";
document.getElementById("quantity").value = "";
document.getElementById("model").value = "";
document.getElementById("makes").value = "";
document.getElementById("year").value = "";
document.getElementById("image").value = "";

  loadSellerName()

  //new Car(id, make, model, year, price, imageUrl, quantity);
}
