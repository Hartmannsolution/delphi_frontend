import React, { useState, useEffect } from 'react'
import { TextField, Typography, Button, Box, TableContainer, TableRow, TableHead, Table, TableCell, TableBody, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import facade from './facade';
import { AnswerType, isAnswerArrayType } from './types';
import SendIcon from '@mui/icons-material/Send';
type Props = { className: string, }
const CommentFormList = (props: Props) => {
    const [answers, setAnswers] = useState<AnswerType[]>([])
    const [error, setError] = useState("")
    const [commentDone, setCommentDone] = useState(false);

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
                setCommentDone(true);
            }
        },(error)=>{setError}, 'POST',false,commented);
    }
    return (
        <>
        {commentDone && <ResultTable answers={answers}/>}
        {!commentDone && <> 
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

const ResultTable = (props: {answers: AnswerType[]}) => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (
        <>
        <TableContainer component={Paper}>
                <Table sx={{ Width: 1200 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">ID</StyledTableCell>
                            <StyledTableCell align="right">Point</StyledTableCell>
                            <StyledTableCell align="center">Synspunkt</StyledTableCell>
                            <StyledTableCell align="right">Comment</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>{/* This is a table divider, to part positive from negative */}<TableCell sx={{ bgcolor: '#F8F8FF' }}>Positive</TableCell><TableCell sx={{ bgcolor: '#F8F8FF' }}></TableCell><TableCell sx={{ bgcolor: '#F8F8FF' }}></TableCell><TableCell sx={{ bgcolor: '#F8F8FF' }}></TableCell></TableRow>
                        {props.answers.filter((answer) => answer.is_positive).sort((a, b) => b.count - a.count).map((answer: AnswerType) => (
                            <StyledTableRow key={answer.id}>
                                <StyledTableCell component="th" scope="answer"> {answer.id} </StyledTableCell>
                                <StyledTableCell align="left">{answer.count}</StyledTableCell>
                                <StyledTableCell align="left">{answer.text}</StyledTableCell>
                                <StyledTableCell align="left">{answer.comment}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        <TableRow>{/* This is a table divider, to part positive from negative */}<TableCell sx={{ bgcolor: '#F8F8FF' }}>Negative</TableCell><TableCell sx={{ bgcolor: '#F8F8FF' }}></TableCell><TableCell sx={{ bgcolor: '#F8F8FF' }}></TableCell><TableCell sx={{ bgcolor: '#F8F8FF' }}></TableCell></TableRow>
                        {props.answers.filter((answer) => !answer.is_positive).sort((a, b) => b.count - a.count).map((answer: AnswerType) => (
                            <StyledTableRow key={answer.id}>
                                <StyledTableCell component="th" scope="answer"> {answer.id} </StyledTableCell>
                                <StyledTableCell align="left">{answer.count}</StyledTableCell>
                                <StyledTableCell align="left">{answer.text}</StyledTableCell>
                                <StyledTableCell align="left">{answer.comment}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
                {/* <Box m={1} //margin
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                //   sx={boxDefault}
                > <Button variant="outlined" endIcon={<SendIcon />} sx={{ marginTop: 2, textAlign: 'left' }} onClick={sendRatings}>Upload ratings</Button>
                </Box> */}
        </>
    );
}
export default CommentFormList