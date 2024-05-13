let carList = []; // local list
let car = {};
let car_index;
document.addEventListener("DOMContentLoaded", async () => {
  //completed
  var carId = window.location.href.split("=")[1];
  // console.log("car id is: ")
  // console.log(carId)

  if (carId != null || carId != "") {
    // get car object from db
    const response2 = await fetch(`/api/cars/${carId}`); //add the seller id. to get specific seller info
    if (!response2.ok) {
      throw new Error("Failed to fetch data");
    }
    const data2 = await response2.json();

    console.log(`Fetched Data of car with id: ${carId}`);
    console.log(data2); //got cars data success

    fillCarData(data2)
  } else {
    //showCars();
  }

  let buybtn = document.getElementById("buybtn");

  
  buybtn.addEventListener("click", async (event) => {
    event.preventDefault();

    if (confirm("Are you Sure You Want To Purchase The Vehicle.") == true) {
   
    //(1) retrieve car data
    //(2) retrieve cusomter data
    //(3) retrieve customer bank data


    //(1)
    const response2 = await fetch(`/api/cars/${carId}`); //add the seller id. to get specific seller info
    if (!response2.ok) {
      throw new Error("Failed to fetch data");
    }
    const data2 = await response2.json();
    console.log(data2) //car data
    let car_Id = data2["carID"]

    console.log(`car id is: ${car_Id}`)

    //(2) 
    let customer_data = JSON.parse(localStorage.getItem("coustomerInfo"));
    console.log(customer_data[0]) //customer data
    let customerId = customer_data[0]["customerID"]

    console.log(`customer id is: ${customerId}`)

    //(3)
    const response3 = await fetch(`/api/bankaccounts/${customer_data[0]["customerID"]}`); //add the seller id. to get specific seller info
    if (!response3.ok) {
      throw new Error("Failed to fetch data");
    }
    const data3 = await response3.json();
    console.log(data3[0]) 
    
    //[1] check account_balance and total price {false} show alert
    //[1.5] check car stock quantity and customer order quantity
    //[2] {true} deduct balance from account - UPDATE REPO API
    //[3] {true} reduce stock quantity from car - UPDATE REPO API
    //[4] {true} create order object

    //get values of quantity and price + get total
    let quantity = parseInt(document.getElementById("car_quantity").value);
    let price_string = document.getElementById("model_price").value;
    let price = parseFloat(price_string)

    console.log(`values from input quantity ${quantity}`)
    console.log(`values from input price ${price}`)

    let total_cost = quantity * price; //correct

    console.log(`values from input total price: ${total_cost}`)

  
    console.log(`car stock: ${data2["stock"]}`)
    //[1] [1.5]
    if(quantity <= data2["stock"] && total_cost <= data3[0]["account_balance"]){
      console.log("quantity and balance enough")

      //[2] - deduct from balance
      let newBallance = data3[0]["account_balance"] - total_cost

      //first get the whole account obj
      let accountObj = data3[0]

      updatedBalance = {
        accountID: accountObj.accountID,
        account_balance: newBallance.toString(),
        customerIDFK: accountObj.customerIDFK,
        iban: accountObj.iban
      }

      await handleUpdateAccountBalance(data3[0]["accountID"], updatedBalance)

      console.log("handel update balance")
      

      //[3] - reduce car stock
      let newStock = data2["stock"] - quantity
   
      let updatedCar = {
        carID: data2.carID,
        image: data2.image,
        manufacturerIDFK: data2.manufacturerIDFK,
        model_name: data2.model_name,
        price: data2.price,
        sellerIDFK: data2.sellerIDFK,
        stock: newStock,
        year: data2.year
      }

      await handleUpdateCarStock(car_Id, updatedCar)
      console.log("handel update stock")

      let newOrder = {
        order_num: 2,
        quantity:  quantity,
        carIDFK: car_Id,
        customerIDFK: customerId
      }
      createOrder(newOrder)
      console.log("handel create order")

      alert("Purchase Success.")

      window.location.href = "/customer/index.html";
    }else{
      console.log("quantity or balance not enough")
      alert(`Oops! Quantity or Balance Not Enough. You Have: ${data3[0]["account_balance"]}QAR and Car Stock Quantity is: ${data2["stock"]} `)
    }
  }else{
    alert("Purchase Canceled. ")
  }


  });
});

async function handleUpdateCarStock(accountNo, updatedStock) {
  try {
      const url = `/api/cars/${accountNo}`;
      
      const response = await fetch(url, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStock),
      });
      if (!response.ok) {
          throw new Error("Failed to update account car stock");
      }
      const updatedCar = await response.json();
      console.log("Car stock updated successfully:", updatedCar);
    
  } catch (error) {
      console.error("Error updating car stock:", error);
  }
}


async function handleUpdateAccountBalance(accountNo, updatedBalance) {
    try {
        const url = `/api/bankaccounts/${accountNo}`;
        
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBalance),
        });
        if (!response.ok) {
            throw new Error("Failed to update account balance");
        }
        const updatedAccount = await response.json();
        console.log("Account balance updated successfully:", updatedAccount);
      
    } catch (error) {
        console.error("Error updating account balance:", error);
    }
}


async function createOrder(newOrder) {
  try {
      const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newOrder)
      });
      if (!response.ok) {
          throw new Error("Failed to create order");
      }
      const createdOrder = await response.json();
      return createdOrder;
  } catch (error) {
      console.error("Error creating order:", error);
      throw error;
  }
}


//just to fill the form with data from the local store
async function fillCarData(car) {
  let user_info = JSON.parse(localStorage.getItem("coustomerInfo"));

  document.getElementById("car_id").value = car["carID"];
  document.getElementById("model_name").value = car["model_name"];
  document.getElementById("car_quantity").value = 1;
  document.getElementById("model_price").value = car["price"];
  // let price_numaric = car["price"].slice(1);
  //console.log(price_numaric);
  console.log("price tuyp")
  console.log(typeof car["price"])


  let total_cost = parseInt(1) * parseFloat(car["price"]);
  document.getElementById("total-price").value = total_cost;
  
  console.log("The cusotmer id is ")
  console.log(user_info[0]["customerID"]);//from this id get addresses
let userId = user_info[0]["customerID"]

//get user shipping info
console.log(`/api/addresses/${userId}`)
const response2 = await fetch(`/api/addresses/${userId}`); 
if (!response2.ok) {
  throw new Error("Failed to fetch data");
}
const data2 = await response2.json();
// console.log("users shipping address")
// console.log(data2[0])

let shippingInfo = data2[0]
  

  //assign inputs
  document.getElementById("country").value = shippingInfo["country"]

  document.getElementById("city").value = shippingInfo["city"]

  document.getElementById("zone").value = shippingInfo["zone"]

  document.getElementById("shipping-address").value = shippingInfo["house_num"]
}


