import React from 'react'
import { TextField, } from '@mui/material';
type Props = {
    answer: { text: string, class_name: string, is_positive: boolean },
    // setAnswer:React.ChangeEventHandler<HTMLInputElement>
    updateAnswers: (answer: string, idx: number, is_positive: boolean) => void,
    idx: number,
    positive: boolean,
}

const AnswerInput = (props: Props) => {
    return (
        <div>
            <TextField rows={2}
                label={props.positive? "Positivt udsagn" : "Kritisk udsagn"}
                multiline
                id={props.idx.toString()}
                value={props.answer ? props.answer.text : ''}
                placeholder={props.positive ? "Skriv hvad du synes har været godt ved kurset her" : "Skriv her hvad du synes kunne forbedres og hvordan"}
                size="medium"
                margin="dense"
                fullWidth
                onChange={(evt) => { props.updateAnswers(evt.target.value, Number(evt.target.id), props.positive); }
                } />
        </div>
    )
}

export default AnswerInput