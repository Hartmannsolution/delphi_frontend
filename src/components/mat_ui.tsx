import { Typography, Container } from '@mui/material';
import ButtonsDemo from './ButtonsDemo';
import RatingsDemo from './RatingsDemo';
import SelectDemo from './SelectDemo';
import SelectDemo2 from './SelectDemo2';
import SliderDemo from './SliderDemo';
import SwitchDemo from './SwitchDemo';
import TextDemo from './TextFieldDemo';
import ToggleButtonGroupDemo from './ToggleButtonGroupDemo';
import AvatarDemo from './AvatarDemo';
import DividerDemo from './DividerDemo';
import CustomTableDemo from './TableDemo';
import BasicTableDemo from './BasicTableDemo';
import SnackBar from './SnackBarAlertDemo';
import Card from './CardDemo';
import GridDemo from './GridDemo';
import StackDemo from './StackDemo';
import MasonryImageList from './ImageMasonryDemo';
import ModalDemo from './ModalDemo';
import DateTimePicker from './DateTimePickerDemo';

// https://mui.com/components/
export default function App() {
    
    return (
        <Container maxWidth="md">
            <Typography variant="h1">Welcome to this Material-UI Demo</Typography>
            <Typography variant="h5" paragraph>This Typography Component is a basic component to style various HTML elements. The use of the paragraph prop allows text to behave like a p tag. If I write more text here we can see how it wraps on to the next line</Typography>
            <CustomTableDemo />
            <BasicTableDemo />
            <ButtonsDemo/>
            <ModalDemo />
            <RatingsDemo />
            <SelectDemo />
            <SelectDemo2 />
            <SliderDemo />
            <SwitchDemo />
            <TextDemo />
            <ToggleButtonGroupDemo />
            <AvatarDemo />
            <DividerDemo />
            <SnackBar />
            <Card />
            <GridDemo />
            <StackDemo />
            <MasonryImageList />
            <DateTimePicker />
        </Container>
    );

}
