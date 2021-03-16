import React from "react";
import UserCard from "../UserCard/UserCard";
import FlashcardsCategories from "../FlashcardsCategories/FlashcardsCategories";
import {AuthCheck} from "reactfire";

export function LoginHomePage() {
    return (
        <div>
            {/*<UserCard/>*/}
            <FlashcardsCategories />
        </div>
    )
}