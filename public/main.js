let $homeButton = $("#home");
let $allButton = $("#all");
let $addButton = $("#add");
let $updateButton = $("#update");
let $deleteButton = $("#delete");
let $inputContainer = $("#inputContainer");
const start = async () => {
    try{
        const data = await $.get('/category');
        console.log(data);
        pageLoader(data,"category");
    }
    catch (error){
        console.err(error);
    }
    
}
start();
$homeButton.on("click", start);

$allButton.on("click", async () => {
    try{
        const data = await $.get('/items');
        console.log(data);
        pageLoader(data,"item");
    }
    catch (error){
        console.err(error);
    }
});

$addButton.on("click", inputPage);

$updateButton.on("click", async () => {
    try{
        const data = await $.get('/items');
        console.log(data);
        updatePage(data);
    }
    catch (error){
        console.err(error);
    }
});

$deleteButton.on("click", async () => {
    try{
        const data = await $.get('/items');
        console.log(data);
        pageLoader3(data,"item");
    }
    catch (error){
        console.err(error);
    }
});

function pageLoader(data,opt){
    $(".inputs").remove();
    $(".create").remove();
    $(".form").remove();
    console.log(data);
    for(var i = 0; i < data.length; i++){
        const $infoBox = $(`<div  class='inputs ${JSON.stringify(data[i])}'></div>`);
        $infoBox.click(buttonBuilder);
        $infoBox.text(data[i][opt]);
        $infoBox.appendTo($inputContainer);
    }
}

function pageLoader2(data){
    $(".inputs").remove();
    $(".create").remove();
    $(".form").remove();
    console.log(data);
    for(var i = 0; i < data.length; i++){
        const $infoBox = $(`<div  class='inputs'>${data[i]["item"]}<br> Price: $${data[i]["price"]}<br>Qty: ${data[i]["qty"]}</div>`);
        $infoBox.appendTo($inputContainer);
    }
}
function pageLoader3(data,opt){
    $(".inputs").remove();
    $(".create").remove();
    $(".form").remove();
    console.log(data);
    for(var i = 0; i < data.length; i++){
        const $infoBox = $(`<div  class='inputs ${JSON.stringify(data[i])}'></div>`);
        $infoBox.click(buttonBuilderDelete);
        $infoBox.text(data[i][opt]);
        $infoBox.appendTo($inputContainer);
    }
}

function inputPage(){
    $(".inputs").remove();
    $(".form").remove();
    $(".create").remove();
    console.log("Creating add page");
    const $submitFormBtn = $('<button type="button">Submit</button>');
    const $inputBox = $(`<div class="form" method="post"></div>`);
    const $catInput = $(`<p class="inputTitle">Category:</p><input id="category" class="inputFeild" name="category">`);
    const $nameInput = $(`<p class="inputTitle">Name:</p><input id="name" class="inputFeild" name="name">`);
    const $priceInput = $(`<p class="inputTitle">Price:</p><input id="price" class="inputFeild" name="price">`);
    const $qtyInput = $(`<p class="inputTitle">Qty:</p><input id="qty" class="inputFeild" name="qty">`);
    $inputBox.text("Category is an int. Name is a string. Price is a float. Fill out all fields before submiting.");
    $catInput.appendTo($inputBox);
    $nameInput.appendTo($inputBox);
    $priceInput.appendTo($inputBox);
    $qtyInput.appendTo($inputBox);
    $submitFormBtn.appendTo($inputBox);
    $inputBox.appendTo($inputContainer);
    $submitFormBtn.click(submitForm);
}

