import { useState, useEffect } from 'react'
import { TextField, Typography, Button, Box, TableContainer, TableRow, TableHead, Table, TableCell, TableBody, Paper } from '@mui/material';
import facade from './facade';
import { AnswerType, isAnswerArrayType } from './types';
import SendIcon from '@mui/icons-material/Send';

type Props = { className: string, commentDone:boolean,setCommentDone:(val:boolean)=>void}

const CommentFormList = (props: Props) => {
    const [answers, setAnswers] = useState<AnswerType[]>([])
    const [error, setError] = useState("")

    useEffect(() => {
        if (props.className.length !== 0) {
            facade.fetchAny(`answers/${props.className}`, (data) => {
                if (isAnswerArrayType(data)) {
                    setAnswers(data);
                }
            }, (error) => { alert(error) })
        }
    }, [props.className]);

    const updateComments = (id: number, comment:string) => {
        const chosenIdx = answers.findIndex(answer=>answer.id === id);
        answers[chosenIdx].comment = comment;
        console.log(answers[chosenIdx]);
    }

    const sendComments = () => {
        const commented = answers.map(answer=>{
            answer.inc_number = 0 //endpoint needs an inc_number to work.
            if (!answer.comment){
                answer.comment = "Not commented";
            }
            return answer;
        });
        facade.fetchAny('answers/comment',(data)=>{
            if(data==="COMMENTED"){
                props.setCommentDone(true);
            }
        },(error)=>{setError}, 'POST',false,commented);
    }
    return (
        <>
        {!props.commentDone && <> 
            {/* Sort the answers to get negative above  */}
            {[...answers].sort((a, b) => Number(a.is_positive) - Number(b.is_positive) || b.count - a.count).map((answer) => {
                return <>
                <Comment id={answer.id} text={answer.text} count={answer.count} comment={answer.comment} updateComments={updateComments} />
                </>
            })}
             <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end" > <Button variant="outlined" endIcon={<SendIcon/>} onClick={sendComments}>Send kommentarer</Button> </Box>
        </>}
        </>
    )
}
const Comment = (props:{id:number, text:string, count:number, comment:string | undefined, updateComments:(id:number, comment:string)=>void}) => {
    const [comment, setComment] = useState(props.comment || "")
    const update = (value:string) => {
        setComment(value);
        props.updateComments(props.id, value);
    }
    return <>
        <Typography align="left" variant="h6">Vægt: {props.count}</Typography><Typography align="left" variant="body2" color="text.secondary">{props.text}</Typography>
        <TextField rows={3}
            label={"Opsummering af klassediskussion"}
            multiline
            id={props.id.toString()}
            value={comment}
            placeholder={"Skriv konklusioner fra diskussion i klassen omkring dette evalueringpunkt. Husk at gøre det målbart og operationelt: Hvilke konkrete handlinger bør tages"}
            size="medium"
            margin="dense"
            fullWidth
            onChange={(evt) => update(evt.target.value)}
        />
    </>
}


export default CommentFormList