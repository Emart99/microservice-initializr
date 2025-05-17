import { useState, useEffect } from 'react';
import { getBezierPath } from '@xyflow/react';
import { getEdgeParams } from './getEdgeParams';

function FloatingConnectionLine({
    toX,
    toY,
    fromPosition,
    toPosition,
    fromNode,
}) {
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains('dark')
    );

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setIsDarkMode(document.documentElement.classList.contains('dark'));
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    if (!fromNode) {
        return null;
    }

    const targetNode = {
        id: 'connection-target',
        measured: {
            width: 1,
            height: 1,
        },
        internals: {
            positionAbsolute: { x: toX, y: toY },
        },
    };

    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
        fromNode,
        targetNode,
    );

    const [edgePath] = getBezierPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition: sourcePos || fromPosition,
        targetPosition: targetPos || toPosition,
        targetX: tx || toX,
        targetY: ty || toY,
    });

    const edgeColor = isDarkMode ? '#d1d1d1' : '#222';

    return (
        <g>
            <path
                fill="none"
                stroke={edgeColor}
                strokeWidth={1.5}
                className="animated"
                d={edgePath}
            />
            <circle
                cx={tx || toX}
                cy={ty || toY}
                fill={isDarkMode ? '#2d2d2d' : '#fff'}
                r={3}
                stroke={edgeColor}
                strokeWidth={1.5}
            />
        </g>
    );
}

export default FloatingConnectionLine;