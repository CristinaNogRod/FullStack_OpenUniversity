import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import { Routes, Route, Link } from "react-router-dom";

const App = () => {
  const [error, setErrorMessage] = useState(null);

  const style = {
    padding: 5,
    border: "1px solid black",
    boxSizing: "border-box",
    textDecoration: "none",
    color: "black",
    margin: 2,
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <div>
        <Link style={style} to={"/"}>
          Authors
        </Link>
        <Link style={style} to={"/books"}>
          Books
        </Link>
        <Link style={style} to={"/newBook"}>
          Add Book
        </Link>
      </div>

      <Notify errorMessage={error} />

      <Routes>
        <Route path="/newBook" element={<NewBook setError={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/" element={<Authors setError={notify} />} />
      </Routes>
    </div>
  );
};

export default App;
