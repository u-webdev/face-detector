import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import ParticlesBg from "particles-bg";
import { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <FaceFinder /> */}
        <ParticlesBg type="cobweb" color="#D3D3D3" bg={true} />
      </div>
    );
  }
}

export default App;
