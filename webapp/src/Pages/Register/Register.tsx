import React from "react";
import { useMediaQuery } from 'react-responsive'
import Navbar from "../../Components/Navbar/Navbar";
import Desktop from "./Desktop/Desktop";
import Mobile from "./Mobile/Mobile";

export default function Register() {
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