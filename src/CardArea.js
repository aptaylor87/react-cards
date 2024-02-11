import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./CardArea.css"
import Card from "./Card"


function CardArea () {
    const [timerSwitch, setTimerSwitch ] = useState(false);
    const [deck, setDeck ] = useState(null);
    const [cards, setCards ] = useState([]);
    const timerRef = useRef();

    function toggleTimer (evt) {
        setTimerSwitch(timerSwitch => !timerSwitch)

    }

    useEffect(function fetchDeckWhenMounted() {
        async function fetchDeck() {
            const deckRes = await axios.get(
                `https://deckofcardsapi.com/api/deck/new/shuffle`);
                setDeck(deckRes.data.deck_id)
                
        }
        fetchDeck()
    }, []);

    useEffect(() => {
        async function addCard() { 
            if (cards.length === 52) {
            
                alert("You've drawn all the cards")
                        
            } else {
                const newCardRes = await axios.get(
                    `https://deckofcardsapi.com/api/deck/${deck}/draw/`);
                    console.log(newCardRes.data.cards[0].image)
                const card = newCardRes.data.cards[0];
                const code = card.code
                const image = card.image
                const angle = Math.random() * 90 - 45;
                const randomX = Math.random() * 40 - 20;
                const randomY = Math.random() * 40 - 20;
                setCards(cards => [
                    ...cards,{ 
                        image: image, 
                        code: code, 
                        angle: angle, 
                        randomX: randomX, 
                        randomY: randomY 
                    }]);
            }       
        }

        if (timerSwitch && !timerRef.current) {
            timerRef.current = setInterval(async () => {
                await addCard();
            }, 1000);
        }

        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [timerSwitch, setTimerSwitch, cards]);
    

    

    


    if (cards.length === 52) {
        
        alert("You've drawn all the cards")
                
    }
    
    return (
        <>
        <button onClick={toggleTimer}> {timerSwitch ?  "Stop Timer" : "Start Timer"}</button>
        
        <div className="CardArea"> 
        {cards.map((card) => (
            <Card card={card}  />
        ))}
        </div>
        </>
        
    )

}

export default CardArea;