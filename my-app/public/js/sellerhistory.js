async function loadOrders() {
  const response = await fetch(`/api/orders`);
  const orderHistory = await response.json();

  console.log(orderHistory);
  if (orderHistory != null) {
    showOrders(orderHistory);
  } else {
    console.log("this user dosnt have any orders");
  }
}
loadOrders()
function showOrders(userOrders) {
    let ele = document.getElementById("order_data");

    userOrders.forEach((user_order) => {
     // let car_data = getCarData(user_order["car_id"]);
     // console.log(car_data);

      ele.innerHTML += `
      <tr>
        <td>${user_order["order_num"]}</td>
        <td>${user_order["quantity"]}</td>
        <td>${user_order["customerIDFK"]}</td>

      </tr>
    `;
    });

    /*
                <th>Order No</th>
        <th>Model Name</th>
        <th>Make</th>
        <th>Unite Price</th>
        <th>Quantity</th>
        <th>Total Price</th>
    */
  }
