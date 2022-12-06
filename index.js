// variables 
let title = document.getElementById('title') ; 
let price = document.getElementById('price') ; 
let taxes = document.getElementById('taxes') ; 
let ads= document.getElementById('ads') ; 
let discount = document.getElementById('discount') ; 
let total = document.getElementById('total') ; 
let count = document.getElementById('count') ; 
let category = document.getElementById('category') ; 
let create = document.getElementById('create') ; 
let search = document.getElementById('search') ; 
let titleSearch = document.getElementById('search-title') ; 
let categorySearch = document.getElementById('search-category') ; 
let deleteAllBtn = document.getElementById('deleteAll') ; 
let mode = 'create' ; 
let temp ; 

// get price 
let proData ; 
function getTotalPrice () {
if (price.value != '') {
    total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value ; 
    total.style.background = 'green' ; 
    }
    else {
        total.innerHTML = '' ; 
        total.style.background = 'red' ; 
    }

}
// create data 
if (localStorage.product != null) {
    proData = JSON.parse(localStorage.product) ;
}
else {
    proData = [] ; 
}
create.onclick = function () {
 
    let pro = {
        title: title.value.toLowerCase() , 
        price: price.value , 
        taxes :taxes.value , 
        ads : ads.value , 
        discount : discount.value , 
        total : total.innerHTML , 
        count : count.value ,  
        category :category.value.toLowerCase() , 
    };
    if (mode === 'create') {
        if (pro.count > 1 ) {
            for (let i = 0 ; i < pro.count ; i++) {
                proData.push(pro) ; 
            }
        }
        else {
            proData.push(pro) ; 
        }
    } else {
        proData[temp] = pro ;
        create.innerHTML = 'create' ; 
        count.style.display = 'block' ;  
        mode = 'create'
    }
    localStorage.setItem('product' , JSON.stringify(proData)) ; 
    
    clearData()  
    showData()
}

// clear data 
function clearData() {
    title.value = '' ;
    price.value ='' ; 
    taxes.value ='' ; 
    ads.value ='' ; 
    discount.value ='' ; 
    count.value ='' ; 
    category.value ='' ; 
    total.innerHTML ='' ; 
}

// show data 
function showData () {
    getTotalPrice() 
let table ='' ; 
for (let i = 0 ; i < proData.length ; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${proData[i].title}</td>
    <td>${proData[i].price}</td>
    <td>${proData[i].taxes}</td>
    <td>${proData[i].ads}</td>
    <td>${proData[i].discount}</td>
    <td>${proData[i].total}</td>
    <td>${proData[i].category}</td>
    <td><button onclick = "updateData(${i})">update</button></td>
    <td><button onclick = "deleteItem(${i})">delete</button></td>
    </tr>
    `
}
        document.getElementById('tbody').innerHTML = table ; 
        if (proData.length > 0) {
            deleteAllBtn.innerHTML = `
            <button onclick = "deleteAllItem()">delete All (${proData.length}) </button>
            `} else {
                deleteAllBtn.innerHTML = '' ; 
            }
}
showData() 
// delte item 
function deleteItem(i) {
    proData.splice (i , 1) ; 
    localStorage.setItem('product'  , JSON.stringify(proData)) ; 
    showData() 
}

// delete all item 
function deleteAllItem() {
    proData.splice(0) ; 
    localStorage.clear() ;
    showData() 
    
}
// update data 
function updateData (i) {
title.value = proData[i].title ; 
price.value = proData[i].price ; 
taxes.value = proData[i].taxes ; 
ads.value = proData[i].ads ; 
discount.value = proData[i].discount ; 
getTotalPrice() ; 
count.style.display ='none' ; 
category.value = proData[i].category ;
create.innerHTML ='update' ; 
mode ='update' ; 
temp =i ; 
scroll({
    top : 0 , 
    behavior : 'smooth'
})
}
// searching .
let searchMode = 'title' ; 
function getSearchMode(id) {
search.focus()
search.value = '' ; 
showData()
if (id == "search-title") {
    searchMode = 'title' ; 
    search.placeholder = 'search by title' ; 
}
else {
    searchMode = 'category' ; 
    search.placeholder = 'search by category' ; 
}
}
function dataSearch (value) {
    let table = '' ; 
    if (searchMode == 'title') {
        for (let i = 0 ; i < proData.length ; i++) {
            if (proData[i].title.includes(value)) {
            table += `
            <tr>
            <td>${i+1}</td>
            <td>${proData[i].title}</td>
            <td>${proData[i].price}</td>
            <td>${proData[i].taxes}</td>
            <td>${proData[i].ads}</td>
            <td>${proData[i].discount}</td>
            <td>${proData[i].total}</td>
            <td>${proData[i].category}</td>
            <td><button onclick = "updateData(${i})">update</button></td>
            <td><button onclick = "deleteItem(${i})">delete</button></td>
            </tr>
            `
            }
        }
    } else {
        for (let i = 0 ; i < proData.length ; i++) {
            if (proData[i].category.includes(value)) {
            table += `
            <tr>
            <td>${i+1}</td>
            <td>${proData[i].title}</td>
            <td>${proData[i].price}</td>
            <td>${proData[i].taxes}</td>
            <td>${proData[i].ads}</td>
            <td>${proData[i].discount}</td>
            <td>${proData[i].total}</td>
            <td>${proData[i].category}</td>
            <td><button onclick = "updateData(${i})">update</button></td>
            <td><button onclick = "deleteItem(${i})">delete</button></td>
            </tr>
            `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table ; 
}
    


 