import React from "react";
import FlashcardsCategories from "../FlashcardsCategories/FlashcardsCategories";
import Logout from "../Logout/Logout";

export function LoginHomePage() {
    return (
        <div>
            <FlashcardsCategories />
            <Logout/>
        </div>
    )
}