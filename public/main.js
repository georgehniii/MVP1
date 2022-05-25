const express = require('express');
const req = require('express/lib/request');
const app = express();
const db = require('./queries')
const port = process.env.Port || 5555;

app.listen(port,function(){
    console.log("Listing on 5555");
});

app.use(express.json());
app.get('/items', db.getItems);
app.get('/items/:id', db.getItemById);
app.get('/category', db.getCategories);
app.get('/category/:id',db.getItemsByCategory);
//app.post('/items', db.createPet);
//app.patch('/items/:id', db.updatePets);
//app.delete('/items/:id', db.deletePet);
app.use((req,res) => {
    res.status(404).send("Not Found");
});