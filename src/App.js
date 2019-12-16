import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import MoviesSearch from "./movies-search/movies-search";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MoviesSearch />
      </header>
    </div>
  );
}

export default App;
