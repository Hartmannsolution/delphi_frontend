import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasicStack() {
    return (
        <Box sx={{ width: '20%' }}>
            <br />
            <h2> This is a vertical stack.</h2>
<p> A stack is a 1 dimensional grid (which is 2 dimensional ofcause </p>
            <Stack spacing={2}>
                <Item>Item 1</Item>
                <Item>Item 2</Item>
                <Item>Item 3</Item>
            </Stack>
            <h2> This is a horisontal stack </h2>
            <Stack direction="row" spacing={2}>
                <Item>Item 1</Item>
                <Item>Item 2</Item>
                <Item>Item 3</Item>
            </Stack>
        </Box>
    );
}