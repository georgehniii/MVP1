require("dotenv").config();
const express = require('express');
const req = require('express/lib/request');
const app = express();
const db = require('./queries');
const port = process.env.PORT || 5555;

app.listen(port,function(){
    console.log(`Listing on port ${port}`);
});

app.use(express.json());
app.get('/items', db.getItems);
app.get('/items/:id', db.getItemById);
app.get('/category', db.getCategories);
app.get('/category/:id',db.getItemsByCategory);
//app.post('/items', db.createItem);
//app.patch('/items/:id', db.updateItem);
//app.delete('/items/:id', db.deleteItem);
app.use((req,res) => {
    res.status(404).send("Not Found");
});