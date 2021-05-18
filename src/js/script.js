//    button for opening shopping pager   //
var btnShopping = document.querySelector('.main .main__title_button button');
var headerLogo = document.querySelector('.header-logo');
var mainHtml = document.querySelector('.mainHTML');
var shoppingHTML = document.querySelector('.shoppingHTML');
var menuPopup = document.querySelector('.menu__popup');
var karzinkaPopup = document.querySelector('.karzinka__popup');

// Shoping page variables //
var cardShopName = document.querySelector('.card-shop__name');
var cardShopPrice = document.querySelectorAll('.card-shop__price span')[0];
var cardShopPriceTaxIncl = document.querySelectorAll('.card-shop__price span')[1];
var cardShopTitle = document.querySelector('.card-shop__title');
var cardShopSubTitle = document.querySelector('.card-shop__subtitle');
var selectInches = document.querySelector('.card-shop__selectInches');
var countADDcartMinus = document.querySelector('.countADDcart__minus');
var countADDcartPlus = document.querySelector('.countADDcart__plus');
var countADDcartNmbr = document.querySelector('.countADDcart__nmbr');

var menu = document.querySelector('.mob-icon');
var header = document.querySelector('.header');
var main = document.querySelector('.main');
var closMenu = document.querySelector('.popup__menu-head');
var closKarzinkaPopup = document.querySelector('.karzinka__head-clos');


var allKarzinka = document.querySelectorAll('.karzinka');
var karzinkaBody = document.querySelector('.karzinka__body');
var bodyCard = document.querySelectorAll('.karzinka__body-card');
var menuLinkSpam = document.querySelectorAll('.menu__link_span');
var headerChart = document.querySelector('.karzinka__head-chart');

var carouselInner = shoppingHTML.querySelectorAll('.carousel-inner');
var cardShopSelect = shoppingHTML.querySelector('.card-shop__selectInches');
var totalPrice = document.querySelector('.karzinka__footer .total-price');
totalPrice.innerHTML = '$0';

var shoppingData;
var shopHeight;
var count = 1;

var headerDisplay;
var mainDisplay;
var shopingDisplay;

var unsetInputArrow;
var plus;
var minus;
var onePriceKarzinka;
var inputPrice = "$0";

async function dataBase() {
    await fetch('http://localhost:3000/shopping')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            shoppingData = data;
        });
}
dataBase();

shoppingHTML.addEventListener('click', () => {
    karzinkaPopup.style.display = 'none';
})
main.addEventListener('click', () => {
    karzinkaPopup.style.display = 'none';
})
btnShopping.addEventListener('click', function () {
    count = 1;
    mainHtml.style.display = 'none';
    shoppingHTML.style.visibility = 'visible';
    shoppingHTML.style.display = 'block';
    insertImgShoppingCarousel();
    shopHeight = document.querySelector('.shoppingHTML');
    insertShopingData();
    karzinkaPopup.style.display = 'none';
});
headerLogo.addEventListener('click', function () {
    count = 1;
    mainHtml.style.display = 'block';
    shoppingHTML.style.visibility = 'hidden';
    shoppingHTML.style.display = 'none';
    karzinkaPopup.style.display = 'none';
});

//

//==================   START SELECTED COUNT OF ITEMS   ==================//

countADDcartMinus.addEventListener('click', function () {
    countADDcartNmbr.value--;
    if (countADDcartNmbr.value <= 0) {
        countADDcartNmbr.value = 1;
    }
    cardShopPrice.innerHTML = shoppingData[2].currency + (shoppingData[2].price * countADDcartNmbr.value).toFixed(2);
})
countADDcartPlus.addEventListener('click', function () {
    countADDcartNmbr.value++;
    cardShopPrice.innerHTML = shoppingData[2].currency + (shoppingData[2].price * countADDcartNmbr.value).toFixed(2);
})
countADDcartNmbr.addEventListener('input', function () {
    if (countADDcartNmbr.value <= 0) {
        countADDcartNmbr.value = 1;
    }
    cardShopPrice.innerHTML = shoppingData[2].currency + (shoppingData[2].price * countADDcartNmbr.value).toFixed(2);
})

//=======================   END   =========================================//

function ollTotalPrice() {
    totalPrice.innerHTML = '$0';
    for (let i = 0; i < unsetInputArrow.length; i++) {
        totalPrice.innerHTML = '$' + (Number(totalPrice.innerHTML.slice(1)) + Number(onePriceKarzinka[i].innerHTML.slice(1))).toFixed(2);
    }
}

