const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    genre: [
      {
        type: String,
        enum: [
          "Fiction",
          "Non-fiction",
          "Business",
          "Biography",
          "Autobiography",
          "Romance",
          "Fantasy",
          "Self-Help",
          "Mystery",
          "Thriller",
          "Historical",
        ],
      },
    ],
    language: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", booksSchema);

module.exports = Book;
