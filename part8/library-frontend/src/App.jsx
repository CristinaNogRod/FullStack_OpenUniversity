import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Recommendation from "./components/Recommendation";

import { ALL_BOOKS, BOOK_ADDED } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqByID = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.id;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, (data) => {
    if (!data) {
      return { allBooks: [addedBook] };
    }

    const { allBooks } = data;

    return {
      allBooks: uniqByID(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const client = useApolloClient();

  const [error, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);

  const style = {
    padding: 5,
    border: "1px solid black",
    boxSizing: "border-box",
    textDecoration: "none",
    color: "black",
    margin: 2,
  };

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem("library-user-token");
    if (loggedUserToken) {
      setToken(loggedUserToken);
    }
  }, []);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      notify(`${addedBook.title} added`);

      // client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
      //   return {
      //     allBooks: allBooks.concat(addedBook),
      //   };
      // });
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <Link style={style} to={"/"}>
          Authors
        </Link>
        <Link style={style} to={"/books"}>
          Books
        </Link>
        {!token ? (
          <Link style={style} to={"/login"}>
            Login
          </Link>
        ) : (
          <>
            <Link style={style} to={"/newBook"}>
              Add Book
            </Link>
            <Link style={style} to={"/recommend"}>
              Recommend
            </Link>
            <button style={style} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

      <Notify errorMessage={error} />

      <Routes>
        <Route path="/newBook" element={<NewBook setError={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/" element={<Authors setError={notify} token={token} />} />
        <Route
          path="/login"
          element={<LoginForm setToken={setToken} setError={notify} />}
        />
        <Route path="/recommend" element={<Recommendation />} />
      </Routes>
    </div>
  );
};

export default App;
