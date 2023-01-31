import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IBooks } from "../../server/types";
import { GET } from "../services/api-service";
import { SwalError } from "../services/swal-error-handler";

import numeral from "numeral";

const OneBook = () => {
  const bookPrice = numeral().format("($0.00 a)");
  let { id } = useParams();
  const [oneBook, setOneBook] = useState<IBooks>();

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
            <h2>Price: ${numeral(oneBook?.price).format("($0.00 a)")}</h2>

            <div className="d-flex justify-content-end">
              <Link to={`/books/${id}/update`} className="my-3 btn btn-primary rounded ">
                Edit Book
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneBook;
