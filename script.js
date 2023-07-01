function generateCardNumber() {
    let cardNumber = "4";
    for (let i = 0; i < 15; i++) {
        cardNumber += Math.floor(Math.random() * 10);
    }

    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }

    let checkDigit = sum % 10;
    checkDigit = (checkDigit === 0) ? 0 : 10 - checkDigit;
    cardNumber += checkDigit;

    return cardNumber;
}

function generateCards(numCards) {
    let cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let i = 0; i < numCards; i++) {
        let cardNumber = generateCardNumber();
        let expiryMonth = Math.floor(Math.random() * 12) + 1;
        let expiryYear = Math.floor(Math.random() * 5) + 2023;
        let cvv = Math.floor(Math.random() * 900) + 100;

        let cardData = `${cardNumber.slice(0, 16)}|${expiryMonth.toString().padStart(2, "0")}|20${expiryYear.toString().slice(2)}|${cvv}`;

        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.innerHTML = cardData;
        cardContainer.appendChild(cardDiv);
    }
}

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    let numCards = document.getElementById("num-cards").value;
    generateCards(numCards);
});
