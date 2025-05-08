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
      account.innerHTML += `<a href = "#"><i class="fa fa-user-circle-o" style="font-size: 20px;" aria-hidden="true"></i></a>`

      const userDropdown = document.createElement("div");
      userDropdown.className = "user-dropdown";
  
      userDropdown.innerHTML += `
        <div class="profile" id="profile">
       
      </div>
      <div class="menu">
        <h3 class="user-name">${loggedInUser.firstName} ${loggedInUser.lastName}</h3>
        <ul>
            
            <li><div href="#" id="logoutBtn">Đăng xuất</div></li>
        </ul>
      </div>
      `;
  
      
      userMenu.appendChild(userDropdown);
      

  
      // Toggle dropdown
      const nameToggle = userDropdown.querySelector(".user-name");
      const details = userDropdown.querySelector(".user-details");
  
      nameToggle.addEventListener("click", () => {
        details.classList.toggle("show");
      });
  
    //   Logout
      document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        location.reload();
      });

      document.getElementById("profile").addEventListener("click", () => {
         // Chuyển sang trang cá nhân
         const toggleMenu = document.querySelector(".menu");
        toggleMenu.classList.toggle("active");
      });
    }
});
