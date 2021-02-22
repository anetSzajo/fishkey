import React from "react";
import {Flashcard} from "../../../Modal/Flashcard/Flashcard";

type State = {
    stage: number | string
}

export default class FlashcardComponent extends React.Component<Flashcard, State>{

    constructor(props: Flashcard) {
        super(props);
        this.state = {
            stage: this.props.stage
        }
    }


    handleCorrectButton = () => {
        let archived: Flashcard[] = [];

        console.log('Correct button clicked');
        if (typeof this.state.stage === 'number') {
            if (this.state.stage === 5) {
                console.log('Should be archive')
                this.setState({
                    stage: 'ARCHIVED'
                })
            } else {
                this.setState({
                    stage: this.state.stage + 1
                }, () => console.log("stage changed to " + this.state.stage))
            }
        }
    }

    handleWrongButton = () => {
        console.log('Wrong button clicked');
    }

    render(){
       return(
           <div>
               <div>Category: {this.props.category}</div>
               <div>Question: {this.props.question}</div>
               <div>Answer: {this.props.answer}</div>
               <div>Stage: {this.state.stage}</div>
               <div>
                   <button onClick={this.handleCorrectButton} disabled={this.state.stage === 'ARCHIVED'}>Correct</button>
                   <button onClick={this.handleWrongButton}>Wrong</button>
               </div>
           </div>
       )
    }
}