let ele = document.getElementById("login");
ele.addEventListener("click", (event) => {
  event.preventDefault();
  let uname = document.getElementById("username").value.trim();
  let passw = document.getElementById("pass").value.trim();

  user_log(uname, passw);
});
async function user_log(uname, passw) {
  let response = await fetch("/api/users");
  let result = await response.json();
  console.log(result);
  let userdata = await result.filter(
    (object) => object["username"] == uname && object["password"] == passw
  );

  let response2 = await fetch("/api/customers")
  let response3 = await fetch("/api/sellers")

  let result2 = await response2.json()
  let result3 = await response3.json()

  // console.log("result 2 and 3")
  // console.log(result2)
  // console.log(result3)

  let customer_data = await result2.filter(
    (object) => object["username"] == uname && object["password"] == passw
  )

  let seller_data = await result3.filter(
    (object) => object["username"] == uname && object["password"] == passw
  )

  console.log("seller data")
  console.log(seller_data[0])

  console.log("customer data")
  console.log(customer_data[0])

  console.log("before if")
  if(seller_data.length != 0){//a seller singing in
    localStorage.setItem("sellerInfo", JSON.stringify(seller_data));
    window.location.href = "../seller/index.html";
    console.log("a seller")
  }else if(customer_data.length !=0){// a cusomter
    localStorage.setItem("coustomerInfo", JSON.stringify(customer_data));
    window.location.href = "../customer/index.html";
    console.log("a customer")
  }else{
    console.log("invalid user of password")
    alert("Invalid username or password")
  }

  //console.log(userdata);
  // if (userdata.length != 0) {
  //   if (userdata[0]["type"] == "customer") {
  //     localStorage.setItem("coustomerInfo", JSON.stringify(userdata));

  //     window.location.href = "../customer/index.html";
  //   } else if (userdata[0]["type"] == "seller") {
  //     localStorage.setItem("sellerInfo", JSON.stringify(userdata));

  //     window.location.href = "../seller/index.html";
  //   }
  // } else {
  //   console.log("invalid user or password");
  //   alert("Invalid user or password");
  // }
}
