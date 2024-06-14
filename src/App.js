import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import ParticlesBg from "particles-bg";
import { Component } from "react";

const createClarifaiRequestOptions = (imageURL) => {
  const PAT = "3e090a0e877a4dd8a923116bd8364e26";
  const USER_ID = "p89aqyqvyfch";
  const APP_ID = "face-detection";
  const MODEL_ID = "face-detection";

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: imageURL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(
      "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
      createClarifaiRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((result) => {
        const regions = result.outputs[0].data.regions;
        regions.forEach((region) => {
          const boundingBox = region.region_info.bounding_box;
          const topRow = boundingBox.top_row.toFixed(3);
          const leftCol = boundingBox.left_col.toFixed(3);
          const bottomRow = boundingBox.bottom_row.toFixed(3);
          const rightCol = boundingBox.right_col.toFixed(3);

          region.data.concepts.forEach((concept) => {
            const name = concept.name;
            const value = concept.value.toFixed(4);
            console.log(
              `${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`
            );
          });
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceDetection />
        <ParticlesBg type="cobweb" color="#D3D3D3" bg={true} />
      </div>
    );
  }
}

export default App;
