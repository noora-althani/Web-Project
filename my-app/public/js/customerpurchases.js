const seller_name = document.querySelector('#seller_name')
const item_counter = document.querySelector('#item_counter')
console.log(item_counter)

async function loadOrders() {
  //get orders from db
  let customer_data = JSON.parse(localStorage.getItem("coustomerInfo"));
  console.log("This is customer data");
  console.log(customer_data[0]); //customer data

seller_name.innerHTML += ` ${customer_data[0]["first_name"]} ${customer_data[0]["last_name"]} | ${customer_data[0]["username"]}`

  const response = await fetch(`/api/orders`);
  const orderHistory = await response.json();

  let customersOrders = [];
  let counter = 0;
  orderHistory.forEach((element) => {
    //customers orders
    if (customer_data[0]["customerID"] === element["customerIDFK"]) {
      console.log(element);
      customersOrders.push(element);
      counter++;
    }
  });

  console.log(`There are ${counter} Orders`);
  item_counter.innerHTML += ` ${counter}`

  if (customersOrders != null) {
    showOrders(customersOrders);
  } else {
    console.log("this user dosnt have any orders");
  }
}
loadOrders();

async function showOrders(userOrders) {
    let ele = document.getElementById("order_data");

    for (let user_order of userOrders) {
        let carData = await getCarById(user_order["carIDFK"]);
        ele.innerHTML += `
            <tr>
              <td>${user_order["orderID"]}</td>
              <td>${user_order["quantity"]}</td>
              <td>${user_order["carIDFK"]}</td>
              <td>${carData.model_name}</td>
              <td>${carData.year}</td>
              <td>${carData.price}</td>
            </tr>
          `;
    }
}


async function getCarById(carId) {
  const response = await fetch(`/api/cars/${carId}`);
  const data = await response.json();

  return data;
}
