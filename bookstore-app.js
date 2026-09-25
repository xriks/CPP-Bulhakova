document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const message = document.getElementById("message");
    const bookItems = document.querySelectorAll(".book-item");

    const buyButtons = document.querySelectorAll(".buy-button");
    const cartList = document.getElementById("cartList");
    const cartMessage = document.getElementById("cartMessage");

    const wishlistButtons = document.querySelectorAll(".wishlist-button");
    const wishlistList = document.getElementById("wishlistList");
    const wishlistMessage = document.getElementById("wishlistMessage");


    function searchBooks() {
        const searchText = searchInput.value.trim().toLowerCase();
        let foundBooks = 0;

        bookItems.forEach(function (book) {
            const title = book.querySelector("h3").textContent.toLowerCase();

            if (title.includes(searchText)) {
                book.style.display = "flex";
                foundBooks++;
            } else {
                book.style.display = "none";
            }
        });

        if (searchText === "") {
            message.textContent = "Будь ласка, введіть назву книги для пошуку.";
            message.style.color = "#8b263e";
        } else if (foundBooks > 0) {
            message.textContent = `Знайдено книг: ${foundBooks}`;
            message.style.color = "#2c3e50";
        } else {
            message.textContent = "Книгу з такою назвою не знайдено.";
            message.style.color = "#8b263e";
        }
    }

    searchButton.addEventListener("click", searchBooks);

    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            searchBooks();
        }
    });


    buyButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const book = button.closest(".book-item");
            const title = book.querySelector("h3").textContent;
            const price = book.querySelector(".price").textContent;

            const cartItem = document.createElement("li");
            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <span><strong>${title}</strong> — ${price}</span>
                <button type="button" class="remove-btn">Видалити</button>
            `;

            const removeButton = cartItem.querySelector(".remove-btn");

            removeButton.addEventListener("click", function () {
                cartItem.remove();

                if (cartList.children.length === 0) {
                    cartMessage.style.display = "block";
                    cartMessage.textContent = "Кошик порожній.";
                }
            });

            cartList.appendChild(cartItem);
            cartMessage.style.display = "none";
        });
    });

    wishlistButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const book = button.closest(".book-item");
            const title = book.querySelector("h3").textContent;

            const existingItems = Array.from(wishlistList.children);

            const alreadyInWishlist = existingItems.find(function (item) {
                return item.dataset.title === title;
            });

            if (alreadyInWishlist) {
                alreadyInWishlist.remove();

                button.classList.remove("active");
                button.textContent = "♥ В обране";

                if (wishlistList.children.length === 0) {
                    wishlistMessage.style.display = "block";
                    wishlistMessage.textContent = "Список бажань порожній.";
                }

                return;
            }

            const wishlistItem = document.createElement("li");
            wishlistItem.className = "cart-item";
            wishlistItem.dataset.title = title;

            wishlistItem.innerHTML = `
                <span><strong>${title}</strong></span>
                <button type="button" class="remove-btn">Видалити</button>
            `;

            const removeButton = wishlistItem.querySelector(".remove-btn");

            removeButton.addEventListener("click", function () {
                wishlistItem.remove();

                button.classList.remove("active");
                button.textContent = "♥ В обране";

                if (wishlistList.children.length === 0) {
                    wishlistMessage.style.display = "block";
                    wishlistMessage.textContent = "Список бажань порожній.";
                }
            });

            wishlistList.appendChild(wishlistItem);

            button.classList.add("active");
            button.textContent = "✓ В обраному";

            wishlistMessage.style.display = "none";
        });
    });

});