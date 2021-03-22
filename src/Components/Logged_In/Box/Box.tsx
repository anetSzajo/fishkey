import React from "react";
import '../../../main.scss';

type ComponentProps ={
    count: number,
    boxClass: string
}

export default function Box(props: ComponentProps){
    return(
        <div className="boxWithCards">
            <div className="box">
                <img alt="" src="/icons/box.png" className={`${props.boxClass}`}/>
                <div className="cards__container">{props.count}</div>
                {/*<img alt="" src="/icons/cards.png" className="cards__container"/>*/}
                    {/*<p>{props.count}</p>*/}
            </div>
        </div>
    )
}