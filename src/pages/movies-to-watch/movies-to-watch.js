import React from "react";
import "./movies-to-watch.scss";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

class MoviesToWatchPage extends React.Component {
  render() {
    return (
      <div id="movies-to-watch-page">
        <Header />
        <div className="movies-to-watch"> Movie to watch</div>
        <Footer />
      </div>
    );
  }
}

export default MoviesToWatchPage;
