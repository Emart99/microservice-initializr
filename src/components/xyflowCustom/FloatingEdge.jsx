import { getBezierPath, useInternalNode } from '@xyflow/react';
import { getEdgeParams } from './getEdgeParams';
import { useEffect, useState } from 'react';

function FloatingEdge({ id, source, target, markerEnd, style }) {
    const sourceNode = useInternalNode(source);
    const targetNode = useInternalNode(target);
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

    if (!sourceNode || !targetNode) {
        return null;
    }

    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
        sourceNode,
        targetNode,
    );

    const [edgePath] = getBezierPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition: sourcePos,
        targetPosition: targetPos,
        targetX: tx,
        targetY: ty,
    });

    const edgeStyle = {
        ...style,
        stroke: isDarkMode ? '#d1d1d1' : '#222',
        strokeWidth: 1.5,
    };

    const markerId = `${id}-marker`;

    return (
        <>
            <defs>
                <marker
                    id={markerId}
                    markerWidth="10"
                    markerHeight="10"
                    refX="5"
                    refY="5"
                    orient="auto"
                >
                    
                </marker>
            </defs>
            <path
                id={id}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={`url(#${markerId})`}
                style={edgeStyle}
            />
        </>
    );
}

export default FloatingEdge;