function listenetButton() {
    for (let i = 0; i < unsetInputArrow.length; i++) {
        ollTotalPrice();
            unsetInputArrow[i].addEventListener('focus', function () {
            inputPrice = Number(onePriceKarzinka[i].innerHTML.slice(1)) / Number(unsetInputArrow[i].value);
            ollTotalPrice();
        })
        unsetInputArrow[i].addEventListener('input', () => {
            if (unsetInputArrow[i].value <= 0) {
                unsetInputArrow[i].value = 1;
            }
            let currency = onePriceKarzinka[i].innerHTML[0];
            onePriceKarzinka[i].innerHTML = currency + (inputPrice * Number(unsetInputArrow[i].value)).toFixed(2);
            ollTotalPrice();
        })
        plus[i].addEventListener('click', () => {
            let price = Number(onePriceKarzinka[i].innerHTML.slice(1)) / Number(unsetInputArrow[i].value);
            unsetInputArrow[i].value++;
            let currency = onePriceKarzinka[i].innerHTML[0];
            onePriceKarzinka[i].innerHTML = currency + (price * Number(unsetInputArrow[i].value)).toFixed(2);
            ollTotalPrice();
        })
        minus[i].addEventListener('click', () => {
            let price = Number(onePriceKarzinka[i].innerHTML.slice(1)) / Number(unsetInputArrow[i].value);
            unsetInputArrow[i].value--;
            if (unsetInputArrow[i].value <= 0) {
                unsetInputArrow[i].value = 1;
            }
            let currency = onePriceKarzinka[i].innerHTML[0];
            onePriceKarzinka[i].innerHTML = currency + (price * Number(unsetInputArrow[i].value)).toFixed(2);
            ollTotalPrice();
        })
    }
}


//========================== start add to card   =======================

var addToCard = document.querySelector('.card-shop__addCard');

addToCard.addEventListener('click', cardList);

//========================== end add to card   =======================


//=============================   start card list   =============================

function cardList() {
    let carouselFirstImg = document.querySelectorAll('.carousel-inner .carousel-item img')[0];
    cardShopSelect = shoppingHTML.querySelector('.card-shop__selectInches');
    let str1 = cardShopSelect.value.toLowerCase();
    let regex = /\d+/g;
    let str2 = str1.match(regex);
    let text = ` - ${str2[0]}cm / ${str2[1]}in`;
    // karzinkaBody.innerHTML = '';
    // for (let i = 0; i < shoppingData.length; i++) {
        let str = `
        <div class="karzinka__body-card">
                    <div class="karzinka__body-img">
                        <img src= ${carouselFirstImg.src} alt="img">
                    </div>
                    <div class="karzinka__body-title">
                        <div class="karzinka__body-text">
                            ${cardShopName.innerHTML + text}
                        </div>
                        <div class="karzinka__body-price">
                            <span class="red">${cardShopPrice.innerHTML}</span>
                            <span class="line">$29.95</span>
                        </div>
                        <div class="karzinka__body-count">
                            <button class="minus">-</button>
                            <input class="unsetInputArrow" type="number" value=${countADDcartNmbr.value}>
                            <button class="plus">+</button>
                        </div>
                    </div>
                </div>`;
        karzinkaBody.innerHTML += str;
    countKarzinka();
    // }
    plus = document.querySelectorAll('.plus');
    minus = document.querySelectorAll('.minus');
    unsetInputArrow = document.querySelectorAll('.unsetInputArrow');
    onePriceKarzinka = document.querySelectorAll('.red');
    listenetButton();
}
// cardList ();


//==================================   end card list   =============================


//=======   insert data in Shopping page   =======//

function insertShopingData () {
    cardShopName.innerHTML = shoppingData[2].name;
    cardShopPriceTaxIncl.innerHTML = shoppingData[2].tax;
    cardShopPrice.innerHTML = shoppingData[2].currency + shoppingData[2].price;
    cardShopTitle.innerHTML = shoppingData[2].titleDescription;
    cardShopSubTitle.innerHTML = shoppingData[2].description.replaceAll('\n', '<br>');
    for (let i = 0; i < shoppingData[2]["length"].length; i++) {
        let option = document.createElement('option');
        option.innerHTML = shoppingData[2]["length"][i];
        option.setAttribute("value", shoppingData[2]["length"][i]);
        selectInches.appendChild(option);
    }
}

//   End   //


//==== insert carousel images in Shopping HTML from JSON ======//

