import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import service from './chess-service';
import styles from './chess.module.scss';
import chessboard from '../assets/imgs/chess1.jpg';
import figure_1 from '../assets/imgs/figure_1.png';
import cx from 'classnames';
import d3Logo from "../assets/imgs/d3.png";
import matplotlibLogo from "../assets/imgs/matplotlib_logo.png";
import pandasLogo from "../assets/imgs/pandas-logo.png";

let boardGridData: Array<any>;
let counter = 0;
let chessData: any;

/* Component */
const ChessComponent = (props: any) => {

    const [displayMateText, setDisplayMateText] = useState(false);
    const [displayDrawText, setDisplayDrawText] = useState(false);
    const [whiteMoves, setWhiteMoves] = useState<string[]>([]);
    const [blackMoves, setBlackMoves] = useState<string[]>([]);
    const [ gameOptions ] = useState(["Short Unbalanced Game", "Long Unbalanced Game", "A Game Between Champions"])
    const Add = gameOptions.map(Add => Add)
    const [selectedGame, setSelectedGame] = useState<string>("Short Unbalanced Game");
    const handleGameTypeChange = (e: any) => { setSelectedGame(e.target.value) } ;

    /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
    const d3Container = useRef(null);

    /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
    useEffect(
        () => {
            
            if (!!d3Container.current) {
        
                boardGridData = new Array();
                let xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
                let ypos = 1;
                const width = 50;
                const height = 50;

                // iterate for rows	
                for (var row = 0; row < 8; row++) {
                    boardGridData.push(new Array());

                    // iterate for cells/columns inside rows
                    for (var column = 0; column < 8; column++) {
                        boardGridData[row].push({
                            x: xpos,
                            y: ypos,
                            width: width,
                            height: height,
                            row: row,
                            column: column
                        })
                        // increment the x position. I.e. move it over by 50 (width variable)
                        xpos += width;
                    }
                    // reset the x position after a row is complete
                    xpos = 1;
                    // increment the y position for the next row. Move it down 50 (height variable)
                    ypos += height;
                }
            } 
    });

    if(counter === 0) {
        // Initially launch game to set up board
        launchGame(false);
        counter++;
    }
        

    async function launchGame(playGame:boolean) {

        const Chess = require('chess.js');
        const chess = new Chess();

        let moves;
        let blackMutate: Array<string> = [];
        let whiteMutate: Array<string> = [];

        if (selectedGame !== "A Game Between Champions") {
            if (selectedGame === "Short Unbalanced Game") {
                 chessData = await service.fetchChess();
            } else {
                chessData = await service.fetchLongestStomp();
            }
            console.log(chessData)
             moves = chessData.data[0]['moves'].split(" ");
        } else {
            let c = "1.d4 d5 2.c4 dxc4 3.e4 Nc6 4.Be3 Nf6 5.Nc3 e5 6.d5 Ne7 7.Bxc4" 
            + " Ng6 8.f3 Bd6 9.Qd2 Bd7 10.Nge2 a6 11.Bb3 b5 12.a4 O-O 13.O-O" 
            + " Qe7 14.Rac1 Nh5 15.g3 h6 16.Bc2 Rab8 17.axb5 axb5 18.Ra1 Ra8"
            + " 19.Bd3 Bb4 20.Rxa8 Rxa8 21.Qc2 Bc5 22.Nd1 Bd6 23.Nf2 Nhf4"
            + " 24.Rc1 Qg5 25.Kh1 Qh5 26.Ng1 Nxd3 27.Nxd3 f5 28.Nc5 Bc8 29.Rf1"
            + " Ne7 30.Qd3 fxe4 31.fxe4 Qg6 32.Kg2 Kh7 33.Nf3 Ng8 34.Nh4 Qg4"
            + " 35.Nf5 Nf6 36.h3 Qg6 37.g4 Bxc5 38.Bxc5 Ra4 39.Rf3 Rc4 40.Be7"
            + " Bxf5 41.Rxf5 Rd4 42.Qe3 Rxe4 43.Qf3 Rf4 44.Rxf4 exf4 45.Bxf6"
            + " Qxf6 46.Qd3+ Qg6 47.Qe2 c6 48.Kf3 cxd5 49.Kxf4 Qf6+ 50.Kg3"
            + " Qd6+ 51.Kf3 b4 52.h4 Qf6+ 53.Kg3 Qd6+ 54.Kf3 Qf6+ 55.Kg3 g6"
            + " 56.Qe8 Qd6+ 57.Kf3 Kg7 58.g5 hxg5 59.hxg5 d4 60.Qe4 d3 61.Qb7+"
            + " Kf8 62.Qc8+ Ke7 63.Qb7+ Ke6 64.Qe4+ Kd7 65.Qb7+ Kd8 66.Qa8+"
            + " Kc7 67.Qa7+ Kc8 68.Qa8+ Kc7 69.Qa7+ Kc6 70.Qa6+ Kc5 71.Qxd6+"
            + " Kxd6 72.Ke3 Ke5"

            c = c.replace(/[0-9]+\./g, '')
            console.log(c);
            moves = c.split(" ");
        }
        
        

        if(playGame){
            moves.forEach((move: string, i: number) => {
                setTimeout(() => {
                    chess.move(move)
                    buildBoard(chess)
                    if (i % 2 === 0 || i === 0) {
                        setWhiteMoves(whiteMoves => whiteMoves.concat(move)); 
                        whiteMutate.push(move)
                    } else {
                        setBlackMoves(blackMoves => blackMoves.concat(move))
                        blackMutate.push(move)
                    }

                    if (i === (moves.length - 1) && selectedGame !== "A Game Between Champions") {
                        setDisplayMateText(true);
                        console.log(whiteMutate, blackMutate);
                    } else if (i === (moves.length - 1) ) {
                        setDisplayDrawText(true);
                        
                    }
                    
                    }, 1500 * (i + 1))
            });
        } else {
            buildBoard(chess);
        }
    }

    function buildBoard(chess: any) {
        

        let boardPiecesData = chess.board();
        let boardGridDataWithPieces = boardGridData.map((row: any[], rowIdx: number) => {
            return row.map((col: any, colIdx: number) => ({
                ...col,
                piece: boardPiecesData[rowIdx][colIdx],
            }));
        });
        // Bind D3 data
        const board = d3.select('svg')
        .data(boardGridDataWithPieces)
        .attr("width", "403px")
        .attr("height", "403px");

        // Enter new D3 elements
        const gridRow = board
            .selectAll(".row")
            .data(boardGridDataWithPieces)
            .enter()
            .append("g")
            .attr("class", "row");

        gridRow
            .selectAll(".square")
            .data((d: any) => d)
            .enter()
            .append("rect")
            .attr("class", "square")
            .attr("x", (d: any) => d.x)
            .attr("y", (d: any) => d.y)
            .attr("width", (d: any) => d.width)
            .attr("height", (d: any) => d.height)
            .style("fill", (d: any) => {
                const evenRow = d.row % 2 === 0;
                const evenCol = d.column % 2 === 0;
                if ((evenRow && !evenCol) || (!evenRow && evenCol)) {
                    return "#C0C0C0";
                } else {
                    return "#f5f5f5";
                }
            });

        const flattenedBoard = boardGridDataWithPieces.flatMap((d: any) => d);
  
        board.selectAll("image").remove();
        pieces(board,flattenedBoard)

        board.exit()
    }


    function pieces(board:any, flattenedBoard:any) {
        board
            .selectAll("image")
            .data(flattenedBoard)
            .enter()
            .filter((d: any) => d.piece != null)
            .append('image')
            .attr('href', (d: any) => {
                const color = d.piece.color === 'w' ? 'white' : 'black';
                return `${process.env.PUBLIC_URL}/chess-pieces/${d.piece.type}_${color}.svg`;
            })
            .attr('height', '50px')
            .attr('width', '50px')
            .attr('x', (d: any) => d.x)
            .attr('y', (d: any) => d.y);
    }

    

    return (
        <div>
            <div className={"project-desc-container"}>
                    <h1 className={cx(styles.heading, "desktop-containers-text ")}>Chess Replayer</h1>
                 
                    <br/>

                    <h3 className="header-text desktop-containers-text preserve">Technologies Used</h3>
                    <div className="tech-used-box desktop-containers-text">
                        <div className="tech-logos-box">
                            <img className="tech-used-logo" src={d3Logo} alt={"d3-library-logo"}/>
                            <img className="tech-used-logo" src={matplotlibLogo} alt={"matplotlib-logo"}/>
                            <img className="tech-used-logo tech-used-logo-dark " src={pandasLogo} alt={"pandas-logo"}/>
                        </div>
                    </div>
                </div>
            <div className={ displayMateText ? styles.D3componentextended : styles.D3component}>
                <div className={styles.selectContainer}>
                    <select
                        onChange={(e: any) => handleGameTypeChange(e)}>
                        {
                            Add.map((address, key) => <option key={key}value={address} className="test">{address}</option>)
                        }
                    </select>
                    <button onClick={() => launchGame(true)} className={styles.btn}>Play Game</button>
                </div>
                <div className={styles.svgContainer}>
                    <div className={styles.flex}>
                        <div className={styles.blackBox}>
                            <h4 className={styles.boxTitle}>Black Moves</h4>             
                            <ul className={styles.box}>{blackMoves.map((el, i) => <li key={i}> {el} </li>)}</ul>
                        </div>
                        <svg
                            className={styles.D3component}
                            width={400}
                            height={200}
                            ref={d3Container}
                        />
                        <div className={styles.whiteBox}>
                            <h4 className={styles.boxTitle}>White Moves</h4>
                            <ul className={styles.box}>{whiteMoves.map((el, i) => <li key={i}> {el} </li>)}</ul>
                        </div>
                </div>
                
                {displayMateText ?  <h1 className={styles.mateText}>Checkmate</h1> :
                displayDrawText ? <h1 className={styles.mateText}> Draw</h1> : null }

                {displayMateText ? 
                <div className={styles.gameStatsContainer}>
                    <div className={styles.listContainer}>
                        <h3>Game Stats</h3>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Black Player Rating : {chessData.data[0]['black_rating']}</li>
                            <li className={styles.listItem}>White Player Rating : {chessData.data[0]['white_rating']}</li>
                            <li className={styles.listItem}>Opening: {chessData.data[0]['opening_name']}</li>
                            <li className={styles.listItem}>Turns: {chessData.data[0]['turns']}</li>
                            <li className={styles.listItem}>Winner: {chessData.data[0]['winner']}</li>
                        </ul>
                    </div>
                </div> : null}
            </div>
          
                <div id={styles.foglayer_01} className={styles.fog}>
                <div className={styles.image01}></div>
                <div className={styles.image02}></div>
            </div>
                <div id={styles.foglayer_02} className={styles.fog}>
                <div className={styles.image01}></div>
                <div className={styles.image02}></div>
            </div>
                <div id={styles.foglayer_03} className={styles.fog}>
                <div className={styles.image01}></div>
                <div className={styles.image02}></div>
            </div>
            </div>
            <div className={styles.textBlock}>
                <img src={chessboard} className={styles.chessboardBg}/>
                <h3 className="title"> The Data</h3>
                <p> The "Shortest Unbalanced Game" contains the following criteria.</p>
                <ul className={styles.textList}>
                    <li> Unbalanced match up between players</li>
                    <li> Game ended in checkmate</li>
                    <li> Game with smallest number of turns after the first two conditions have been applied.</li>
                </ul>
                <p> The first two games featured in the dropdown menu were pulled from the Lichess dataset available on kaggle.com. The term "unbalanced" in this case is used to reflect the difference in player rating between white and black. Below is a histogram of all player ratings.
                </p>
                <img src={figure_1}/>
                <p>After reviewing the histogram above I decided that an "unbalanced game" would mean a game where one player's rating was at least 1000 points more than the other players'. Since Lichess is an online chess portal I am only considering games that end with a status of "mate" as users may resign for any number of reasons unrelated to the game. It is possible that other games in the dataset also met the listed criteria, but I am only pulling the first game that matches. The Longest Unbalanced Game has similar criteria, with the exception that it contains the laregest number of turns among the pool of remaining games.
                </p>
                <h3>A Game Between Champions</h3>
                <p>This chess replayer was built in the same year the popular Netflix original series, The Queen's Gambit, was released. The final riveting game between protagonist Beth Harmon, and soviet chess genius, Borgov, is based off of a 1993 chess game between Vassily Ivanchuk and Patrick Wolff. Unlike the show, this game actually ended in a draw.
                </p>
     
                 <p> I did not create the fog background but found it on codepen. Take a look at this impressive css for yourself. <a href="https://codepen.io/Ravyre/pen/gXawyY" target="blank">Codepen Link</a></p>
            </div>
        </div>

    );
}

export default ChessComponent