"use client";

import React, {useState, useEffect} from 'react';

const Board = () => {
    // useEffect(() => {
    //     console.log("HIIII!");
    // })
    const [voted, countVoted] = useState(0);

    const yes = () => {
        console.log("yes");
        countVoted(prev => prev + 1)
    }
    const no = () => {
        console.log("no");
        countVoted(prev => prev + 1)
    }
    const reset = () => {
        console.log("reset");
        countVoted(0);
    }

   return(
    <div style={{textAlign: 'center', padding: '2rem'}}>
        <h1 style = {{ fontSize: '2rem'}}> Votes: {voted}</h1>

        <div style={{display: 'flex', justifyContent: 'center', gap: '2rem'}}>
            <button onClick={yes}>Yes</button>
            <button onClick={reset}>Reset</button>
            <button onClick={no}>No</button>
        </div>
    </div>
   )
}

export default Board;