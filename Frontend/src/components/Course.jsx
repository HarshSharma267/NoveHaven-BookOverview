import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import axios from "axios";

function Course() {
  const [entertainmentBooks, setEntertainmentBooks] = useState([]);
  const [thrillerBooks, setThrillerBooks] = useState([]);
  const [comedyBooks, setComedyBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        console.log(res.data);

        // Filter books based on categories
        setEntertainmentBooks(
          res.data.filter(
            (book) => book.category.toLowerCase() === "entertainment"
          )
        );
        setThrillerBooks(
          res.data.filter((book) => book.category.toLowerCase() === "thriller")
        );
        setComedyBooks(
          res.data.filter((book) => book.category.toLowerCase() === "comedy")
        );
      } catch (error) {
        console.log("Error", error);
      }
    };
    getBooks();
  }, []);

  const renderBooksSection = (title, books) => (
    <div className="mt-12">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-6">
        {title} <span className="text-pink-500">Books</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((item) => <Cards key={item.id} item={item} />)
        ) : (
          <p className="text-center text-gray-500">
            No {title.toLowerCase()} books available at the moment.
          </p>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        {/* Welcome Section */}
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            Welcome to <span className="text-pink-500">Novel Haven</span>!
          </h1>
          <p className="mt-12" style={{ fontSize: "20px" }}>
            Welcome to [NovelHaven] – A Haven for Book Lovers! 📚✨
            <br />
            Step into a world where stories come to life and imagination knows
            no bounds. Our online bookstore is more than just a place to buy
            books; it’s a community for readers who share a passion for
            storytelling and discovering new adventures. Whether you're a
            lifelong bibliophile or a casual reader, we offer an extensive
            collection of novels across every genre to suit your taste.
          </p>

          <Link to="/">
            <button className="mt-5 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        {/* Books Sections */}
        {renderBooksSection("Fiction", entertainmentBooks)}
        {renderBooksSection("Thriller", thrillerBooks)}
        {renderBooksSection("Fantasy", comedyBooks)}
      </div>
    </>
  );
}

export default Course;
