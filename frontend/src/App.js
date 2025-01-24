import { useState } from "react";
import "./App.css";
import EmojiComposer from "./components/EmojiComposer";
import axios from "axios";

function App() {
  const [stories, setStories] = useState([]);
  const addStory = async (story) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/stories/create-story",
        story
      );
      setStories([response.data, ...stories]);
    } catch (error) {
      console.error("Error adding story", error);
    }
  };
  return (
    <div className="App">
      <EmojiComposer onStorySubmit={addStory} />
    </div>
  );
}

export default App;
