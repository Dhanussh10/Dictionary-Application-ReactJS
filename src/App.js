import { React, useState } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";
 
function App() {
  // Setting up the initial states using react hook 'useState'
 
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");
 
  // Function to fetch information on button
  // click, and set the data accordingly
  function getMeaning() {
    Axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
    ).then((response) => {
      setData(response.data[0]);
    });
  }
 
  // Function to play and listen the
  // phonetics of the searched word
  function playAudio() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }
 
  return (
    <div className="App">
      <h1>Dictionary Application</h1>
      <p className="reho">Word of the day<br>
        </br>Hello: <p>used as a greeting or to begin with a phone conversation</p></p>
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search for a word"
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getMeaning();
          }}
        >
          <FaSearch size="20px" />
        </button>
      </div>
      {data && (
        <div className="showResults">
          <h2>
            {data.word}{" "}
            <button
              onClick={() => {
                playAudio();
              }}
            >
              <FcSpeaker size="26px" />
            </button>
          </h2>
          <h4>Parts of speech:</h4>
 
           
<p>{data.meanings[0].partOfSpeech}</p>
 
 
          <h4>Definition:</h4>
 
           
<p>{data.meanings[0].definitions[0].definition}</p>
 
 
          <h4>Example:</h4>
 
           
<p>{data.meanings[0].definitions[0].example}</p>
 
        </div>
      )}
    </div>
    
  );
}
 
export default App;