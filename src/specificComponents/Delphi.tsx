import React, { useState } from 'react'
import { Typography, Container } from '@mui/material';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import settings from './properties'
import facade from './facade'
// https://mui.com/components/
import ClassChoice from './ClassChoice';
import EvalStatementForm from './EvalStatementForm';
import CommentFormList from './CommentFormList';
import AnswerList from './AnswerList';
import ResultTable from './ResultTable';

export default () => {
    const [className, setClassName] = useState("");
    const [error, setError] = useState("")
    const [approved, setApproved] = useState(false); // approved is when form is filled out.
    const [done, setDone] = useState(false);         // done is when ratings are given.
    const [isEval, setIsEval] = useState(false);     // when teacher wants to comment
    const [commentDone, setCommentDone] = useState(false); // When teacher wants to see finished evaluation

    const enterClassName = (input: string) => {
        const entered = input.split(' ');
        if (entered.length === 2 && entered[1] === 'comment') {
            setIsEval(true);
            input = entered[0]
        }
        else if (entered.length === 2 && entered[1] === 'rate') {
            setApproved(true);
            input = entered[0]
        }
        else if (entered.length === 2 && entered[1] === 'show') {
            setApproved(true);
            setCommentDone(true);
            input = entered[0]
        }
        else if (entered.length === 2 ) {
            alert("Den kommando findes ikke i systemet")
        }
    
        facade.fetchAny('classname/' + input, (res) => {
            if (res === true) {
                setClassName(input);
            } else {
                alert('You entered a non existing class name')
                setClassName("");
            }
        }, () => { })
    }
    return (
        <Container maxWidth="lg">
            <Typography variant="h2">Delphi Evaluering</Typography>
            {className.length === 0 ? <ClassChoice className={className} enterClassName={enterClassName} /> : <Typography variant="h4">Klasse: {className}</Typography>}
            {isEval && className.length !== 0 && <CommentFormList className={className} commentDone={commentDone} setCommentDone={setCommentDone} />}
            {commentDone && <ResultTable className={className} />}
            {!isEval && <>
                {!done && <>
                    {className.length > 0 && !approved && <>
                        <Typography variant="h5" paragraph>Skriv din kritik her: 3 positive udsagn og 3 forbedringsforslag</Typography>
                        <EvalStatementForm setError={setError} setApproved={setApproved} className={className} />
                    </>
                    }
                </>}
                {approved && !done && <AnswerList className={className} done={done} setDone={setDone} />}
                {done && <Typography variant="h2">Tak for dit input <EmojiEmotionsIcon fontSize="large" color="primary" /></Typography>}</>
            }
        </Container>
    );
}
