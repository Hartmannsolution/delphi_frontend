import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function ControlledSwitches() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
  <>
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    <Switch {...label} defaultChecked color="warning" />
  </> 
  );
}