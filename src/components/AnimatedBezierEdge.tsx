import { BaseEdge, getBezierPath, EdgeProps } from '@xyflow/react';

export default function AnimatedBezierEdge({
                                               id,
                                               sourceX,
                                               sourceY,
                                               targetX,
                                               targetY,
                                               sourcePosition,
                                               targetPosition,
                                               style = {},
                                               markerEnd,
                                           }: EdgeProps) {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        curvature: 0.4,
    });

    return (
        <>
            {/* Background Soft Glow Path */}
            <path
                d={edgePath}
                fill="none"
                stroke="#8B9CFF"
                strokeWidth={3}
                strokeOpacity={0.15}
            />

            {/* Dashed Base Edge Path */}
            <BaseEdge
                id={id}
                path={edgePath}
                markerEnd={markerEnd}
                style={{
                    ...style,
                    stroke: '#8B9CFF',
                    strokeWidth: 1.5,
                    strokeDasharray: '4 4',
                    opacity: 0.6,
                }}
            />

            {/* Animated Glowing Packet Dot */}
            <circle r="4" fill="#00FF88" className="drop-shadow-[0_0_8px_#00FF88]">
                <animateMotion
                    dur="2.5s"
                    repeatCount="indefinite"
                    path={edgePath}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                />
            </circle>
        </>
    );
}