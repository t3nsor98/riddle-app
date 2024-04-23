import { useState } from "react";
import { useEffect } from "react";

function App() {
  const API_KEY = "h/Ig48/zxpf083tO4DZgyg==eKkv49i06zx2Qm1f";
  const API_URL = process.env.API_KEY;


  const [riddleData, setRiddleData] = useState({
    title: "The Title",
    question: "The Question",
    answer: "The Answer",
  });
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log("Fetching data.....");
    fetch(API_URL, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok!!");
        }

        return response.json();
      })
      .then((data) => {
        setRiddleData({
          title: data[0].title,
          question: data[0].question,
          answer: data[0].answer,
        });
      })
      .catch((error) => {
        console.error(
          "There was a problem with your fetch operation!!",
          error.message
        );
      });
  }, [refresh]);

  function handleRefresh() {
    setRefresh(!refresh);
    setShow(false);
  }
  function handleShow() {
    setShow(!show);
  }

  return (
    <>
      <div className="container">
        <h1>Title - {riddleData.title}</h1>
        <h2>Question - {riddleData.question}</h2>
        {!show && (
          <p onClick={handleShow} className="show-btn">
            Click to show the answer.
          </p>
        )}
        {show && (
          <p onClick={handleShow} className="answer">
            Answer - {riddleData.answer}
          </p>
        )}
        <button onClick={handleRefresh} className="get-btn">Get a New Riddle</button>
      </div>
    </>
  );
}

export default App;
