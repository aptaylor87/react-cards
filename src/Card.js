import React, { useState, useRef, useEffect } from "react";

function Card(props) {
    return (
        <img src={props.card.image} key={props.card.code} alt={props.card.code} style={{ transform: `translate(${props.card.randomX}px, ${props.card.randomY}px) rotate(${props.card.angle}deg)` }} className="Card"/>
    );
}
    
export default Card;