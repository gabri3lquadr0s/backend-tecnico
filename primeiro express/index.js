const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
app.use(bodyParser.json());


var data = [{"isbn": "123456789", "title": "o caminho", "author": "joão da silva", "year": "2000"},
            {"isbn": "123546789", "title": "codigo main", "author": "arthur cucker", "year": "1969"}]


/*  ====GET====  */
app.get('/getBooks', (req, res) => {
    res.json(data);
})

app.get('/getBookByIsbn/:isbn', (req, res) => {
    const { isbn } = req.params;
    const book = data.find(b => b.isbn === isbn);
    if(book) {
        return res.json(book);
    } else {
        return res.status(404).json({"message": "Book not found, please check the ISBN"});
    }
})

app.get('/getBookByTitle/:title', (req, res) => {
    const { title } = req.params;
    const book = data.find(b => b.title === title);
    if(book) {
        return res.json(book);
    } else {
        return res.status(404).json({"message": "Book not found, please check if the title is correct"});
    }
})

app.get('/getBooksByYear/:year', (req, res) => {
    const { year } = req.params;
    let books = []; 
    for(let i = 0; i < data.length; i++) {
        if(data[i].year == year) books.push(data[i]);
    }
    if(books != []) {
        return res.json(books);
    } else {
        return res.status(404).json({"message": "Not found any books from this year"});
    }
})

app.get('/getBooksByAuthor/:author', (req, res) => {
    const { author } = req.params;
    let books = []; 
    for(let i = 0; i < data.length; i++) {
        if(data[i].author == author) books.push(data[i]);
    }
    if(books != []) {
        return res.json(books);
    } else {
        return res.status(404).json({"message": "Book not found! Please check if the title is correct."});
    }
})
/*  ===========  */


/*  ====POST====  */
app.post('/registerBook', (req, res) => {
    const { isbn, title, author, year } = req.body;
    if (!isbn || !title || !author || !year) {
        return res.status(400).json({ message: 'Error! Missing parameter.' });    
    }
    for(let i = 0; i < data.length; i++) {
        if(data[i].isbn == isbn) {
            return res.status(400).json({ message: 'Error! Book already exists.' });
        }
    }
    const newBook = { isbn, title, author, year }; 
    data.push(newBook); 
    return res.status(201).json({ message: 'Book registered!' }); 
})
/*  ===========  */


/*  ====PUT====  */
app.put("/editBook/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { title, author, year } = req.body; 
    const choosenBook = data.find(b => b.isbn === isbn); 
    if (choosenBook) { 
        choosenBook.title = title || choosenBook.title; 
        choosenBook.author = author || choosenBook.author; 
        choosenBook.year = year || choosenBook.year; 
        return res.json({ message: `Book ${isbn} edited with success!` });
    } else {
        return res.status(404).json({ message: 'Book not found! Please check the ISBN.' }); 
    } 
})
/*  ===========  */


/*  ====DELETE====  */
app.delete('/deleteBook/:isbn', (req, res) => { 
    const { isbn } = req.params; 
    const bookIndex = data.findIndex(b => b.isbn === isbn); 
    if (bookIndex !== -1) { 
        data.splice(bookIndex, 1); 
        return res.json({ message: `Book ${isbn} deleted with success!` }); 
    } else { 
        return res.status(404).json({ message: 'Book not found! Please check the ISBN.' }); 
    } 
});
/*  ===========  */
    

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})