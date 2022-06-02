import React, { useState, ReactElement } from 'react';
import AnswerInput from './AnswerInput';
import facade from './facade'
import {
  Button, Box
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuidv4 } from 'uuid';
type PropsType = {
  setApproved: (a: boolean) => void,
  setError: (e: string) => void,
  className: string,
}

const EvalStatementForm = (props: PropsType) => {
  const POSITIVE_NUMBER = 3;
  const [answers, setAnswers] = useState([{ text: '', class_name: '', is_positive: false }]);

  const updateAnswers = (answer: string, idx: number, is_positive: boolean) => {
    // answers.splice(idx,0,answer);
    const answerObj = { text: answer, class_name: props.className, is_positive: is_positive, uuid: uuidv4() }
    answers[idx] = answerObj;
    setAnswers([...answers]);
  }
  const handleClick = (evt: React.FormEvent): void => {
    evt.preventDefault();
    facade.fetchAny('answers', (data) => {
      if (data === 'APPROVED')
        props.setApproved(true);
    }, (data: string) => {
      props.setError(data)
    }, "POST", false, answers)
  }

  return (
    <div>
      {[...Array(3)].map((el, idx) => {
        return (
          <AnswerInput key={idx} positive={true} idx={idx} answer={answers[idx]} updateAnswers={updateAnswers} />
        );
      })}
      {[...Array(3)].map((el, idx) => {
        return (
          <AnswerInput key={idx + POSITIVE_NUMBER} positive={false} idx={idx + POSITIVE_NUMBER} answer={answers[idx + POSITIVE_NUMBER]} updateAnswers={updateAnswers} />
        );
      })}
      <br />
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end" >
        <Button variant="outlined" endIcon={<SendIcon />} sx={{ marginTop: 2, textAlign: 'left' }} onClick={handleClick}>Upload evaluation</Button>
      </Box>
    </div>
  )
}

export default EvalStatementForm;