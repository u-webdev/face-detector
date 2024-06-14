import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import ParticlesBg from "particles-bg";
import { Component } from "react";

const createClarifaiRequestOptions = (imageURL) => {
  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = "3e090a0e877a4dd8a923116bd8364e26";
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "p89aqyqvyfch";
  const APP_ID = "face-detection";
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = "face-detection";
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
            // "base64": IMAGE_BYTES_STRING
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

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

fetch(
  "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
  createClarifaiRequestOptions(this.state.input)
)
  .then((response) => response.json())
  .then((result) => {
    const regions = result.outputs[0].data.regions;

    regions.forEach((region) => {
      // Accessing and rounding the bounding box values
      const boundingBox = region.region_info.bounding_box;
      const topRow = boundingBox.top_row.toFixed(3);
      const leftCol = boundingBox.left_col.toFixed(3);
      const bottomRow = boundingBox.bottom_row.toFixed(3);
      const rightCol = boundingBox.right_col.toFixed(3);

      region.data.concepts.forEach((concept) => {
        // Accessing and rounding the concept value
        const name = concept.name;
        const value = concept.value.toFixed(4);

        console.log(
          `${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`
        );
      });
    });
  });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }
  onInputChange = (event) => {
    console.log(event.target.value);
  };

  onButtonSubmit = () => {
    console.log("click");
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
