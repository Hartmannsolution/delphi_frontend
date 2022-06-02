import React, { useState, useEffect } from 'react';
import facade from './facade';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ToggleButton, ToggleButtonGroup, Button, Box } from '@mui/material';
import properties from './properties';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import SendIcon from '@mui/icons-material/Send';
import { AnswerType, isAnswerArrayType } from './types'


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
type Props = {
    className: string
    done: boolean
    setDone: (done: boolean) => void
}

// interface AnswerType {
//     text: string
//     class_name: string
//     is_positive: boolean
//     id: number
//     count: number
//     inc_number?: number
// }
// function isAnswerArrayType(answerlist: any): answerlist is AnswerType[] { // User-Defined Type Guard ensures that data returned from server has the right format. And allows us to use the data in our setState method. Type Guard is better than using 'as' to just force a value to be a specific type (since it might not be) and that would create "undetectable" bugs
//     return answerlist.length > 0 && answerlist[0].text !== undefined;
// }
const AnswerList = (props: Props) => {
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);


    const handleScore = (score: number, id: number) => {
        console.log('score: ', score, 'id: ', id);
        const matching = answers.filter((answer) => answer.id === id)[0];
        matching.inc_number = score
        console.log(answers)
    }
    const sendRatings = () => {
        if (!props.done)
            facade.fetchAny(`answers/rating`, (data) => { }, (error) => { }, 'POST', false, answers);
        props.setDone(true);
    }
    const loadAll = () => {
        setLoaded(true);
        facade.fetchAny(`answers/${props.className}`, (data) => {
            if (isAnswerArrayType(data)) {
                // const sorted_data = [...data].sort((a, b) => Number(a.is_positive) - Number(b.is_positive))
                data.forEach((data) => {
                    data.inc_number = 0
                })
                setAnswers(data);
            }

        }, (error) => { setError })
    }

    return (
        <>
            {error}
            <Button onClick={loadAll}>Load besvarelser, så du kan rate dem</Button>
            {loaded && <><TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">ID</StyledTableCell>
                            <StyledTableCell align="center">Synspunkt</StyledTableCell>
                            {/* <StyledTableCell align="right">Count</StyledTableCell> */}
                            <StyledTableCell align="right">Point</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow><TableCell sx={{ bgcolor: '#F8F8FF' }}>Positive</TableCell><TableCell sx={{ bgcolor: '#F8F8FF' }}></TableCell><TableCell sx={{ bgcolor: '#F8F8FF' }}></TableCell></TableRow>
                        {answers.filter((answer) => answer.is_positive).sort((a, b) => b.count - a.count).map((answer: AnswerType) => (
                            <StyledTableRow key={answer.id}>
                                <StyledTableCell component="th" scope="answer"> {answer.id} </StyledTableCell>
                                <StyledTableCell align="left">{answer.text}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <ScoreBox id={answer.id} handleScore={handleScore} />
                                </StyledTableCell>
                                {/* <StyledTableCell align="right">{answer.is_positive}</StyledTableCell> */}
                            </StyledTableRow>
                        ))}
                        <TableRow><TableCell sx={{ bgcolor: '#F8F8FF' }}>Negative</TableCell><TableCell sx={{ bgcolor: '#F8F8FF' }}></TableCell><TableCell sx={{ bgcolor: '#F8F8FF' }}></TableCell></TableRow>
                        {answers.filter((answer) => !answer.is_positive).sort((a, b) => b.count - a.count).map((answer: AnswerType) => (
                            <StyledTableRow key={answer.id}>
                                <StyledTableCell component="th" scope="answer"> {answer.id} </StyledTableCell>
                                <StyledTableCell align="left">{answer.text}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <ScoreBox id={answer.id} handleScore={handleScore} />
                                </StyledTableCell>
                                {/* <StyledTableCell align="right">{answer.is_positive}</StyledTableCell> */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
                <Box m={1} //margin
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                //   sx={boxDefault}
                > <Button variant="outlined" endIcon={<SendIcon />} sx={{ marginTop: 2, textAlign: 'left' }} onClick={sendRatings}>Upload ratings</Button>
                </Box>
            </>

            }
        </>
    )
}
const ScoreBox = (props: { id: number, handleScore: (score: number, id: number) => void }) => {
    const [score, setScore] = useState("0");

    const handleScore = (evt: React.MouseEvent<HTMLElement>, score: string) => {
        setScore(score);
        props.handleScore(Number(score), props.id)
    };
    return (
        <ToggleButtonGroup
            value={score}
            exclusive
            onChange={handleScore}
            aria-label="text alignment"
        >
            <ToggleButton value="0" aria-label="left aligned">0</ToggleButton>
            <ToggleButton value="1" aria-label="left aligned">1</ToggleButton>
            <ToggleButton value="2" aria-label="left aligned">2</ToggleButton>
        </ToggleButtonGroup>
    )
}
export default AnswerList;
export type { AnswerType }