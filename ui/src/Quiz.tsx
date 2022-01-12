import React from 'react';
import './Quiz.css';

function Quiz() {
    return (
        <div className="Quiz">
            <div className="card">
                <div className="question">Foobar?</div>
                <ul className="answers">
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                    <li>D</li>
                </ul>
            </div>
        </div>
    );
}

export default Quiz;
