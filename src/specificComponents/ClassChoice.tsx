import * as React from 'react';
import {Button, Input } from '@mui/material';
type Lifting = {
    className: string,
    enterClassName: (className: string) =>void
}
export default (props:Lifting) => {
    const [answer, setAnswer] = React.useState("")
    return (<>
    <br />
    <Input size="small" type="text" value={answer} placeholder="Skriv klassenavn her" onChange={(evt)=>setAnswer(evt.target.value)}/>
    {" "}<Button 
    // variant="outlined" 
    onClick={()=>props.enterClassName(answer)} 
    size="small">
        Send
    </Button>
    <br/><br />
    </>);
}