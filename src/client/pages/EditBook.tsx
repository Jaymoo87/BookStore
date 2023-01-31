import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IBooks, ICategory } from "../../server/types";
import { DELETE, GET, PUT } from "../services/api-service";
import { SwalError, SwalSuccess } from "../services/swal-error-handler";

const EditBook = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [categoryid, setCategoryId] = useState<number>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [options, setOptions] = useState<{ value: number; label: string }>();

  const { id } = useParams();
  const nav = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    bookToEdit();
  };

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setCategory(data);
        setOptions(data.map((c: ICategory) => ({ value: c.id!, label: c.name! })));
      });

    fetch(`/api/books/${id}`)
      .then((res) => res.json())
      .then((data: IBooks) => {
        setTitle(data.title);
        setAuthor(data.author);
        setCategory(data.category);
        setPrice(data.price);
      });
  }, []);

  //   GET(`/api/book/${id}`)
  //   .then(data as IBooks => {
  //     setTitle(data.title)
  //     setAuthor(data.author)
  //     setCategories(data.category)
  //     setPrice(data.price)

  //   })

  const bookToEdit = async () => {
    const thisBook = {
      title,
      author,
      categoryid,
      price,
    };
    try {
      await PUT(`/api/books/${id}`, thisBook);
      SwalSuccess(`${thisBook.title} has been updated, get tug readin'!`);
      nav("/books");
    } catch (error) {
      SwalError(error);
    }
  };

  const handleDeleteBook = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const book = {
      title,
      author,
      categoryid,
      price,
    };
    try {
      DELETE(`/api/books/${id}`, book);
      SwalSuccess("Deleted");
      nav("/books");
    } catch (error) {
      SwalError(error);
    }
  };
  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="form-group p-2 card bg-primary d-flex col-lg-4 col-md-6 col-sm-12">
        <h3 className="card-title text-light d-flex justify-content-center">Edit Book</h3>
        <label className="text-light">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder={title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label className="text-light">Author</label>
        <input
          type="text"
          className="form-control"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
        <label className="text-light">Category</label>
        <select className="form-control" value={categoryid} onChange={(e) => setCategoryId(Number(e.target.value))}>
          <option value={0}>Select A Genre</option>
          {categories.map((cat: ICategory) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <label className="text-light">Price</label>
        <input
          type="text"
          className="form-control"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        ></input>
        <div className="d-flex justify-content-end">
          <button value="Submit New Book" className="my-3 btn btn-primary rounded " onClick={handleClick}>
            Submit Edit
          </button>
          <div className="d-flex justify-content-end">
            <button value="Submit New Book" className="my-3 btn btn-primary rounded " onClick={handleDeleteBook}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
