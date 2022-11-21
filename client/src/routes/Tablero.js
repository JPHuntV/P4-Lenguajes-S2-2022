import React from "react";
import Celda from "./Celda";

function Tablero({pista}){
    return(
        <div>
            <Celda row={1} col={1}/>
            <Celda row={2} col={1}/>
            <Celda row={3} col={1}/>
            <Celda row={1} col={2}/>
        </div>
    )
}export default Tablero;
