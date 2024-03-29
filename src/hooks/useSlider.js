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
        document.body.addEventListener("touchstart", handleTouchStart);
        document.body.addEventListener("touchend", handleTouchEnd);
        document.body.addEventListener("touchmove", getSlideDirection);

        return () => {
             document.body.removeEventListener("touchstart", null)
             document.body.removeEventListener("touchend", null)
             document.body.removeEventListener("touchmove", null)
        }
    }, []);

    const handleTouchStart = (event) => {
        startCoord.current = { x: event.touches[0].screenX, y: event.touches[0].screenY }
        isMouseDown.current = true
    }

    const handleTouchEnd = () => {
        startCoord.current = { x: 0, y: 0 }
        isMouseDown.current = false
    }

    const getSlideDirection = (event) => {
        if (!isMouseDown.current) return;

        const currentX = event.touches[0].screenX
        const currentY = event.touches[0].screenY

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