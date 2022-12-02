import {clothes} from "./data.js"

let container = document.querySelector(".clothes-grid")
let outerWearFilter = document.querySelector(".outer-wear")
let pantsFilter = document.querySelector(".pants")
let menClothes = document.querySelector(".men-clothes")
let womenClothes = document.querySelector('.women-clothes')
let skirtFilter = document.querySelector('.skirt')
let dressFilter = document.querySelector('.dress')
let shoppingCart = document.querySelector(".shopping-cart")
let shoppingBasket = document.querySelector(".shopping-basket")
let newBasketElements = document.querySelector(".added-elements")
let searchClothes = document.getElementById('search')
let headerText = document.querySelector('.text')
let buyButton = document.querySelector('.buy-btn')
let totalPrice = 0
let basket = JSON.parse(localStorage.getItem('shopping')) || []
let showClothesFilter = Array.from(document.querySelectorAll(".clothes-types"))

//adding clothes to main screen from data.js
function addClothes(){
    clothes.forEach(elem => {
        newHTML(elem)
    })
}
addClothes()
//searching for clothes by names, companies, categories
searchClothes.addEventListener('input',(e)=>{
    container.innerHTML=""
    clothes.forEach(elem => {
        if((elem.name).toLowerCase().search(e.target.value)>-1 ||
        (elem.category).toLowerCase().search(e.target.value)>-1 ||
        (elem.company).toLowerCase().search(e.target.value)>-1){
            newHTML(elem)
        }
})
})
//HTML for filter clothes, get them on first load of page
function newHTML(elem){
    container.innerHTML += "<div id='"+ elem.id+ "'class='clothes'><img class='image' src='"
    +elem.img+"'></img>"+"<span class='price-span'>"+elem.price+" тг"+"</span>"+
    "<span>"+elem.company+"</span>"+"<span>"+elem.name+"</span>"+"<button class='basket-btn'><i class='fa-sharp fa-solid fa-basket-shopping'></i></button"
    +"</div>"
}
//returns to all clothes
headerText.addEventListener('click',()=>{
    container.innerHTML=""
    clothes.forEach(elem => {
            newHTML(elem)
    })
    addBtn()
})
//filter for men clothes
menClothes.addEventListener('click',filterMenClothes)
function filterMenClothes(){
    if(window.screen.width>500){
        container.innerHTML=""
        clothes.forEach(elem => {
        if(elem.gender==="men"){
            newHTML(elem)
        }
        for(let key in showClothesFilter){
            if(showClothesFilter[key].classList.contains('men')){
                showClothesFilter[key].classList.remove('show-clothes')
            }
        }
    })
    }
    if(window.screen.width<=500){
        filterMenAndWomenClothes = true
        for(let key in showClothesFilter){
                if(showClothesFilter[key].classList.contains('men')){
                    showClothesFilter[key].classList.toggle('show-clothes')
            }
            
        }
    }
    addBtn()
}
//filter for outer wear
outerWearFilter.addEventListener('click', filterOuterWear)
function filterOuterWear(){
    container.innerHTML=""
    clothes.forEach(elem => {
        if(elem.category==="Outer wear"){
            newHTML(elem)
        } 
    })
    addBtn()
}
//filter for pants
pantsFilter.addEventListener('click', filterPants)
function filterPants(){
    container.innerHTML=""
    clothes.forEach(elem => {
        if(elem.category==="pants"){
            newHTML(elem)
        } 
    })
    addBtn()
}
//filter for women clothes
womenClothes.addEventListener('click',filterWomenClothes)
function filterWomenClothes(){
    if(window.screen.width>500){
        container.innerHTML=""
        clothes.forEach(elem => {
        if(elem.gender==="women"){
            newHTML(elem)
        }
        for(let key in showClothesFilter){
            if(showClothesFilter[key].classList.contains('women')){
                showClothesFilter[key].classList.remove('show-clothes')
            }
        }
    })
    }
    if(window.screen.width<=500){
        for(let key in showClothesFilter){
            if(showClothesFilter[key].classList.contains('women')){
                showClothesFilter[key].classList.toggle('show-clothes')
            }
        }
    }
    addBtn()
}
//filter for skirts
skirtFilter.addEventListener('click', filterSkirt)
function filterSkirt(){
    container.innerHTML=""
    clothes.forEach(elem => {
        if(elem.category==="skirt"){
            newHTML(elem)
        } 
    })
    addBtn()
}
//filter for dresses
dressFilter.addEventListener('click', filterDress)
function filterDress(){
    container.innerHTML=""
    clothes.forEach(elem => {
        if(elem.category==="dress"){
            newHTML(elem)
        } 
    })
    addBtn()
}
//pop-up window of shopping cart
shoppingCart.addEventListener('click', ()=>{
    shoppingBasket.classList.toggle("active")
})
let removePopUpWindow = document.querySelector(".remove")
removePopUpWindow.addEventListener('click',()=>{
    shoppingBasket.classList.toggle("active")
})

