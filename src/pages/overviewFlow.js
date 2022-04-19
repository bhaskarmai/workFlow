/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import dagre from "dagre";
import * as _ from "underscore";

// import { initialNodes, initialEdges } from "./initial-elements";

import "./index.css";
const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  console.log("1", edges);
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    console.log("2", edge.target);
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";
    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}

const OverviewFlow = (props) => {
  // const forceUpdate = useForceUpdate(false);
  // const [value, setValue] = useState(0);
  console.log("props", props.flowData);
  const temp = [];
  let initialEdge = [];
  // console.log("flowData", this.props.flowData);
  const temp2 = props.flowData; // JSON.parse(sessionStorage.getItem("flowData"));
  console.log("data temp", temp2);
  if (temp2 && temp2.length > 0) {
    console.log("fff");
    for (let index = 0; index < temp2.length; index++) {
      temp.push({
        id: temp2[index].from_step_id.toString(),
        data: {
          label: (
            <>
              {temp2[index].to_step_details
                .slice(
                  temp2[index].to_step_details.indexOf("description") + 14,
                  temp2[index].to_step_details.indexOf("isManualStep")
                )
                .replace(/['"]+/g, "")}

              {/* <h5 className="numbercol">02</h5> */}
              <span className="badges">{temp2[index].cout}</span>
              <a href="d" class="webimg">
                <img src="/assets/img/webimg2.png" width="25px" />
                {/* <img
                  src={`${temp2[index].to_step_details
                    .slice(
                      temp2[index].to_step_details.indexOf("isManualStep") + 48,
                      temp2[index].to_step_details.length - 8
                    )
                    .replace(/['"]+/g, "")}`}
                  width="30px"
                /> */}
              </a>

              {/* <span>{temp2[index].cout}</span> */}
            </>
          ),
          // label: <>{item.process_name + "" + item.from_step_id}</>,
        },
        position,
      });

      initialEdge.push({
        id: index.toString(),
        source: temp2[index].from_step_id.toString(),
        target: temp2[index].to_step_id.toString(),
        // label: temp2[index].cout,
        type: edgeType,
        animated: true,
      });
    }
  }
  const filtlertemp = _.uniq(temp, "id");
  const initialEdges = initialEdge;
  const initialNodes = filtlertemp;
  console.log("fff", initialEdges);
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: "smoothstep", animated: true }, eds)
      ),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const {
        nodes: layoutedNodes,
        edges: layoutedEdges,
      } = getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  const forceUpdate1 = () => {
    console.log("11");
  };

  // console.log("value", value);
  return (
    <div className="layoutflow">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onLoad={forceUpdate1}
        connectionLineType="smoothstep"
        fitView
      />
      <div className="controls">
        <button onClick={() => onLayout("TB")}>vertical layout</button>
        <button onClick={() => onLayout("LR")}>horizontal layout</button>
        {/* <button onClick={forceUpdate}>Click</button> */}
      </div>
    </div>
  );
};

export default OverviewFlow;
