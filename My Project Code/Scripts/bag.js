
let bagItemObjects;

onLoad();



function onLoad() {
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}



function loadBagItemObjects() {
    // map converts array into array of different type
    // items => array of objects
    bagItemObjects = bagItems.map(
        itemID => {
            for(let i = 0 ; i < items.length ; i++) {
                // double equal as 1 == '001'
                if(itemID == items[i].id) {
                    return items[i];
                    // returns complete item object
            }
        }
    });
    console.log(bagItemObjects);
}


function displayBagItems() {

    console.log(bagItems);

    let containerElement = document.querySelector('.bag-items-container');

    let innerHTML = '';

    bagItemObjects.forEach(
        bagItem => {
            innerHTML += generateItemHTML(bagItem);
        }
    );

    containerElement.innerHTML = innerHTML;
}


function removeFromBag(itemID) {
    bagItems = bagItems.filter(bagItemID => bagItemID != itemID);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
}


function generateItemHTML(item) {
    return `<div class="bag-item-container">
        <div class="item-left-part">
            <img class="bag-item-img" src="../${item.item_image}">
        </div>
        <div class="item-right-part">
            <div class="company-name">${item.company_name}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="curr-price">Rs ${item.price.current_price}</span>
                <span class="orig-price">Rs ${item.price.original_price}</span>
                <span class="discount">(${item.price.discount}% OFF)</span>
            </div>
            <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
            </div>
            <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
            </div>
        </div>
        <div class="remove-from-cart" onclick="removeFromBag(${item.id});">X</div>
    </div>`;
}


function displayBagSummary() {
    let bagSummaryElement = document.querySelector('.bag-summary');

    let totalItems = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;
    const CONVENIENCE_FEES = 99;
    let finalPayment = 0;

    bagItemObjects.forEach(
        bagItem => {
            totalMRP += bagItem.price.original_price;
            totalDiscount += bagItem.price.original_price - bagItem.price.current_price;
        }
    );

    finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

    bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItems} Items)</div>
        <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">₹${totalMRP}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">- ₹${totalDiscount}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">₹${CONVENIENCE_FEES}</span>
        </div>
        <hr>
        <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">₹${finalPayment}</span>
        </div>
    </div>
    <button class="btn-place-order" onclick="placeOrder();">
        <div class="css-xjhrni">PLACE ORDER</div>
    </button>`;
}

function placeOrder() {
    let buttonElement = document.querySelector('.btn-place-order');
    buttonElement.addEventListener('click', () => {
        buttonElement.innerHTML = 'Processing...';
        setTimeout(() => {
            buttonElement.innerHTML = 'Thankyou for your order! :)';
        }, 2000);
    });
}