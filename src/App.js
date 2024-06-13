import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import ParticlesBg from "particles-bg";

function App() {
  return (
    <>
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <FaceFinder /> */}
      </div>
      <ParticlesBg type="cobweb" bg={true} />
    </>
  );
}

export default App;
