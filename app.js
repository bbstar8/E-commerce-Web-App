// Product Page Logic
if (document.getElementById('product-page')) {
    let selectedProduct = "";
    let selectedImage = "";

    const mainImage = document.getElementById('main-image');
    const variationImages = document.querySelectorAll('.variation');
    const addToCartBtn = document.getElementById('add-to-cart');
    const goToCheckoutLink = document.getElementById('go-to-checkout');

    // Set default image and product name on page load
    const firstVariation = variationImages[0];
    mainImage.src = firstVariation.src;
    selectedProduct = firstVariation.alt;
    selectedImage = firstVariation.src;
    firstVariation.classList.add('selected');

    // Update main image and selected product when a variation is clicked
    variationImages.forEach(img => {
        img.addEventListener('click', () => {
            variationImages.forEach(i => i.classList.remove('selected'));
            img.classList.add('selected');
            mainImage.src = img.src;
            selectedProduct = img.alt;  // Store the actual product name
            selectedImage = img.src;
        });
    });

    // Add to cart functionality using localStorage
    addToCartBtn.addEventListener('click', () => {
        const cart = {
            product: selectedProduct,
            image: selectedImage
        };
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Added ${selectedProduct} to cart!`);
    });

    // Navigate to checkout page
    goToCheckoutLink.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            alert('Please add a product to cart before proceeding to checkout.');
            return;
        }
        window.location.href = 'checkout.html';
    });
}

// Checkout Page Logic
if (document.getElementById('checkout-page')) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartSummaryDiv = document.getElementById('cart-summary');

    if (cart) {
        cartSummaryDiv.innerHTML = `
            <p>You're ordering the <strong>${cart.product}</strong>.</p>
            <img src="${cart.image}" alt="${cart.product}" width="200">
        `;
    } else {
        cartSummaryDiv.innerHTML = '<p>No product in cart. Please add a product first.</p>';
    }

    const checkoutForm = document.getElementById('checkout-form');
    const backToProductLink = document.getElementById('back-to-product');

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        alert(`Thank you, ${name}! Your order for the ${cart.product} has been placed.`);
        localStorage.removeItem('cart');
        checkoutForm.reset();
        window.location.href = 'index.html';
    });

    backToProductLink.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

