import React, { useState } from "react";

import HomeButton from "../../Utilities/HomeButton";
import QuestionSettings from "../../Utilities/QuestionSettings";
import CardGame from "../../Utilities/Games/CardGame";

const Guess = () => {
  const [questionSettings, setQuestionSettings] = useState();

  return (
    <div>
      <HomeButton />
      {!questionSettings ? (
        <QuestionSettings setQuestionSettings={setQuestionSettings} />
      ) : (
        <CardGame questionSettings={questionSettings} />
      )}
    </div>
  );
};

export default Guess;
