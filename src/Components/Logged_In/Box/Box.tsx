import React from "react";
import '../../../main.scss';

type ComponentProps ={
    count: number,
    boxClass: string
}

export default function Box(props: ComponentProps){
    return(
        <div className="box">
            <img alt="" src="/icons/box.png" className={`${props.boxClass}`}/>
            <img alt="" src="/icons/cards.png"/>
            <p>{props.count}</p>
        </div>
    )
}