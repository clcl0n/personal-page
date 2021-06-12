import { useEffect, useRef } from "react";

const useCanvas = (callback: (props: {canvas: HTMLCanvasElement}) => void) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) callback({canvas});
    }, []);

    return canvasRef;
}

export default useCanvas;