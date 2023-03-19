import React, {useState, useEffect} from 'react'
import { ForceGraph2D, ForceGraph3D } from 'react-force-graph';
import './graphview.scss'


const GraphView = (props) => {
    const [graphData, setGraphData] = useState(0);

    useEffect(() => {
        fetch(`/api/get_graph`).then(res => res.json()).then(data => {
            setGraphData(data);
        });
    }, []);

    if (graphData == 0)
        return null;

    console.log(graphData)



    return props.dim === '3d' ?
        <ForceGraph3D
            graphData={graphData}
            linkColor={"#000"}
            nodeColor={"#f00"}
            width={ Math.min(1100, window.innerWidth) }
        />
    :
        <ForceGraph2D
            graphData={graphData}
            nodeAutoColorBy="group"

            nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.name;
                const fontSize = 12/globalScale;
                ctx.font = `${fontSize}px Sans-Serif`;
                const textWidth = ctx.measureText(label).width;
                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = node.color;
                ctx.fillText(label, node.x, node.y);

                node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
            }}

            onNodeClick = {(node) => {
                window.location.href = `/vault/${node.name}`;
            }}

            nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            const bckgDimensions = node.__bckgDimensions;
            bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
            }}
            width={ Math.min(1100, window.innerWidth) }
        />
}

export default GraphView;
