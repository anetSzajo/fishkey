import React from "react";
import {useFirestore, useFirestoreCollectionData, useUser} from "reactfire";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import Flashcard from "../Flashcard/Flashcard";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
});

export default function FlashcardsDashboard(){

    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const {data: user} = useUser();

    const allFlashesQuery = useFirestore()
        .collection('Flashes')
        .where("uid", "==", user.uid)

    const flashes = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery);
    const maxSteps = flashes.data?.length;

    return(
        <div className={classes.root}>
            {flashes.data ?
                <Flashcard key={`flashcard-${flashes.data[activeStep].question}`}
                           answer={flashes.data[activeStep].answer} category={flashes.data[activeStep].category}
                           question={flashes.data[activeStep].question}
                           stage={flashes.data[activeStep].stage} uid={flashes.data[activeStep].uid}/>
                :
                null
            }

            <MobileStepper
                steps={maxSteps ? maxSteps : 0}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </div>
    )
}