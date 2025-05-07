let cart = [];

    $(document).ready(function() {
      // Load cart
      const storedCart = localStorage.getItem('shoppingCart');
      if (storedCart) {
        cart = JSON.parse(storedCart);
      }
      updateCartUI();

      // Load product detail
      const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
      if (selectedProduct) {
        displayProductDetail(selectedProduct);
      } else {
        $('#productDetail').html('<p>Không tìm thấy thông tin sản phẩm.</p>');
      }
    });

    function displayProductDetail(product) {
      const html = `
        <div class="col-md-6">
          <img src="${product.image}" alt="${product.name}" class="img-fluid">
        </div>
        <div class="col-md-6">
          <h2>${product.name}</h2>
          <p class="price fs-4 text-danger">${product.price.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</p>
          <p>Thông tin mô tả sản phẩm đang cập nhật...</p>
          <button class="btn btn-success" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
        </div>
      `;
      $('#productDetail').html(html);
    }

    function addToCart(productId) {
      const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
      if (!selectedProduct || selectedProduct.id !== productId) return;

      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...selectedProduct, quantity: 1 });
      }

      localStorage.setItem('shoppingCart', JSON.stringify(cart));
      updateCartUI();

      var cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
      cartOffcanvas.show();
    }

    function updateCartUI() {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      $('#cartCount').text(totalItems);

      if (cart.length === 0) {
        $('#emptyCart').show();
        $('#cartItems').html('');
        $('#cartSummary').hide();
        return;
      }

      $('#emptyCart').hide();
      $('#cartSummary').show();

      let html = '';
      let subtotal = 0;

      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        html += `
          <div class="cart-item d-flex mb-3">
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 15px;">
            <div class="flex-grow-1">
              <h6 class="mb-0">${item.name}</h6>
              <p class="mb-1">${item.price.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</p>
              <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-outline-secondary me-1" onclick="updateQuantity(${item.id}, -1)">-</button>
                <input type="text" class="form-control form-control-sm text-center" style="width: 50px;" value="${item.quantity}" readonly>
                <button class="btn btn-sm btn-outline-secondary ms-1" onclick="updateQuantity(${item.id}, 1)">+</button>
              </div>
            </div>
            <div class="text-end">
              <p class="mb-1">${itemTotal.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</p>
              <button class="btn btn-sm text-danger" onclick="removeFromCart(${item.id})">Xóa</button>
            </div>
          </div>
        `;
      });

      $('#cartItems').html(html);
      $('#subtotal').text(subtotal.toLocaleString("vi-VN", {style: "currency", currency: "VND"}));
      $('#total').text(subtotal.toLocaleString("vi-VN", {style: "currency", currency: "VND"}));
    }

    function updateQuantity(productId, change) {
      const item = cart.find(i => i.id === productId);
      if (!item) return;
      item.quantity += change;
      if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
      }
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
      updateCartUI();
    }

    function removeFromCart(productId) {
      cart = cart.filter(i => i.id !== productId);
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
      updateCartUI();
    }