//checking for local storage
if(basket!==null){
    for(let key in basket){
        newBasketElements.innerHTML += "<div id='"+ basket[key].id+"' class='added-element'><img class='small-img' src='"+
        basket[key].img+"'</img><div class='price-name'><span>"+basket[key].name+
        "</span>"+basket[key].company+"<span class='price'>"+basket[key].price+
        " тг</span><span><i class='fa-solid fa-minus'></i> <span class='num-of-clothes'>"+basket[key].num+"</span> <i class='fa-solid fa-plus'></i></span></div>"+
        "<div class='trash-icon'><i class='fa-solid fa-trash'></div></div>"
        updateTotal()
        settingElements()
    }
}
function settingElements(){
    //setting elements for deleting
    let trashIcons = document.querySelectorAll(".trash-icon")
    for(let i=0;i<trashIcons.length;i++){
        trashIcons[i].addEventListener('click',removeElement)
    }
    //num increment and decrement
    let numIncrement = document.querySelectorAll('.fa-plus')
    for(let i=0; i<numIncrement.length; i++){
        numIncrement[i].addEventListener('click',increment)
    }
    let numDecrement = document.querySelectorAll('.fa-minus')
    for(let i=0; i<numDecrement.length; i++){
        numDecrement[i].addEventListener('click',decrement)
    }
    function increment(){
        let number = Number(event.target.parentElement.querySelector('.num-of-clothes').innerText)
        number = Number(number)+1
        event.target.parentElement.querySelector('.num-of-clothes').innerText = number
        updateTotal()
        let id = event.target.parentElement.parentElement.parentElement.id
        let a = basket.filter(elem => elem.id == id) // a - the element we incrementing, filtered from basket
        a[0].num = number
        localStorage.setItem("shopping",JSON.stringify(basket))
    }
    function decrement(){
        let number = Number(event.target.parentElement.querySelector('.num-of-clothes').innerText)
        if(number <= 1) return 
        number = Number(number)-1
        event.target.parentElement.querySelector('.num-of-clothes').innerText = number
        updateTotal()
        let id = event.target.parentElement.parentElement.parentElement.id
        let a = basket.filter(elem => elem.id == id) // a - the element we decrementing, filtered from basket
        a[0].num = number
        localStorage.setItem("shopping",JSON.stringify(basket))
    }  
    //delete element from basket
    function removeElement(){
        let id = event.target.parentElement.id
        basket = basket.filter(elem => elem.id != id)
        event.target.parentElement.remove()
        updateTotal()
        localStorage.setItem("shopping",JSON.stringify(basket))
    }
}
//Button for adding to basket
function addBtn(){
    let basketBtn = document.querySelectorAll(".basket-btn")
    basketBtn.forEach(elem=>elem.addEventListener('click', ()=>{
        let elemId = elem.parentElement.id
        let elemToPush = clothes[elemId]
        //can't have two same clothes
        for(let i=0;i<basket.length;i++){
            if(basket[i].id == elemId){
                alert("Уже есть в корзине")
                return 
            }
        }
        basket.push({id:elemToPush.id,num:1,img:elemToPush.img,name:elemToPush.name,price:elemToPush.price,company:elemToPush.company})
        newBasketElements.innerHTML += "<div id='"+ elemToPush.id+"' class='added-element'><img class='small-img' src='"+
        elemToPush.img+"'</img><div class='price-name'><span>"+elemToPush.name+
        "</span>"+elemToPush.company+"<span class='price'>"+elemToPush.price+
        " тг</span><span><i class='fa-solid fa-minus'></i> <span class='num-of-clothes'>1</span> <i class='fa-solid fa-plus'></i></span></div>"+
        "<div class='trash-icon'><i class='fa-solid fa-trash'></div></div>"
        updateTotal()
    settingElements()
    localStorage.setItem("shopping",JSON.stringify(basket))
    }))
}
addBtn()

//UPDATING TOTAL PRICE
function updateTotal(){
    let basket = document.querySelectorAll(".added-element")
    totalPrice = 0
    for(let i=0;i<basket.length;i++){
        let priceOfElement = Number(basket[i].querySelector('.price').innerText.replace("тг",'').split(" ").join(""))
        let inputValue = basket[i].querySelector('.num-of-clothes').innerText
        totalPrice = totalPrice + priceOfElement*inputValue
    }
    document.querySelector('.total-price').innerHTML = `Общее: ${totalPrice} тг`
}
//purchase button
buyButton.addEventListener('click',()=>{
    if(basket!==[]){
        basket = []
    newBasketElements.innerHTML = ""
    document.querySelector('.total-price').innerHTML = `Общее: 0`
    alert('Товары заказаны, ожидайте доставку')
    localStorage.setItem("shopping",JSON.stringify([]))
    }
})

