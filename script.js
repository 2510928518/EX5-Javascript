
let slideInterval;

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
    return slideInterval;
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

let cart = [];
let products = [];

const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const cartButton = document.getElementById('cartButton');
const cartCount = document.getElementById('cartCount');
const checkoutButton = document.getElementById('checkoutButton');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const proceedToPayment = document.getElementById('proceedToPayment');
const backToShopping = document.getElementById('backToShopping');
const paymentForm = document.getElementById('paymentForm');
const orderSummary = document.getElementById('orderSummary');
const backToShoppingFromConfirmation = document.getElementById('backToShoppingFromConfirmation');

const shopLink = document.getElementById('shopLink');
const visitLink = document.getElementById('visitLink');
const aboutLink = document.getElementById('aboutLink');
const ticketsLink = document.getElementById('ticketsLink');
const faqLink = document.getElementById('faqLink');
const contactLink = document.getElementById('contactLink');

const shoppingSection = document.getElementById('shopping');
const checkoutSection = document.getElementById('checkout');
const paymentSection = document.getElementById('payment');
const confirmationSection = document.getElementById('confirmation');
const registrationSection = document.getElementById('registration');
const carouselSection = document.querySelector('section:first-of-type');

function fetchProducts() {
    products =[
        {
          "id": "001",
          "name": "Totoro Plush",
          "price": 15,
          "description": "Totoro Plush - A charming Ghibli-themed collectible."
        },
        {
          "id": "002",
          "name": "Catbus Pillow",
          "price": 20,
          "description": "Catbus Pillow - A charming Ghibli-themed collectible."
        },
        {
          "id": "003",
          "name": "No-Face Lamp",
          "price": 25,
          "description": "No-Face Lamp - A charming Ghibli-themed collectible."
        },
        {
          "id": "004",
          "name": "Howl's Ring",
          "price": 30,
          "description": "Howl's Ring - A charming Ghibli-themed collectible."
        },
        {
          "id": "005",
          "name": "Calcifer Mug",
          "price": 35,
          "description": "Calcifer Mug - A charming Ghibli-themed collectible."
        },
        {
          "id": "006",
          "name": "Soot Sprite Stickers",
          "price": 40,
          "description": "Soot Sprite Stickers - A charming Ghibli-themed collectible."
        },
        {
          "id": "007",
          "name": "Ghibli Notebook",
          "price": 45,
          "description": "Ghibli Notebook - A charming Ghibli-themed collectible."
        },
        {
          "id": "011",
          "name": "Ponyo Water Bottle",
          "price": 65,
          "description": "Ponyo Water Bottle - A charming Ghibli-themed collectible."
        },
        {
          "id": "017",
          "name": "Totoro Umbrella",
          "price": 95,
          "description": "Totoro Umbrella - A charming Ghibli-themed collectible."
        },
        {
          "id": "023",
          "name": "Totoro Phone Case",
          "price": 25,
          "description": "Totoro Phone Case - A charming Ghibli-themed collectible."
        },
        {
          "id": "030",
          "name": "Totoro Bento Box",
          "price": 60,
          "description": "Totoro Bento Box - A charming Ghibli-themed collectible."
        },
        {
          "id": "032",
          "name": "Ponyo Night Light",
          "price": 70,
          "description": "Ponyo Night Light - A charming Ghibli-themed collectible."
        },
        
        {
          "id": "036",
          "name": "Totoro Mug Warmer",
          "price": 90,
          "description": "Totoro Mug Warmer - A charming Ghibli-themed collectible."
        },
        
        {
          "id": "045",
          "name": "Totoro Notebook Set",
          "price": 35,
          "description": "Totoro Notebook Set - A charming Ghibli-themed collectible."
        }
      ];
    displayProducts(products);
}

