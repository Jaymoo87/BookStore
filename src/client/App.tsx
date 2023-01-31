import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ResNavBar from "./components/ResNavBar";
import Home from "./pages/Home";
import BookLibrary from "./pages/BookLibrary";
import OneBook from "./pages/OneBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewBook from "./pages/NewBook";
import EditBook from "./pages/EditBook";
import PrivateRoute from "./components/PrivateRoute";

/* HOOK REACT EXAMPLE */
const App = () => {
  return (
    <BrowserRouter>
      <ResNavBar />
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/books" element={<BookLibrary />}></Route>
        <Route path="/books/:id" element={<OneBook />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/books/:id/update" element={<EditBook />}></Route>
          <Route path="/books/new" element={<NewBook />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
