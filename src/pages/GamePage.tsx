import { useState, useEffect } from 'react';
import './GamePage.styles.css';
import { initializeCircles, handleCircleClick } from './GamePageLogic';

function GamePage() {
    const [gameState, setGameState] = useState({
        time: 0,
        isPlaying: false,
        points: '',
        circles: [] as { id: number; x: number; y: number; color: string }[],
        currentCircleIndex: 0,
        gameStatus: 'LET\'S PLAY',
    });

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState.isPlaying) {
            timer = setInterval(() => {
                setGameState(prev => ({ ...prev, time: parseFloat((prev.time + 0.1).toFixed(1)) }));
            }, 100);
        }
        return () => clearInterval(timer);
    }, [gameState.isPlaying]);

    const handlePlay = () => {
        if (!gameState.points) {
            setGameState(prev => ({ ...prev, gameStatus: "Please input your desired points number" }));
            return;
        }

        setGameState(prev => ({
            ...prev,
            gameStatus: 'LET\'S PLAY',
            isPlaying: true,
            currentCircleIndex: 0,
            time: 0,  // Reset the timer
            circles: initializeCircles(Number(prev.points)),
        }));
    };

    return (
        <>
            <h3 style={{ color: gameState.gameStatus === 'GAME OVER' ? 'red' : gameState.gameStatus === 'ALL CLEARED' ? 'green' : 'black' }}>
                <strong>{gameState.gameStatus}</strong>
            </h3>
            <div className='points-input'>
                <p>Points</p>
                <input
                    style={{ marginLeft: '10px' }}
                    value={gameState.points}
                    onChange={(e) => setGameState(prev => ({ ...prev, points: e.target.value }))}
                />
            </div>
            <p>Time: {gameState.time}</p>
            <button onClick={handlePlay} className='play-button'>{gameState.isPlaying ? 'Restart' : 'Play'}</button>
            <div className="rectangle">
                {gameState.circles.map(circle => (
                    <div
                        key={circle.id}
                        className="circle"
                        style={{
                            position: 'absolute',
                            left: `${circle.x}%`,
                            top: `${circle.y}%`,
                            cursor: 'pointer',
                            zIndex: 10000000 - circle.id,
                            backgroundColor: circle.color,
                            transition: 'background-color 1s ease'
                        }}
                        onClick={() => handleCircleClick(circle.id, gameState, setGameState)}
                    >
                        {circle.id}
                    </div>
                ))}
            </div>
        </>
    );
}

export default GamePage;