import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Desktop from "./Desktop/Desktop";
import { useMediaQuery } from "react-responsive";
import Mobile from "./Mobile/Mobile";

export default function Dashboard() {
    const isDesktop = useMediaQuery({
        query: '(min-width: 768px)'
    })
    
    return (
        <div>
            <Navbar />
            {isDesktop && <Desktop />}
            {!isDesktop && <Mobile />}
        </div>
    )
}