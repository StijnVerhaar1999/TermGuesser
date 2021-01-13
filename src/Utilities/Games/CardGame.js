import { Button, Card, CardContent } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import * as list from "../../Lists/ohrList";

const GuessGame = (props) => {
  const [step, setStep] = useState(0);
  const [allQuestions, setAllQuestions] = useState();
  const [showAnswer, toggleAnswer] = useState(false);
  const [showEndScreen, setEndScreen] = useState(false);
  const [correctAnswer, incrementCorrectAnswer] = useState(0);
  const [inGame, setInGame] = useState(true);

  let history = useHistory();

  useEffect(() => {
    getAllData();
  }, []);

  const nextQuestion = () => {
    toggleAnswer(false);
    setStep(step + 1);
  };

  const correctQuestion = () => {
    incrementCorrectAnswer(correctAnswer + 1);
    nextQuestion();
    return;
  };

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const getAllData = () => {
    let x;
    const chapterList = list.ohrList;
    let data = [];

    props.questionSettings[0].chapters.forEach((element) => {
      chapterList.forEach((value) => {
        if (value.value === element) {
          for (x = 0; x < value.data.length; x++) {
            data.push(value.data[x]);
            data = shuffle(data);
          }
        }
      });
    });
    setAllQuestions(data);
  };

  const enableEndScreen = () => {
    setEndScreen(true);
    setInGame(false);
    return;
  };

  const renderParagraphQuestion = () => {
    if (props.questionSettings[0].mode === "terms") {
      return <p className={"bold center"}>Guess the term</p>;
    } else {
      return <p className={"bold center"}>Guess the description</p>;
    }
  };

  const renderQuestionAmount = () => {
    return (
      <p className={"center"}>
        {step}/{props.questionSettings[0].amount} Questions answered
      </p>
    );
  };

  const renderQuestion = () => {
    let amount = parseInt(props.questionSettings[0].amount) - 1;
    if (allQuestions === undefined) return;
    if (step <= amount) {
      if (step <= allQuestions.length) {
        return (
          <div className={"center m-top-50"}>
            {props.questionSettings[0].mode === "terms" ? (
              <div>
                {renderParagraphQuestion()}
                {renderQuestionAmount()}
                <p className={"bold"}>Term:</p>
                <Card className={"card-game"}>
                  <CardContent>
                    <p>{allQuestions[step].term}</p>
                  </CardContent>
                </Card>
                <p className={"bold"}>Definition:</p>
                <Card
                  className={"card-game"}
                  onClick={() => toggleAnswer(!showAnswer)}
                >
                  <CardContent>
                    <div>
                      {showAnswer ? (
                        <p>{allQuestions[step].definition}</p>
                      ) : (
                        <p>Click me to show the answer</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div>
                <p className={"bold"}>Definition:</p>
                <Card className={"card-game"}>
                  <CardContent>
                    <p>{allQuestions[step].definition}</p>
                  </CardContent>
                </Card>
                <p className={"bold"}>Term:</p>
                <Card
                  className={"card-game"}
                  onClick={() => toggleAnswer(!showAnswer)}
                >
                  <CardContent>
                    <div>
                      {showAnswer ? (
                        <p>{allQuestions[step].term}</p>
                      ) : (
                        <p>Click me to show the answer</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {showAnswer ? (
              <div>
                <p className={"bold"}>Did you get the answer correct?</p>
                <p>(Clicking on a button will go to the next question)</p>
                <div className={"card-game-button-group"}>
                  <div className={"correct"}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => correctQuestion()}
                    >
                      Yes
                    </Button>
                  </div>
                  <div className={"false"}>
                    <Button
                      className={"false"}
                      variant="contained"
                      color="primary"
                      onClick={() => nextQuestion()}
                    >
                      No
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
      } else {
        enableEndScreen();
      }
    } else {
      enableEndScreen();
    }
  };

  const renderEndScreen = () => {
    return (
      <div className={"center m-top-50"}>
        <p className={"bold"}>Congratulations</p>
        <p>
          You answered {correctAnswer}/{props.questionSettings[0].amount}{" "}
          correct
        </p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/")}
        >
          Go back to the home screen
        </Button>
      </div>
    );
  };

  return (
    <div>
      {inGame ? renderQuestion() : null}
      {showEndScreen ? renderEndScreen() : null}
    </div>
  );
};

export default GuessGame;
