import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
<<<<<<< Updated upstream
import chartjs from "chart.js";
=======
import Desktop from "./Desktop/Desktop";
import { useMediaQuery } from "react-responsive";

>>>>>>> Stashed changes
export default function Dashboard() {
    const isDesktop = useMediaQuery({
        query: '(min-width: 768px)'
    })
    
    return (
        <div>
            <Navbar />
            {isDesktop && <Desktop />}
        </div>
    )
}