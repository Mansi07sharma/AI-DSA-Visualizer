import { useState } from 'react'
import { Sparkles } from 'lucide-react';

function NQueens() {
    const createBoard = (N) => {
        return Array.from({ length: N }, (_, row) =>
            Array.from({ length: N }, ((_, col) => ({
                row, col,
                queen: false,
                attack: false
            })))
        )
    }
    const [n, setN] = useState(4);
    const [board, setBoard] = useState(createBoard());

    const handleStart = async (N) => {
        setN(N)
        const gameBoard = createBoard(N);
        setBoard(gameBoard);
        await nQueenSolve(gameBoard, 0, N)
    }

    const nQueenSolve = async (gameBoard, row, N) => {
        if (row >= N) {
            return true;
        }

        for (let col = 0; col < N; col++) {
            if (isSafe(gameBoard, row, col, N)) {
                gameBoard[row][col].queen = true;
                setBoard([...gameBoard.map(r => [...r])]);
                await new Promise((resolve) => {
                    setTimeout(resolve, 200)
                })
                if (await nQueenSolve(gameBoard, row + 1, N)) {
                    return true;
                }

                //bcktrck
                await wrongMove(gameBoard, row, col)
                gameBoard[row][col].queen = false;
                setBoard([...gameBoard.map(r => [...r])])
                await new Promise((resolve) => {
                    setTimeout(resolve, 200)
                })
            } else {
                await wrongMove(gameBoard, row, col)
            }
        }
    }

    const wrongMove = async (boardd, row, col) => {
        boardd[row][col].attack = true;
        setBoard([...boardd.map(r => [...r])])
        await new Promise((reslove) => {
            setTimeout(reslove, 200)
        })
        boardd[row][col].attack = false;
    }

    const isSafe = (gameBoard, row, col, N) => {
        //cols
        for (let i = 0; i < N; i++) {
            if (gameBoard[row][i].queen) {
                return false;
            }
        }

        //rows
        for (let i = 0; i < N; i++) {
            if (gameBoard[i][col].queen) {
                return false;
            }
        }

        //dia left up
        let i = row;
        let j = col;
        while (i >= 0 && j >= 0) {
            if (gameBoard[i][j].queen) {
                return false;
            }
            i--; j--;
        }

        //dia left down
        i = row; j = col;
        while (i < N && j >= 0) {
            if (gameBoard[i][j].queen) {
                return false;
            }
            i++; j--;
        }

        //dia right up
        i = row; j = col;
        while (i >= 0 && j < N) {
            if (gameBoard[i][j].queen) {
                return false;
            }
            i--; j++;
        }

        //dia right down
        i = row; j = col;
        while (i < N && j < N) {
            if (gameBoard[i][j].queen) {
                return false;
            }
            i++; j++;
        }

        return true;

    }


    return (
        <div className='bg-slate-800 min-h-screen pt-10'>
            <div className="flex w-1/3  m-auto justify-center items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">N Queens Algorithm Visualization</span>
            </div>
            <div className='w-1/2 p-2 m-auto mb-4 flex justify-center gap-5 items-center'>
                <button onClick={() => handleStart(4)} className='text-lg font-bold w-1/4 bg-gradient-to-r from-blue-600 to-purple-600 transition transform hover:scale-105 rounded-2xl hover:from-blue-700 hover:to-purple-700 p-2 text-white border-2 border-blue-700'>Start 4</button>
                <button onClick={() => handleStart(8)} className='text-lg font-bold w-1/4 bg-gradient-to-r from-blue-600 to-purple-600 transition transform hover:scale-105 rounded-2xl hover:from-blue-700 hover:to-purple-700 p-2 text-white border-2 border-blue-700'>Start 8</button>
            </div>
            <div className={`grid w-fit m-auto ${n === 4 ? 'grid-cols-4' : 'grid-cols-8'}`}>
                {board.flat().map((block, idx) => {
                    return (<div key={idx} className={`w-20 h-20 border border-black items-center justify-center flex
                         ${block.attack ? "bg-red-400" : (block.row + block.col) % 2 === 0 ? 'bg-white' : 'bg-gray-600'} `}>
                        {block.queen ? <img src="./[CITYPNG.COM]3D Silver Queen King Crown HD PNG - 8000x8000.png" className='w-20 h-20'></img> : ''}
                    </div>)
                })}
            </div>
        </div>
    )
}

export default NQueens
