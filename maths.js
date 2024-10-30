document.addEventListener('DOMContentLoaded', () => {  
    const addToCartButtons = document.querySelectorAll('.product-card button');  
    const cartItems = [];  

    addToCartButtons.forEach(button => {  
        button.addEventListener('click', () => {  
            const productCard = button.closest('.product-card');  
            const productID = productCard.dataset.id;  
            const productName = productCard.querySelector('h3').innerText;  
            const productPrice = productCard.querySelector('p').innerText;  

            cartItems.push({ id: productID, name: productName, price: productPrice });  
            alert(`${productName} added to cart!`);  
            localStorage.setItem('cartItems', JSON.stringify(cartItems));  
        });  
    });  

    // Load cart items from local storage on cart.html  
    if (window.location.pathname.includes('cart.html')) {  
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];  
        const cartContainer = document.getElementById('cart-items');  
        let total = 0;  

        storedCartItems.forEach(item => {  
            const cartItem = document.createElement('div');  
            cartItem.classList.add('cart-item');  
            cartItem.innerHTML = `  
                <img src="images/product${item.id}.jpg" alt="${item.name}">  
                <h3>${item.name}</h3>  
                <p>Price: ${item.price}</p>  
                <button class="remove-btn">Remove</button>  
            `;  

            total += parseFloat(item.price.slice(1));  
            cartContainer.appendChild(cartItem);  
        });  

        document.getElementById('cart-total').querySelector('h2').innerText = `Total: $${total.toFixed(2)}`;  

        // Remove item from cart  
        const removeButtons = document.querySelectorAll('.remove-btn');  

        removeButtons.forEach((btn, index) => {  
            btn.addEventListener('click', () => {  
                storedCartItems.splice(index, 1);  
                localStorage.setItem('cartItems', JSON.stringify(storedCartItems));  
                location.reload();  // Reload to reflect changes  
            });  
        });  
    }  

    // Login form submission  
    if (window.location.pathname.includes('login.html')) {  
        const loginForm = document.getElementById('login-form');  
        loginForm.addEventListener('submit', (e) => {  
            e.preventDefault();  
            alert('Login functionality not implemented.');  
        });  
    }  

    // Registration form submission