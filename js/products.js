const products = [
    { id: 1, name: "Legion 5 Pro", price: 40000000, image: "https://laptopaz.vn/media/product/2816_2816_e2e2e23.png" },
    { id: 2, name: "Legion 5 Pro", price: 40000000, image: "https://laptopaz.vn/media/product/2816_2816_e2e2e23.png" },
    { id: 3, name: "Legion 5 Pro" , price: 40000000, image: "https://laptopaz.vn/media/product/2816_2816_e2e2e23.png" },
    { id: 4, name: "Legion 5 Pro" , price: 40000000, image: "https://laptopaz.vn/media/product/2816_2816_e2e2e23.png" },
    { id: 5, name: "Legion 5 Pro", price: 40000000, image: "https://laptopaz.vn/media/product/2816_2816_e2e2e23.png" },
    { id: 6, name: "Legion 5 Pro", price: 40000000, image: "https://laptopaz.vn/media/product/2816_2816_e2e2e23.png" }
  ];


 

  let cart = [];

  $(document).ready(function() {
      const storedCart = localStorage.getItem('shoppingCart');
      if (storedCart) {
          cart = JSON.parse(storedCart);
      }
      displayProducts();
      updateCartUI();
  });

  function viewProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = 'product-detail.html';
    }
  }
  
  function saveCartToLocalStorage() {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  function displayProducts() {
      let productsHtml = '';
      products.forEach(product => {
          productsHtml += `
              <div class="col-md-4">
                  <div class="card product-card" onclick="viewProductDetail(${product.id})">
                      <img src="${product.image}" class="card-img-top" alt="${product.name}">
                      <div class="card-body">
                          <h5 class="card-title">${product.name}</h5>
                          <p class="card-text price">${product.price.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</p>
                          <button class="btn btn-success" onclick="addToCart(${product.id}); event.stopPropagation();">Thêm vào giỏ</button>
                      </div>
                  </div>
              </div>
          `;
      });
      console.log("Số sản phẩm: ", products.length);
      $('#productList').html(productsHtml);
  }

  function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      if (!product) return;

      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          cart.push({ ...product, quantity: 1 });
      }

      showAddedNotification(product.name);
      saveCartToLocalStorage();
      updateCartUI();

      var cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
      cartOffcanvas.show();
  }

  function updateQuantity(productId, change) {
      const item = cart.find(item => item.id === productId);
      if (!item) return;

      item.quantity += change;
      if (item.quantity <= 0) {
          removeFromCart(productId);
          return;
      }

      saveCartToLocalStorage();
      updateCartUI();
  }

  function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      saveCartToLocalStorage();
      updateCartUI();
  }

  function updateCartUI() {
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      $('#cartCount').text(totalItems);

      if (cart.length === 0) {
          $('#emptyCart').show();
          $('#cartItems').html('');
          $('#cartSummary').hide();
          return;
      }

      $('#emptyCart').hide();
      $('#cartSummary').show();

      let cartHtml = '';
      let subtotal = 0;

      cart.forEach(item => {
          const itemTotal = item.price * item.quantity;
          subtotal += itemTotal;

          cartHtml += `
              <div class="cart-item">
                  <div class="d-flex">
                      <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 15px;">
                      <div class="flex-grow-1">
                          <h6 class="mb-0">${item.name}</h6>
                          <p class="mb-1 price">${item.price.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</p>
                          <div class="quantity-control">
                              <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                              <input type="text" class="form-control" value="${item.quantity}" readonly>
                              <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                          </div>
                      </div>
                      <div class="text-end">
                          <p class="mb-1">${itemTotal.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</p>
                          <button class="btn btn-sm text-danger" onclick="removeFromCart(${item.id})">Xóa</button>
                      </div>
                  </div>
              </div>
          `;
      });

      $('#cartItems').html(cartHtml);
      $('#subtotal').text(subtotal.toLocaleString("vi-VN", {style: "currency", currency: "VND"}));
      $('#total').text(subtotal.toLocaleString("vi-VN", {style: "currency", currency: "VND"}));
  }

  function showAddedNotification(productName) {
      const notification = $(`
          <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
              <div class="toast-header">
                  <strong class="me-auto">Đã thêm vào giỏ hàng</strong>
                  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
              <div class="toast-body">
                  Sản phẩm <strong>${productName}</strong> đã được thêm vào giỏ hàng.
              </div>
          </div>
      `);

      $('body').append(notification);
      const toast = new bootstrap.Toast(notification);
      toast.show();

      notification.on('hidden.bs.toast', function() {
          notification.remove();
      });
  }
function safeParse(jsonString, defaultValue = []) {
    try {
        return JSON.parse(jsonString) || defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

let checkoutButton = document.getElementById("checkout");
checkoutButton.addEventListener("click", (e) => {
    e.preventDefault(); // Ngăn reload form

    const currentUser = safeParse(localStorage.getItem("currentUser"));
    if (currentUser.length == 0) {
        alert("Vui lòng đăng nhập để thanh toán!");
        window.location.href = "login.html"; // Chuyển sang trang đăng nhập
        return;
    }

    window.location.href = "checkout.html"; // Chuyển sang trang thanh toán
});