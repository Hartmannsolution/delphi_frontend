import { TableContainer, TableRow, TableHead, Table, TableCell, TableBody, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useEffect, useState } from 'react';
import facade from './facade';
import { AnswerType, isAnswerArrayType } from './types';

type Props = { className: string}
const ResultTable = (props:Props) => {
    const [answers, setAnswers] = useState<AnswerType[]>([])
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
    useEffect(() => {
        facade.fetchAny(`answers/${props.className}`, (data) => {
            if (isAnswerArrayType(data)) {
                setAnswers(data);
            }
        }, (error) => { alert(error) })
    }, [props.className]);
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
                        {answers.filter((answer) => answer.is_positive).sort((a, b) => b.count - a.count).map((answer: AnswerType) => (
                            <StyledTableRow key={answer.id}>
                                <StyledTableCell component="th" scope="answer"> {answer.id} </StyledTableCell>
                                <StyledTableCell align="left">{answer.count}</StyledTableCell>
                                <StyledTableCell align="left">{answer.text}</StyledTableCell>
                                <StyledTableCell align="left">{answer.comment}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        <TableRow>{/* This is a table divider, to part positive from negative */}<TableCell sx={{ bgcolor: '#F8F8FF' }}>Negative</TableCell><TableCell sx={{ bgcolor: '#F8F8FF' }}></TableCell><TableCell sx={{ bgcolor: '#F8F8FF' }}></TableCell><TableCell sx={{ bgcolor: '#F8F8FF' }}></TableCell></TableRow>
                        {answers.filter((answer) => !answer.is_positive).sort((a, b) => b.count - a.count).map((answer: AnswerType) => (
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
export default ResultTable;