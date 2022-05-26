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
        pageLoader(data,"item");
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
    console.log(data);
    for(var i = 0; i < data.length; i++){
        const $infoBox = $(`<div  class='inputs'></div>`);
        $infoBox.text(`${data[i]["item"]} \nPrice: $${data[i]["price"]}`);
        $infoBox.appendTo($inputContainer);
    }
}
function pageLoader3(data,opt){
    $(".inputs").remove();
    $(".create").remove();
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
    $(".create").remove();
    console.log("Creating add page");
    const $submitFormBtn = $('<button type="button">Submit</button>');
    const $inputBox = $(`<form class="input" action="/my-handling-form-page" method="post"></form>`);
    const $catInput = $(`<p class="inputTitle">Category:</p><input id="category" class="inputFeild" name="category">`);
    const $nameInput = $(`<p class="inputTitle">Name:</p><input id="name" class="inputFeild" name="name">`);
    const $priceInput = $(`<p class="inputTitle">Price:</p><input id="price" class="inputFeild" name="price">`);
    $inputBox.text("Category is an int. Name is a string. Price is a float. Fill out all fields before submiting.");
    $catInput.appendTo($inputBox);
    $nameInput.appendTo($inputBox);
    $priceInput.appendTo($inputBox);
    $submitFormBtn.appendTo($inputBox);
    $inputBox.appendTo($inputContainer);
    $submitFormBtn.click(submitForm);
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
    }
    catch (error){
        console.err(error);
    }
}

async function submitForm () {
    try{  
        await $.post('/item', {body: {
            "category_id": $("#category").value,
            "item": $("#name").value,
            "price": $("#price").value,
            } });
        /*$.ajax(`/item${id}`,{type: 'POST', 
             data: `{
                "category_id": "${$("#category").value}",
                "item": "${$("#name").value}",
                "price": "${$("#price").value}",
                }`});
            /*$.ajax({
                type: "POST",
                url: "/item",
                data: `{
                "category_id": "${$("#category").value}",
                "item": "${$("#name").value}",
                "price": "${$("#price").value}",
                }`,
                success: function (result) {
                console.log(result);
                },
                dataType: "json"
            });*/
        console.log("Added part");
    }
    catch (error){
        console.err(error);
    }
}
