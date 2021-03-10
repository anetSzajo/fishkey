import React from "react";
import {useFirestore, useFirestoreCollectionData, useUser} from "reactfire";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import Flashcard from "../Flashcard/Flashcard";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CountFlashcardByStage from "../CountFlashcardByStage/CountFlashcardByStage";
import {useLocation} from "react-router";

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
});

export default function FlashcardsDashboard() {

    const classes = useStyles();

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const {data: user} = useUser();
    const location = useLocation<{trainingCategory: string}>();

    const allFlashesQuery = useFirestore()
        .collection('Flashes')
        .where("uid", "==", user.uid)
        .where("isActive", "==", true)
        .where("category", "==", location.state.trainingCategory)


    const flashcards: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery).data;

    const firstStageFlashcards: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery.where("stage", "==", 1)).data;
    const secondStageFlashcards: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery.where("stage", "==", 2)).data;
    const thirdStageFlashcards: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery.where("stage", "==", 3)).data;
    const fourthStageFlashcards: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery.where("stage", "==", 4)).data;
    const fifthStageFlashcards: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery.where("stage", "==", 5)).data;

    const allFlashcards: FlashcardModel[] | null =
        (firstStageFlashcards?.length ? firstStageFlashcards : null) ||
        (secondStageFlashcards?.length ? secondStageFlashcards : null) ||
        (thirdStageFlashcards?.length ? thirdStageFlashcards : null) ||
        (fourthStageFlashcards?.length ? fourthStageFlashcards : null) ||
        (fifthStageFlashcards?.length ? fifthStageFlashcards : null);

    const maxSteps = allFlashcards?.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className={classes.root}>
            {/*{ allFlashcards?.map((flashcard, activeStep) =>*/}
            {/*        <Flashcard*/}
            {/*            {...allFlashcards[activeStep]}*/}
            {/*            key={`flashcard-${allFlashcards[activeStep].question}`}*/}
            {/*        />*/}
            {/*    )*/}
            {/*}*/}
            {allFlashcards?.length
                ?
                <Flashcard
                    {...allFlashcards[activeStep]}
                />
                :
                null
            }
            <MobileStepper
                steps={maxSteps ? maxSteps : 0}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={maxSteps ? activeStep === maxSteps - 1 : maxSteps === 0}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                        Back
                    </Button>
                }
            />
            <CountFlashcardByStage flashcards={flashcards ? flashcards : []}/>
        </div>
    )
}