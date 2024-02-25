import {useEffect, useRef, useState} from "react";

export const SLIDE_DIRECTION = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}

export const useSlider = () => {
    const isMouseDown = useRef(false)
    const startCoord = useRef({ x: 0, y: 0 })
    const [slideDirection, setSlideDirection] = useState(null)

    useEffect(() => {
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", getSlideDirection);

        return () => {
            window.removeEventListener("mousedown", null)
            window.removeEventListener("mouseup", null)
            window.removeEventListener("mouseup", null)
        }
    }, []);

    const handleMouseDown = (event) => {
        startCoord.current = { x: event.offsetX, y: event.offsetY }
        isMouseDown.current = true
    }

    const handleMouseUp = (event) => {
        console.log('mouse UP')
        startCoord.current = { x: 0, y: 0 }
        isMouseDown.current = false
    }


    const getSlideDirection = (event) => {
        if (!isMouseDown.current) return;

        const currentX = event.offsetX
        const currentY = event.offsetY

        const sliding = startCoord.current.x - currentX < 0
            ? SLIDE_DIRECTION.RIGHT
            : SLIDE_DIRECTION.LEFT

        if (
            Math.abs(startCoord.current.x - currentX) >= 400 &&
            Math.abs(startCoord.current.y - currentY) < 400
        ) {
            setSlideDirection(sliding)
        }
    }

    return {
        slideDirection
    }
}