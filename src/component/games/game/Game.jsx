import React, { useState, useEffect } from 'react';
import gameServices from '../../../service/game-service.js';
import { Button, Grid, makeStyles } from '@material-ui/core';
import './index.css';
import Board from './Board';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));


function Game(props) {
    const classes = makeStyles(useStyles);
    const [index, setIndex] = useState(-1);
    const [component, setComponent] = useState();
    const [userNext, setUserNext] = useState(props.gameData.user1.username);
    let status = "Next user: " + userNext;

    const setContent = (history, winChain, boardSize, status, move) => {
        setComponent(

            <div className="game">

                <div className="game-board">
                    <Board
                        squares={history}
                        isWin={winChain}
                        onClick={(i) => handleClick(i)}
                        row={boardSize}
                        move={move}
                    />

                </div>

                <div className="game-info">
                    <div>{status}</div>
                </div>
            </div>
        )
    }


    function handleClick(i) {

    }

    const handleLeft = () => {
        const history = props.gameData.history;
        console.log('History: ', history);
        if (index >= 0) {

            const newHistory = history.slice(0, index);
            //setData();
            status = "Next user: " + userNext;
            setIndex(index - 1);
            setUserNext(userNext ===
                props.gameData.user1.username ? props.gameData.user2.username : props.gameData.user1.username);
            setContent(newHistory, null, props.boardSize, status, newHistory[newHistory.length - 1]);
        }
        else return;
    }

    const handleRight = () => {
        if (index < props.gameData.history.length - 1) {
            const history = props.gameData.history;

            const newHistory = history.slice(0, index + 2);
            const winSquares = gameServices.calculateWinner(newHistory, newHistory[newHistory.length - 1],
                props.boardSize);

            if (winSquares) {
                status = "Winner: " + (userNext ===
                    props.gameData.user1.username ? props.gameData.user2.username : props.gameData.user1.username);
            }
            else {

                status = "Next user: " + userNext;
            }
            setIndex(index + 1);
            setUserNext(userNext ===
                props.gameData.user1.username ? props.gameData.user2.username : props.gameData.user1.username);
            setContent(newHistory, winSquares, props.boardSize, status, newHistory[newHistory.length - 1]);
        }
        else return;
    }


    useEffect(() => {
        setContent([], null, props.boardSize, status, -1);
        setUserNext(userNext ===
            props.gameData.user1.username ? props.gameData.user2.username : props.gameData.user1.username);
    }, [])

    return (

        <Grid item md={12}>
            {component}
            <Grid md = {5} direction='column' align='center'>
                <Button onClick={() => {
                    handleLeft();
                }}>
                    <ArrowBackIcon></ArrowBackIcon>
                </Button>
                <Button onClick={() => {
                    handleRight();
                }}>
                    <ArrowForwardIcon></ArrowForwardIcon>
                </Button>
            </Grid>
        </Grid>


    )
}

export default Game;