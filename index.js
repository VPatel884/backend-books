const express = require("express");
require("dotenv").config();
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const { initializeDatabase } = require("./db/db.connect");
const Book = require("./model/book.model");
initializeDatabase();

app.use(express.json());
app.use(cors(corsOptions));

createBook = async (newBook) => {
  try {
    const newBookData = new Book(newBook);
    const saveBook = await newBookData.save();
    return saveBook;
  } catch (error) {
    throw error;
  }
};

app.post("/books", async (req, res) => {
  try {
    const savedBook = await createBook(req.body);
    res
      .status(201)
      .json({ message: "Book added successfully.", book: savedBook });
  } catch {
    res.status(500).json({ error: "Failed to add the book." });
  }
});

readAllBooks = async () => {
  try {
    const allBooks = await Book.find();
    return allBooks;
  } catch (error) {
    throw error;
  }
};

app.get("/books", async (req, res) => {
  try {
    const books = await readAllBooks(req.params.books);

    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching the books." });
  }
});

readBookByTitle = async (bookTitle) => {
  try {
    const BookByTitle = await Book.findOne({ title: bookTitle });
    return BookByTitle;
  } catch (error) {
    throw error;
  }
};

app.get("/books/:bookTitle", async (req, res) => {
  try {
    const book = await readBookByTitle(req.params.bookTitle);

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch {
    res.status(500).json({ error: "Error fetching the books." });
  }
});

readBooksByAuthor = async (authorName) => {
  try {
    const booksByAuthor = await Book.find({ author: authorName });
    return booksByAuthor;
  } catch (error) {
    throw error;
  }
};

app.get("/books/author/:authorName", async (req, res) => {
  try {
    const books = await readBooksByAuthor(req.params.authorName);

    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching the books." });
  }
});

readBooksWithBusinessGenre = async () => {
  try {
    const booksWithBusinessGenre = await Book.find({
      genre: "Business",
    });
    return booksWithBusinessGenre;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

app.get("/books/genre/business", async (req, res) => {
  try {
    const books = await readBooksWithBusinessGenre();

    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching the books." });
  }
});

readBooksByReleasedYear = async (releasedYear) => {
  try {
    const booksByReleasedYear = await Book.find({
      publishedYear: releasedYear,
    });
    return booksByReleasedYear;
  } catch (error) {
    throw error;
  }
};

app.get("/books/publishedYear/:releaseYear", async (req, res) => {
  try {
    const books = await readBooksByReleasedYear(req.params.releaseYear);

    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch {
    res.status(500).json({ error: "Error fetching the books." });
  }
});

updateBookDataWithId = async (bookId, dataToUpdate) => {
  try {
    const updateBookData = await Book.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return updateBookData;
  } catch (error) {
    throw error;
  }
};

app.post("/books/:bookId", async (req, res) => {
  try {
    const updatedBook = await updateBookDataWithId(req.params.bookId, req.body);
    if (updatedBook) {
      res.status(200).json({
        message: "Book data updated successfully.",
        book: updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book does not exist." });
    }
  } catch {
    res.status(500).json({ error: "Error updating the book data." });
  }
});

updateBookDataWithName = async (bookName, dataToUpdate) => {
  try {
    const updateBookData = await Book.findOneAndUpdate(
      { title: bookName },
      dataToUpdate,
      {
        new: true,
      }
    );
    return updateBookData;
  } catch (error) {
    throw error;
  }
};

app.post("/books/name/:bookName", async (req, res) => {
  try {
    const updatedBook = await updateBookDataWithName(
      req.params.bookName,
      req.body
    );
    if (updatedBook) {
      res.status(200).json({
        message: "Book data updated successfully.",
        book: updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating the book data." });
  }
});

deleteBook = async (bookId) => {
  try {
    const deleteBook = await Book.findByIdAndDelete(bookId);
    return deleteBook;
  } catch (error) {
    throw error;
  }
};

app.delete("/books/:bookId", async (req, res) => {
  try {
    const deletedBook = await deleteBook(req.params.bookId);

    if (deletedBook) {
      res.status(200).json({
        message: "Book deleted successfully.",
        book: deletedBook,
      });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete the book." });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on the port", PORT);
});