function updatePage(data){
    $(".inputs").remove();
    $(".form").remove();
    $(".create").remove();
    console.log("Creating update page");
    for(var i = 0; i < data.length; i++){
        const $infoBox = $(`<div  class='inputs ${JSON.stringify(data[i])}'></div>`);
        $infoBox.click(updateButtonBuilder);
        $infoBox.text(data[i].item);
        $infoBox.appendTo($inputContainer);
    }
}
async function updateButtonBuilder(){
    $(".inputs").remove();
    $(".form").remove();
    $(".create").remove();
    console.log(`building button`);
    console.log(`clicked ${this.textContent}`);
    console.log(`clicked ${this.className}`);
    const dirtyString = this.className;
    const cleanedObj = dirtyString.slice(7,dirtyString.length)
    const obj = JSON.parse(cleanedObj);
    console.log(obj);
    console.log("in updateButtonBuilder")
    const $submitFormBtn = $('<button type="button">Submit</button>');
    const $inputBox = $(`<div class="form" method="post"></div>`);
    const $idInput = $(`<p class="inputTitle">Item_id:</p><input id="id" class="inputFeild" name="category">`);
    const $catInput = $(`<p class="inputTitle">Category:</p><input id="category" class="inputFeild" name="category">`);
    const $nameInput = $(`<p class="inputTitle">Name:</p><input id="name" class="inputFeild" name="name">`);
    const $priceInput = $(`<p class="inputTitle">Price:</p><input id="price" class="inputFeild" name="price">`);
    const $qtyInput = $(`<p class="inputTitle">Qty:</p><input id="qty" class="inputFeild" name="qty">`);
    //console.log(this.textContent);
    $inputBox.text(`Updating: ${this.textContent}\n Category is an int. Name is a string. Price is a float. Qty is an int. Fill out all fields before submiting.`);
    $idInput.val(obj.item_id);
    $catInput.val(obj.category_id);
    $nameInput.val(obj.item);
    $priceInput.val(obj.price);
    $qtyInput.val(obj.qty);
    $idInput.appendTo($inputBox);
    $catInput.appendTo($inputBox);
    $nameInput.appendTo($inputBox);
    $priceInput.appendTo($inputBox);
    $qtyInput.appendTo($inputBox);
    $submitFormBtn.appendTo($inputBox);
    $inputBox.appendTo($inputContainer);
    $submitFormBtn.click(submitFormUpdate);
}

async function buttonBuilder(e){
    console.log(`building button`);
    console.log(`clicked ${this.textContent}`);
    console.log(`clicked ${this.className}`);
    const dirtyString = this.className;
    const cleanedObj = dirtyString.slice(7,dirtyString.length)
    const obj = JSON.parse(cleanedObj);
    console.log(obj);
    let opt = "";
    if(obj.item_id != undefined){
        opt = "item";
    }else{
        opt = "category";
    }
    console.log(opt);
    try{
        const data = await $.get(`/${opt}/${obj[opt+"_id"]}`);
        console.log("You clicked it");
        if(opt == "category"){
            pageLoader(data,"item");
        }
        else{
            pageLoader2(data);
        }
    }
    catch (error){
        console.err(error);
    }
}

async function buttonBuilderDelete(e){
    console.log(`building delete button`);
    console.log(`clicked ${this.textContent}`);
    console.log(`clicked ${this.className}`);
    const dirtyString = this.className;
    const cleanedObj = dirtyString.slice(7,dirtyString.length);
    const obj = JSON.parse(cleanedObj);
    let id = obj.item_id;
    console.log("Deleting " + obj.item_id);
    try{
        await $.ajax(`/item/${id}`,{type: 'DELETE'});
        console.log("Deleted");
        reloadafterDelete();
    }
    catch (error){
        console.err(error);
    }
}

async function reloadafterDelete(){
    try{
        const data = await $.get('/items');
        console.log(data);
        pageLoader3(data,"item");
    }
    catch (error){
        console.err(error);
    }
}

async function submitForm () {
    console.log(typeof $("#category").val()); 
    console.log(typeof $("#name").val()); 
    console.log(typeof $("#price").val());  
    const cat = parseInt($("#category").val());
    const inputName =  $("#name").val();
    const price = parseFloat($("#price").val());
    const qtyInput = parseFloat($("#qty").val());
    const obj = {
        category_id: cat,
        item: inputName,
        price: price,
        qty: qtyInput
    };
        const response = await fetch('/item',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
        })
        .then(res => {res.json()})
        .then(data => console.log(data));
        console.log("Added part");
}

async function submitFormUpdate () {
    console.log(typeof $("#id").val());
    console.log(typeof $("#category").val()); 
    console.log(typeof $("#name").val()); 
    console.log(typeof $("#price").val());
    console.log(typeof $("#qty").val());
    const id = $("#id").val(); 
    console.log(id);
    const cat = parseInt($("#category").val());
    const inputName =  $("#name").val();
    const price = parseFloat($("#price").val());
    const qtyInput = parseInt($("#qty").val());
    const obj = {
        category_id: cat,
        item: inputName,
        price: price,
        qty: qtyInput
    };
    console.log(`Submiting update.`);
    console.log(obj);
        try{
            console.log("Updating part");
            const response = await fetch(`/item/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
            })
            .then(res => {res.json()})
            .then(data => console.log(data));
            //.then(id => showItemChange); 
        }
        catch (error){
            console.err(error);
        }
    showItemChange(id);
}
async function showItemChange(id){
    try{
        const data = await $.get(`/item/${id}`);
        console.log(data);
        pageLoader2(data);
    }
    catch (error){
        console.err(error);
    }
}