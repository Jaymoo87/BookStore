import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IBooks } from "../../server/types";
import { GET } from "../services/api-service";
import { SwalError } from "../services/swal-error-handler";

const BookLibrary = () => {
  const [books, setBooks] = useState<IBooks[]>([]);

  useEffect(() => {
    GET("/api/books")
      .then((data) => setBooks(data as IBooks[]))
      .catch(SwalError);
  }, []);

  return (
    <div className="container">
      <div className="row">
        {books.map((book) => (
          <div className="p-2 card bg-primary d-flex col-lg-4 col-md-6 col-sm-12">
            <div className="card-body shadow-lg">
              <h2>Title: {book.title}</h2>
              <h4>Author: {book.author}</h4>
              <h2>Genre: {book.category}</h2>
              <h2>Price: {book.price}</h2>
              <Link to={`/books/${book.id}`}></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookLibrary;