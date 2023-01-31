import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IBooks } from "../../server/types";
import { GET, TOKEN_KEY } from "../services/api-service";
import { SwalError } from "../services/swal-error-handler";

import numeral from "numeral";

const OneBook = () => {
  let { id } = useParams();
  const [oneBook, setOneBook] = useState<IBooks>();

  // const token = localStorage.getItem(TOKEN_KEY);
  // let userID = null;

  // if (token) {
  //   const [header, payload, signature] = token.split(".");
  //   const decoded = atob(payload);
  //   const userid = JSON.parse(decoded);

  //   userID = userid;
  // }

  useEffect(() => {
    GET(`/api/books/${id}`)
      .then((data) => setOneBook(data as IBooks))
      .catch(SwalError);
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="p-2 card bg-primary d-flex col-lg-4 col-md-6 col-sm-12">
          <div className="card-body shadow-lg">
            <h2>Title: {oneBook?.title}</h2>
            <h4>Author: {oneBook?.author}</h4>
            <h2>Genre: {oneBook?.category}</h2>
            <h2>Price: {numeral(oneBook?.price).format("($0.00 a)")}</h2>

            <div className="d-flex justify-content-end">
              <Link to="/books" className=" m-3 shadow-lg border-radius btn btn-sm btn-dark btn-outline-primary">
                Go Back
              </Link>
              {/* {oneBook?.author === userID && ( */}
              <Link to={`/books/${id}/update`} className="my-3 btn btn-primary rounded ">
                Edit Book
              </Link>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneBook;
