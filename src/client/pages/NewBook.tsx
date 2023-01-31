import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ICategory } from "../../server/types";
import { POST } from "../services/api-service";
import { SwalError, SwalSuccess } from "../services/swal-error-handler";

const NewBook = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [categoryid, setCategoryid] = useState<number>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [price, setPrice] = useState<number>();
  const [options, setOptions] = useState<{ value: number; label: string }>();

  const nav = useNavigate();
  //api service freaked out on this request .?!?. regular fetch worked fine

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setOptions(data.map((c: ICategory) => ({ value: c.id!, lavle: c.name! })));
      });
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addNewBook();
  };

  const addNewBook = async () => {
    const thisNewBook = {
      title,
      author,
      categoryid,
      price,
    };
    try {
      POST("/api/books", thisNewBook);
      SwalSuccess("New Book! get tuh readin"!);
      nav("/books");
    } catch (error) {
      SwalError(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="form-group p-2 car bg-primary d-flex col-lf-4 col-md-6 col-sm-12">
        <h3 className="card-title text-light d-flex justify-content-center">New Book</h3>
        <label className="text-light">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="text-light">Author</label>
        <input
          type="text"
          className="form-control"
          placeholder="Book Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label className="text-light">Genre</label>
      </div>
    </div>
  );
};

export default NewBook;
