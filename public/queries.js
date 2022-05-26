//connecting to the database........
const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'puser',
//   host: 'localhost',
//   database: 'mvp',
//   password: 'asd123',
//   port: 5432,
// })

const pool = new Pool({
    // Format: postgres://user:password@host:5432/database
    
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });


const getItems = async (req, res) => {
    console.log("fetching items");
    try{
        const data = await pool.query('SELECT * FROM items');
        res.send(data.rows);
    }
    catch (error){
        console.err(error);
    }
   
  }

const getItemById = async (req, res) => {
    const id = req.params.id;
    console.log("fetching item by id");
    try{
        const data = await pool.query('SELECT * FROM items WHERE item_id = $1',[id]);
        res.send(data.rows);
        res.status(200);
    }
    catch (error){
        console.log(error);
    }
}

const getCategories = async (req, res) => {
    console.log("fetching categories");
    try{
        const data = await pool.query('SELECT * FROM categories');
        res.send(data.rows);
        res.status(200);
    } 
    catch (error){
        console.err(error.message);
    } 
  }

const getItemsByCategory = async (req, res) => {
    console.log("fetching item by category");
    const id = req.params.id;
    try{
        const data = await pool.query('SELECT * FROM items WHERE category_id = $1',[id]);
        res.send(data.rows);
        console.log(data.rows);
        res.status(200);
    }
    catch (error){
        console.log(error);
    }
}

//have to fix the ry cathces
const createItem = (req, res) => {
    const {category_id,item,price} = req.body

    pool.query('INSERT INTO items (category_id,item,price) VALUES ($1, $2, $3)', [category_id,item,price], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).send('Item added')

    })
}

const updateItem = (req, res) => {
    const id = req.params.id;
    const {category_id,item,price} = req.body
    
    pool.query(
        'UPDATE items SET category_id = $1, item = $2, price = $3 WHERE item_id = $4',
        [category_id,item,price], (err, results) => {
            if (err) {
                res.send('Usage: category_id,item_name,price')
                throw err
              }
              res.status(200).send(`Item modified with ID: ${id}`)
        }
    )
}

const deleteItem = (req, res) => {
   const id = req.params.id
    console.log("Last id " + id);
    
    pool.query(
        `DELETE FROM items WHERE item_id = ${id}`, (err, results) => {
            if (err) {
                throw err
              }
              res.status(200).send(`Item deleted`)
        }
    )
}







module.exports = {
    getItems,
    getItemById,
    getItemsByCategory,
    getCategories,
    createItem,
    updateItem,
    deleteItem
  }