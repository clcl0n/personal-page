import React, { FunctionComponent, useEffect, useState } from 'react';
import useCanvas from '../hooks/use-canvas';
import GameOfLife from '../libs/game-of-life';

// function to find the number
// closest to n and divisible by m
function closestNumber(n: number, m: number) {
    // find the quotient
    const q = Math.trunc(n / m);

    // 1st possible closest number
    const n1 = m * q;

    // 2nd possible closest number
    const n2 = n * m > 0 ? m * (q + 1) : m * (q - 1);

    // if true, then n1 is the
    // required closest number
    if (Math.abs(n - n1) < Math.abs(n - n2)) return n1;

    // else n2 is the required
    // closest number
    return n2;
}

const calculateSizeOfCanvas = (size: number) =>
    closestNumber(size - (size / 100) * 10, 5);

const GameOfLifePage: FunctionComponent = () => {
    const [canvasWidth, setCanvasWidth] = useState<number>(
        calculateSizeOfCanvas(window.innerWidth),
    );
    const [canvasHeight, setCanvasHeight] = useState<number>(
        calculateSizeOfCanvas(window.innerHeight),
    );
    const [gameOfLife] = useState<GameOfLife>(new GameOfLife());

    const rootDivStyle: React.CSSProperties = {
        height: '100vh',
        margin: 0,
        backgroundColor: 'black',
    };

    const canvasRef = useCanvas(({ canvas }) => {
        if (canvasRef.current) {
            gameOfLife.initialize(canvas);
            gameOfLife.start();
        }
    });

    const handleResize = () => {
        const newWidth = calculateSizeOfCanvas(window.innerWidth);
        const newHeight = calculateSizeOfCanvas(window.innerHeight);
        setCanvasWidth(newWidth);
        setCanvasHeight(newHeight);
        gameOfLife.restart(newWidth, newHeight);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={rootDivStyle}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100%',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <canvas
                        ref={canvasRef}
                        style={{
                            border: '1px solid black',
                            backgroundColor: 'white',
                        }}
                        width={canvasWidth}
                        height={canvasHeight}
                    />
                </div>
            </div>
        </div>
    );
};

export default GameOfLifePage;
