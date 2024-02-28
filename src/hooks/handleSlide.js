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
        window.addEventListener("touchhstart", handleMouseDown);
        window.addEventListener("touchend", handleMouseUp);
        window.addEventListener("touchmove", getSlideDirection);

        return () => {
            window.removeEventListener("touchhstart", null)
            window.removeEventListener("touchend", null)
            window.removeEventListener("touchmove", null)
        }
    }, []);

    const handleMouseDown = (event) => {
        startCoord.current = { x: event.offsetX, y: event.offsetY }
        isMouseDown.current = true
    }

    const handleMouseUp = (event) => {
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