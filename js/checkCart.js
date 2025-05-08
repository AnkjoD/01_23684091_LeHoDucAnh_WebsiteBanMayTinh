function safeParse(jsonString, defaultValue = []) {
    try {
        return JSON.parse(jsonString) || defaultValue;
    } catch (e) {
        return defaultValue;
    }
}
function isEmpty(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
  
    return true
  }
let checkoutButton = document.getElementById("checkout");
checkoutButton.addEventListener("click", (e) => {
    e.preventDefault(); // Ngăn reload form

    const currentUser = safeParse(localStorage.getItem("loggedInUser"));
    if (isEmpty(currentUser)) {
        alert("Vui lòng đăng nhập để thanh toán!");
        window.location.href = "login.html"; // Chuyển sang trang đăng nhập
        return;
    }

    window.location.href = "checkout.html"; // Chuyển sang trang thanh toán
});