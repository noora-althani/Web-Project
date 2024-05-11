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
  console.log(userdata);
  if (userdata.length != 0) {
    if (userdata[0]["type"]=="customer"){
      window.location.href = "../customer/index.html";
    }
    else if (userdata[0]["type"]=="sellar"){
      window.location.href = "../seller/index.html";
    }
    
  } else {
    console.log("invalid user or password");
    alert("Invalid user or password")
  }
}
  