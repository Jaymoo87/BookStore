import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ResNavBar from "./components/ResNavBar";
import BookLibrary from "./pages/BookLibrary";
import Home from "./pages/Home";

/* HOOK REACT EXAMPLE */
const App = () => {
  return (
    <BrowserRouter>
      <ResNavBar />
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="/register" element={<>Register</>}></Route>
        <Route path="/login" element={<>Login</>}></Route>
        <Route path="/books" element={<BookLibrary />}></Route>
        <Route path="/books/:id" element={<>Single Book</>}></Route>
        <Route path="/books/:id/update" element={<>Edit Book</>}></Route>
        <Route path="/books/new" element={<>New Book</>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
