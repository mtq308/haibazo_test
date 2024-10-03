interface Circle {
    id: number;
    x: number;
    y: number;
    color: string;
}

interface GameState {
    time: number;
    isPlaying: boolean;
    points: string;
    circles: Circle[];
    currentCircleIndex: number;
    gameStatus: string;
}

export const initializeCircles = (numPoints: number): Circle[] => {
    return Array.from({ length: numPoints }, (_, index) => {
        const randomX = Math.random() * 93;
        const randomY = Math.random() * 91;
        return { id: index + 1, x: randomX, y: randomY, color: 'white' };
    });
};

export const handleCircleClick = (id: number, gameState: GameState, setGameState: React.Dispatch<React.SetStateAction<GameState>>) => {
    if (!gameState.isPlaying) return;

    if (id === gameState.currentCircleIndex + 1) {
        const newIndex = gameState.currentCircleIndex + 1;
        setGameState(prev => ({
            ...prev,
            currentCircleIndex: newIndex,
            circles: prev.circles.map(circle => circle.id === id ? { ...circle, color: 'red' } : circle),
        }));

        setTimeout(() => {
            setGameState(prev => ({
                ...prev,
                circles: prev.circles.filter(circle => circle.id !== id),
            }));
        }, 500);

        if (newIndex === Number(gameState.points)) {
            setGameState(prev => ({ ...prev, isPlaying: false, gameStatus: 'ALL CLEARED' }));
        }
    } else {
        setGameState(prev => ({ ...prev, isPlaying: false, gameStatus: 'GAME OVER' }));
    }
};