function insertImgShoppingCarousel () {
    let carouselIndicators = shoppingHTML.querySelectorAll('.carousel-indicators');
    carouselInner = shoppingHTML.querySelectorAll('.carousel-inner');
    // for (let i = 0; i < shoppingData.length; i++) {
    //
    // }

    for (let j = 0; j < shoppingData[2].images.length; j++) {

        //  start add images of Indicators //
        let newImgIndicator = document.createElement('img');
        newImgIndicator.src = shoppingData[2].images[j];
        if (j === 0) {
            newImgIndicator.classList.add("active");
            newImgIndicator.setAttribute("aria-current", "true");
        }
        newImgIndicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
        newImgIndicator.setAttribute("data-bs-slide-to", j + '');
        newImgIndicator.setAttribute("aria-label", "Slide " + j);
        carouselIndicators[0].appendChild(newImgIndicator);
        //  end add images of Indicators //

        //  start add images of Inner Carousel //
        let newImgCarousel = document.createElement('img');
        let newCarouselItem = document.createElement('div');

        newCarouselItem.classList.add('carousel-item');
        if (j === 0) {
            newCarouselItem.classList.add('active');
            newImgCarousel.setAttribute("aria-current", "true");
        }
        newImgCarousel.src = shoppingData[2].images[j];
        newImgCarousel.classList.add('d-block', 'w-100');
        newCarouselItem.appendChild(newImgCarousel);
        carouselInner[0].appendChild(newCarouselItem);
        //  end add images of Inner Carousel //

    }
}



// document.getElementsByClassName()

//------------------------------   end  shopping    --------------------------




function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}



testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }else{
        document.querySelector('body').classList.add('no-webp');
    }
});




//=======================================   start count karzinka   ============================

function countKarzinka() {
    bodyCard = document.querySelectorAll('.karzinka__body-card')
    for (let elem of menuLinkSpam) {
        elem.innerHTML = bodyCard.length;
    }
    headerChart.innerHTML = `Cart (${bodyCard.length} items)`;
}
countKarzinka();

//===========================================   end count karzinka   ==================================

//========================  start menu popup   =================================

menu.addEventListener('click', function () {
    // headerDisplay = getComputedStyle(header).display;
    mainDisplay = getComputedStyle(main).display;
    shopingDisplay = getComputedStyle(shoppingHTML).display;
    header.style.display = 'none';
    main.style.display = 'none';
    menuPopup.style.display = 'block';
    shoppingHTML.style.display = 'none';
    shoppingHTML.style.visibility = 'hidden';
    var height = window.innerHeight;
    menuPopup.style.height = height + 'px';
})
closMenu.addEventListener('click', function () {
    if (mainDisplay === 'block') {
        main.style.display = 'block';
        shoppingHTML.style.display = 'none';
        shoppingHTML.style.visibility = 'hidden';
    }
    if (shopingDisplay === 'block') {
        main.style.display = 'none';
        shoppingHTML.style.display = 'block';
        shoppingHTML.style.visibility = 'visible';
    }
    header.style.display = 'block';
    menuPopup.style.display = 'none';
    menuPopup.style.height = 'unset'
})

//==============================  end menu popup   =============================


//=========================   start karzinka popup   =============================

for (let elem of allKarzinka) {
    elem.addEventListener('click', function() {
        mainDisplay = getComputedStyle(main).display;
        shopingDisplay = getComputedStyle(shoppingHTML).display;
        var width = window.innerWidth;
        var height = window.innerHeight;
        var bodyHeight = document.body.clientHeight;
        karzinkaPopup.style.display = 'block';
        if (width <= 768) {
            karzinkaBody.style.height = (height - 53 - 115) + 'px';
            shoppingHTML.style.display = 'none';
            shoppingHTML.style.visibility = 'hidden';
            karzinkaPopup.style.height = height + 'px';
        } else {
            karzinkaBody.style.height = (bodyHeight - 53 - 115) + 'px';
            karzinkaPopup.style.height = bodyHeight + 'px';
        }
    });
}
closKarzinkaPopup.addEventListener('click', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var bodyHeight = document.body.clientHeight;
    karzinkaPopup.style.display = 'none';
    if (width > 768) {
        karzinkaBody.style.height = (bodyHeight - 53 - 115) + 'px';
    } else {
        if (mainDisplay === 'block') {
            main.style.display = 'block';
        }
        if (shopingDisplay === 'block') {
            shoppingHTML.style.display = 'block';
            shoppingHTML.style.visibility = 'visible';
        }
    }
})

//==========================   end karzinka popup   ===================


