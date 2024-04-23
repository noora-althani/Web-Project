let ele = document.getElementById("login");
ele.addEventListener("click", (event) => {
  event.preventDefault();
  let uname = document.getElementById("username").value.trim();
  let passw = document.getElementById("pass").value.trim();

  user_log(uname, passw);
});
async function user_log(uname, passw) {
  let response = await fetch("../json/users.json");
  let result = await response.json();
  console.log(result);
  let userdata = await result.filter(
    (object) => object["username"] == uname && object["password"] == passw
  );
  console.log(userdata);
  if (userdata.length != 0) {
    localStorage.setItem("userinfo", JSON.stringify(userdata));
    window.location.href = "../index.html";
  } else {
    console.log("invalid user or password");
    alert("Invalid user or password")
  }
}
  