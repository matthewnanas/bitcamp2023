import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import chartjs from "chart.js";
export default function Dashboard() {
    return (
        <div>
            <Navbar />
            <h1>Know <span style={{color: '#ff0000'}}>before</span> it happens</h1>
        </div>
    )
}