//const { client_encoding } = require("pg/lib/defaults");

let $homeButton = $("#home");
let $allButton = $("#all");
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

function pageLoader(data,opt){
    $(".inputs").remove();
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
    console.log(data);
    for(var i = 0; i < data.length; i++){
        const $infoBox = $(`<div  class='inputs'></div>`);
        $infoBox.text(`${data[i]["item"]} \nPrice: $${data[i]["price"]}`);
        $infoBox.appendTo($inputContainer);
    }
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