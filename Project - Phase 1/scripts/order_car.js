let carList = []; // local list
let car = {};
let car_index
document.addEventListener("DOMContentLoaded", async () => {
  //completed
  var carId = window.location.href.split("=")[1];

  if (carId != null || carId != "") {
    carList = JSON.parse(localStorage.getItem("cars_store"));
    let carIndex = carList.findIndex((car) => car["id"] == carId);
    if (carIndex != -1) {
      console.log(carIndex);
      car_index = carIndex;
      fillCarData(carList[carIndex]);
      car = carList[carIndex]
      console.log(car)
    } else {
      console.log("No car data");
    }
  } else {
    //showCars();
  }


  let buybtn = document.getElementById("buybtn");

  buybtn.addEventListener("click", (event) => {
    event.preventDefault();
    //get placements
    let orderHistory = localStorage.getItem("orderHistory");
    let user_info = JSON.parse(localStorage.getItem("userinfo"));
    let quantity = parseInt(document.getElementById("car_quantity").value);
    let car_price = document.getElementById("model_price").value;
    let price_numaric = parseFloat(car_price.slice(1)); // remove first (there is $ in the beginnign)

    let total_cost = quantity * price_numaric; //to get the total 
    
   
    let user_response = localStorage.getItem("userinfo");
    let user_data = JSON.parse(user_response);
    let user_id = user_data[0]["user_id"];


    //cars local storage (to -quantity)
    const lsCars = JSON.parse(localStorage.getItem("6"));
    let quantityInStorageOfSeller= 0;
    let index_6;
    lsCars.forEach(element => {
        if(element.id == car.id){ //seller id == item id
          quantityInStorageOfSeller = element.quantity
        }
    });

    index_6 =  lsCars.findIndex((car) => car["id"] == carId);
    console.log("at 6 the index: "+index_6)

    car_store = JSON.parse(localStorage.getItem("cars_store"));

  if(quantity > quantityInStorageOfSeller){ //if qunatity ordered is larger than quantity in storage 
    alert("Storage Quantity Not Enough")
  }else{
  //if quantity is enough
    if(user_data[0]['balance'] >= total_cost){
    //console.log(car_price);


    //create order object 
    let orderData = {
      car_id: carId,
      user_id: parseInt(user_info[0]["user_id"]), //get it from user info ls
      quantity: document.getElementById("car_quantity").value, 
      total_cost: total_cost,
    };

    if (orderHistory == null) {// nothing in order history (start conting from 1)
      orderHistory = []; 
      orderData["order_id"] = 1;
      orderHistory.push(orderData);
    } else {// order history has items (add to the last order id)
      orderHistory = JSON.parse(localStorage.getItem("orderHistory"));
      console.log(orderHistory.length);
      orderData["order_id"] = orderHistory.length + 1;

      orderHistory.push(orderData);
    }

    //decrease amount
    user_data[0]['balance'] = user_data[0]['balance'] - total_cost; //remove from user balance
    localStorage.setItem("userinfo", JSON.stringify(user_data))

    //decrease quantity in two places ()
    lsCars[index_6].quantity = lsCars[index_6].quantity - quantity
    car_store[car_index].quantity = car_store[car_index].quantity - quantity
    localStorage.setItem("6", JSON.stringify(lsCars))
    localStorage.setItem("cars_store", JSON.stringify(car_store))


    alert("Item is Added Successfully")
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));//set ls
}else{
  //not enough 
  alert(`Balance Not Enough Please Choose less quantity or another item. Your Balance is ${user_data[0]['balance']}`)
}
}

  });
});

//just to fill the form with data from the local store
function fillCarData(car) {
  let user_info = JSON.parse(localStorage.getItem("userinfo"));
  document.getElementById("car_id").value = car["id"];
  document.getElementById("model_name").value = car["model"];
  document.getElementById("car_quantity").value = 1;
  document.getElementById("model_price").value = car["price"];
  let price_numaric = car["price"].slice(1);
  //console.log(price_numaric);
  let total_cost = parseInt(1) * parseFloat(price_numaric);
  document.getElementById("total-price").value = total_cost;
  //console.log(user_info);

  //assign inputs
  document.getElementById("country").value =
    user_info[0]["shippingaddress"]["counrty"];

  document.getElementById("city").value =
    user_info[0]["shippingaddress"]["city"];

  document.getElementById("zone").value =
    user_info[0]["shippingaddress"]["zone"];

  document.getElementById("shipping-address").value =
    user_info[0]["shippingaddress"]["str name"];
}
