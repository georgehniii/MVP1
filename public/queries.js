//connecting to the database........
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'puser',
  host: 'localhost',
  database: 'mvp',
  password: 'asd123',
  port: 5432,
})


const getItems = async (req, res) => {
    try{
    await pool.query('SELECT * FROM items', (err, results) => {
      res.status(200).json(results.rows)
    })
     } catch (error){
          console.err(err.message)
      }
   
  }

const getItemById = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM items WHERE item_id = $1', [id], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
}

const getCategories = async (req, res) => {
    try{
    await pool.query('SELECT * FROM categories', (err, results) => {
      res.status(200).json(results.rows)
    })
     } catch (error){
          console.err(err.message)
      }
   
  }

const getItemsByCategory = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM items WHERE category_id = $1', [id], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
}
/*
const createItem = (req, res) => {
    const {category_id,item_name,price} = req.body

    pool.query('INSERT INTO items (category_id,item_name,price) VALUES ($1, $2, $3)', [category_id,item_name,price], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).send('Item added')

    })
}

const updateItem = (req, res) => {
    const id = req.params.id;
    const {category_id,item_name,price} = req.body
    
    pool.query(
        'UPDATE items SET category_id = $1, item_name = $2, price = $3 WHERE item_id = $4',
        [category_id,item_name,price], (err, results) => {
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
    
    
    pool.query(
        `DELETE FROM items WHERE item_id = ${id}`, (err, results) => {
            if (err) {
                throw err
              }
              res.status(200).send(`Item deleted`)
        }
    )
}


*/





module.exports = {
    getItems,
    getItemById,
    getItemsByCategory,
    getCategories
    /*
    createItem,
    updateItem,
    deleteItem
    */
  }