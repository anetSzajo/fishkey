import React from "react";
import {useHistory} from 'react-router-dom';
import firebase from "firebase/app";
import {useUser} from "reactfire";
import '../../../main.scss';

export default function EndTraining() {
    const history = useHistory();
    const {data: user} = useUser();

    const updateFlashcardsActiveStatus = async () => {
        try {
            firebase.firestore().collection('Flashes')
                .where("uid", "==", user.uid)
                .where('stage', '!=', 'archived')
                .where('isActive', '==', false)
                .get()
                .then(response => {
                    let batch = firebase.firestore().batch()
                    response.docs.forEach((doc) => {
                        const docRef = firebase.firestore().collection('Flashes').doc(doc.id)
                        batch.update(docRef, {isActive: true})
                    })
                    batch.commit().then(() => {
                        console.log(`updated all documents inside ${'Flashes'}`)
                    })
                })
        } catch (error) {
            console.log(error);
        }
    }

    const handleEndTrainingButtonClick = (event: React.MouseEvent) => {
        updateFlashcardsActiveStatus()
            .then(() => console.log("Active status successfully updated"))
            .catch(err => console.log("Can't update active status" + err))
        history.push('/home');
    }

    return (
        <button className="button-small end-btn" onClick={handleEndTrainingButtonClick}>END TRAINING</button>
    )
}