function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const imageNumber = product.id.padStart(3, '0');
        const imagePath = `assets/${imageNumber}.jpg`;
        
        productCard.innerHTML = `
            <img src="${imagePath}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    const product = products.find(p => p.id === productId);
    
    if (product) {
        cart.push(product);
        updateCart();
        
        if (cart.length === 1) {
            cartButton.style.display = 'flex';
        }
    }
}

function updateCart() {
    cartCount.textContent = cart.length;
    
    if (checkoutSection.style.display !== 'none') {
        displayCartItems();
    }
}

function displayCartItems() {
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const imageNumber = item.id.padStart(3, '0');
        const imagePath = `assets/${imageNumber}.jpg`;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${imagePath}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.innerHTML = `Total: $${total.toFixed(2)}`;
}

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm === '') {
            displayProducts(products);
            return;
        }
        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
        
        displayProducts(filteredProducts);
    });
}

function showSection(sectionToShow) {
    [shoppingSection, checkoutSection, paymentSection, confirmationSection, registrationSection, carouselSection].forEach(section => {
        if (section) section.style.display = 'none';
    });
    
    if (sectionToShow) sectionToShow.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
   
    showSlide(currentSlide);
    
    if (document.getElementById('next')) {
        document.getElementById('next').addEventListener('click', nextSlide);
    }
    
    if (document.getElementById('prev')) {
        document.getElementById('prev').addEventListener('click', prevSlide);
    }
    
    startAutoSlide();
    
    const carousel = document.getElementById('carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            stopAutoSlide();
        });
        
        carousel.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
    }

    
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle("show");
        });
    }

    if (document.getElementById("registrationform")) {
        document.getElementById("registrationform").addEventListener("submit", function(e) {
            e.preventDefault();
            
            
            document.querySelectorAll('.error').forEach(function(span) {
                span.textContent = '';
            });
            
            let isValid = true;

            const name = document.getElementById("name");
            if (!name.value.trim()) {
                document.getElementById("nameError").textContent = "Name is required";
                isValid = false;
            }

            const emailInput = document.getElementById("email");
            const emailErrorSpan = document.getElementById("emailError");
            
            if (!emailInput.value.trim()) {
                emailErrorSpan.textContent = "enter a valid email";
                isValid = false;
            } 
            
            const dobInput = document.getElementById("dob");
            const dobErrorSpan = document.getElementById("dobError");
            if (!dobInput.value) {
                dobErrorSpan.textContent = "birth date";
                isValid = false;
            }
            
            
            const genderInput = document.querySelector('input[name="gender"]:checked');
            const genderErrorSpan = document.getElementById("genderError");
            if (!genderInput) {
                genderErrorSpan.textContent = "select your gender";
                isValid = false;
            }
            
            const ticketInput = document.getElementById("ticket");
            const ticketErrorSpan = document.getElementById("ticketError");
            if (!ticketInput.value) {
                ticketErrorSpan.textContent = "ticket type";
                isValid = false;
            }
            
            const visitorsInput = document.getElementById("no-of-visitors");
            const visitorsErrorSpan = document.getElementById("visitorsError");
            if (!visitorsInput.value) {
                visitorsErrorSpan.textContent = "number of visitors";
                isValid = false;
            }
            
            const visitDateInput = document.getElementById("date-of-visit");
            const visitDateErrorSpan = document.getElementById("visitDateError");
            if (!visitDateInput.value) {
                visitDateErrorSpan.textContent = "visit date";
                isValid = false;
            }
            
            if (isValid) {
                alert('Form submitted successfully!');
            }
        });
    }

    fetchProducts();
    
    if (shopLink) {
        shopLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(shoppingSection);
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            showSection(checkoutSection);
            displayCartItems();
        });
    }

    if (backToShopping) {
        backToShopping.addEventListener('click', () => {
            showSection(shoppingSection);
        });
    }

    if (proceedToPayment) {
        proceedToPayment.addEventListener('click', () => {
            showSection(paymentSection);
        });
    }

    if (backToShoppingFromConfirmation) {
        backToShoppingFromConfirmation.addEventListener('click', () => {
            showSection(shoppingSection);
        });
    }

    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            document.querySelectorAll('#paymentForm .error').forEach(span => {
                span.textContent = '';
            });
            
            let isValid = true;
            
            const fullName = document.getElementById('fullName');
            if (!fullName.value.trim()) {
                document.getElementById('fullNameError').textContent = 'Full name is required';
                isValid = false;
            }
            
            const email = document.getElementById('email');
            if (!email.value.trim() ) {
                document.getElementById('emailError').textContent = 'Valid email is required';
                isValid = false;
            }
            
            const address = document.getElementById('address');
            if (!address.value.trim()) {
                document.getElementById('addressError').textContent = 'Address is required';
                isValid = false;
            }
            
            const cardNumber = document.getElementById('cardNumber');
            if (!cardNumber.value.trim()) {
                document.getElementById('cardNumberError').textContent = 'Valid card number is required';
                isValid = false;
            }
            
            const expiry = document.getElementById('expiry');
            if (!expiry.value.trim()) {
                document.getElementById('expiryError').textContent = 'Valid expiry date (MM/YY) is required';
                isValid = false;
            }
            
            const cvv = document.getElementById('cvv');
            if (!cvv.value.trim()) {
                document.getElementById('cvvError').textContent = 'Valid CVV is required';
                isValid = false;
            }
            
            if (isValid) {
                
                showSection(confirmationSection);
                
                const total = cart.reduce((sum, item) => sum + item.price, 0);
                orderSummary.innerHTML = `
                    <h3>Order Summary</h3>
                    <p>Items: ${cart.length}</p>
                    <p>Total: $${total.toFixed(2)}</p>
                    <h4>Shipping to:</h4>
                    <p>${fullName.value}</p>
                    <p>${address.value}</p>
                `;
                
                cart = [];
                updateCart();
                if (cartButton) cartButton.style.display = 'none';
            }
        });
    }

    if (visitLink) {
        visitLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(carouselSection);
        });
    }
    
    if (aboutLink) {
        aboutLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(carouselSection);
        });
    }
    
    if (ticketsLink) {
        ticketsLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(registrationSection);
        });
    }
    
    if (faqLink) {
        faqLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(carouselSection);
        });
    }
    
    if (contactLink) {
        contactLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(carouselSection);
        });
    }
});

window.startAutoSlide = startAutoSlide;
window.stopAutoSlide = stopAutoSlide;
