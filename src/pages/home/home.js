import React from "react";
import "./home.scss";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

class Home extends React.Component {
  render() {
    return (
      <div id="home-page">
        <Header />
        Home content
        <Footer />
      </div>
    );
  }
}

export default Home;
