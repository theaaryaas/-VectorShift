// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MarkdownNode } from './nodes/markdownNode';
import { HttpNode } from './nodes/httpNode';
import { ConditionNode } from './nodes/conditionNode';
import { DelayNode } from './nodes/delayNode';
import { EmbedNode } from './nodes/embedNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  markdown: MarkdownNode,
  http: HttpNode,
  condition: ConditionNode,
  delay: DelayNode,
  embed: EmbedNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      return { id: nodeID, nodeType: `${type}` };
    }

    const onDrop = useCallback(
      (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        if (event?.dataTransfer?.getData('application/reactflow')) {
          const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
          const type = appData?.nodeType;

          if (typeof type === 'undefined' || !type) {
            return;
          }

          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          });

          const nodeID = getNodeID(type);
          const newNode = {
            id: nodeID,
            type,
            position,
            data: getInitNodeData(nodeID, type),
          };

          addNode(newNode);
        }
      },
      [reactFlowInstance, addNode, getNodeID]
    );

    const handleNodeClick = useCallback((_, node) => {
      setSelectedNodeId(node.id);
    }, []);

    const handlePaneClick = useCallback(() => {
      setSelectedNodeId(null);
    }, []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
      <div className="workspace">
        <div className="canvas-shell" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
            onNodeClick={handleNodeClick}
            onPaneClick={handlePaneClick}
            nodeTypes={nodeTypes}
            proOptions={proOptions}
            snapGrid={[gridSize, gridSize]}
            connectionLineType='smoothstep'
            fitView
          >
            <Background color="#1e293b" gap={gridSize} />
            <Controls />
            <MiniMap nodeStrokeColor="#cbd5e1" nodeColor="#0ea5e9" />
          </ReactFlow>
        </div>
        <NodeInspector selectedNodeId={selectedNodeId} clearSelection={handlePaneClick} />
      </div>
    )
}

const inspectorSelector = (state) => ({
  nodes: state.nodes,
  updateNodeData: state.updateNodeData,
  removeNode: state.removeNode,
});

const NodeInspector = ({ selectedNodeId, clearSelection }) => {
  const { nodes, updateNodeData, removeNode } = useStore(inspectorSelector, shallow);
  const selectedNode = nodes.find((node) => node.id === selectedNodeId);
  const [displayName, setDisplayName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setDisplayName(
        selectedNode.data?.displayName ||
          selectedNode.data?.nodeType ||
          selectedNode.type ||
          selectedNode.id
      );
      setDescription(selectedNode.data?.description || '');
    } else {
      setDisplayName('');
      setDescription('');
    }
  }, [selectedNode]);

  const handleNameChange = (value) => {
    setDisplayName(value);
    if (selectedNode) {
      updateNodeData(selectedNode.id, { displayName: value });
    }
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    if (selectedNode) {
      updateNodeData(selectedNode.id, { description: value });
    }
  };

  const handleDelete = () => {
    if (selectedNode) {
      removeNode(selectedNode.id);
      clearSelection();
    }
  };

  return (
    <div className="inspector">
      <div className="inspector-header">
        <div>
          <div className="title">Node Editor</div>
          <div className="subtitle">
            {selectedNode ? 'Edit metadata for this node' : 'Select a node to edit'}
          </div>
        </div>
        <button className="ghost-btn" type="button" onClick={clearSelection}>
          Clear
        </button>
      </div>

      {selectedNode ? (
        <div className="inspector-body">
          <div className="pill">
            <span className="pill-label">Type</span>
            <span className="pill-value">{selectedNode.type}</span>
          </div>
          <div className="pill">
            <span className="pill-label">Id</span>
            <span className="pill-value mono">{selectedNode.id}</span>
          </div>
          <div className="form-grid single">
            <label className="label">
              Display name
              <input
                className="input"
                type="text"
                value={displayName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="My node name"
              />
            </label>
            <label className="label">
              Description
              <textarea
                className="textarea"
                rows={3}
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Notes about this node"
              />
            </label>
            <div className="inspector-actions">
              <button className="danger-btn" type="button" onClick={handleDelete}>
                Delete node
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="inspector-empty">
          <div className="hint">Tip: click any node to edit its name and notes.</div>
        </div>
      )}
    </div>
  );
};
