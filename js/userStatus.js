function isEmpty(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
  
    return true
}


document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userMenu = document.getElementById("action");
    const loginLink = document.getElementById("login-link");
    const account = document.getElementById("account");
   
    console.log(userMenu)
  
    if (!isEmpty(loggedInUser)) {
      if (loginLink) loginLink.remove();
      account.innerHTML += `<a href = "#"><i class="fa fa-sign-out" aria-hidden="true" id="logoutBtn"></i></a>`;

    
    //   Logout

      document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        location.reload();
      });

      
    }
});
