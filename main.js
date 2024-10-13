let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mode= 'create';
let temp;

submit.onclick = function(){
    let newPro ={
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category:category.value.toLowerCase(),
    }
    if (mode === 'create'){
        datepro.push(newPro);
    }
    else{
        datepro[temp]= newPro;
        mode ='create';
        submit.innerHTML='create';
        count.style.display='block';
    }
    localStorage.setItem('product',JSON.stringify(datepro))
    clearData()
    showData()
}

function getTotal(){
    if(price.value != ''&& taxes.value !='' && ads.value!= '' && discount.value != '' )
    {
        let result = (+price.value + +taxes.value + +ads.value) 
        - discount.value;
        total.innerHTML=result;
        total.style.background='#040';
    }
    else{
        total.innerHTML='';
        total.style.background='#a00d00'
    }
}

if(localStorage.product != null){
    datepro = JSON.parse(localStorage.product)
}
else{
    datepro = [];
}

function showData() {
    getTotal();
    let tabel = '';
    for (let i = 0; i < datepro.length; i++) {
        tabel += `
        <tr>
            <td>${i+1}</td>
            <td>${datepro[i].title}</td>
            <td>${datepro[i].price}</td>
            <td>${datepro[i].taxes}</td>
            <td>${datepro[i].ads}</td>
            <td>${datepro[i].discount}</td>
            <td>${datepro[i].total}</td>
            <td>${datepro[i].category}</td>
            <td><button onclick ="updateDate(${i})" id='update'>update</button></td>
            <td><button onclick ="deleteData(${i})" id='delete'>delete</button></td>
        </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = tabel;
}
showData()


function clearData(){
    title.value = '';
    price.value = '';
    taxes.value ='' ;
    ads.value = '' ; 
    discount.value = '';
    count.value = '';
    category.value = '';
}

function deleteData(i)
{
    datepro.splice(i,1);
    localStorage.product = JSON.stringify(datepro);
    showData();
}

function updateDate(i)
{
    title.value = datepro[i].title;
    price.value = datepro[i].price;
    taxes.value = datepro[i].taxes ;
    ads.value = datepro[i].ads ; 
    discount.value = datepro[i].discount;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = "Update";
    category.value = datepro[i].category;
    temp=i;
    scroll({
        top:0,behavior:'smooth',
    })
    mode= 'update'
}

let searchMode = 'title'; // الوضع الافتراضي للبحث

function getSearchMode(id) {
    let search = document.getElementById('search'); // تم التعديل هنا
    if (id == 'searchTitle') {
        searchMode = 'title'; // البحث بالعنوان
    } else {
        searchMode = 'category'; // البحث بالفئة
    }
    search.focus();
}

function searchDate(value) {
    let table = '';

    // إذا كان مربع البحث فارغاً، قم بعرض جميع البيانات
    if (value === '') {
        showData();
        return;
    }
    
    // البحث على أساس الوضع الحالي (عنوان أو فئة)
    if (searchMode === 'title') {
        for (let i = 0; i < datepro.length; i++) {
            if (datepro[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${datepro[i].title}</td>
                    <td>${datepro[i].price}</td>
                    <td>${datepro[i].taxes}</td>
                    <td>${datepro[i].ads}</td>
                    <td>${datepro[i].discount}</td>
                    <td>${datepro[i].total}</td>
                    <td>${datepro[i].category}</td>
                    <td><button onclick="updateDate(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }
        }
    } else if (searchMode === 'category') {
        for (let i = 0; i < datepro.length; i++) {
            if (datepro[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${datepro[i].title}</td>
                    <td>${datepro[i].price}</td>
                    <td>${datepro[i].taxes}</td>
                    <td>${datepro[i].ads}</td>
                    <td>${datepro[i].discount}</td>
                    <td>${datepro[i].total}</td>
                    <td>${datepro[i].category}</td>
                    <td><button onclick="updateDate(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }
        }
    }

    document.getElementById('tbody').innerHTML = table; // عرض البيانات المصفاة
}
