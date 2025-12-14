// textNode.js

import { useEffect, useMemo, useState, useRef } from 'react';
import { useReactFlow } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

const variableRegex = /{{\s*([a-zA-Z_$][\w$]*)\s*}}/g;

const extractVariables = (text) => {
  const found = new Set();
  let match;
  // Reset regex lastIndex to ensure we check from the beginning
  variableRegex.lastIndex = 0;
  while ((match = variableRegex.exec(text)) !== null) {
    found.add(match[1]);
  }
  return Array.from(found);
};

export const TextNode = ({ id, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const { updateNodeDimensions } = useReactFlow();
  const textareaRef = useRef(null);
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const variables = useMemo(() => extractVariables(currText), [currText]);

  useEffect(() => {
    updateNodeData(id, { text: currText, variables });
  }, [currText, variables, id, updateNodeData]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.max(80, Math.min(400, scrollHeight))}px`;
    }
  }, [currText]);

  // Calculate dynamic dimensions based on text content
  const lines = currText.split('\n');
  const longest = Math.max(...lines.map((l) => l.length), 1);
  const dynamicWidth = Math.min(500, Math.max(240, longest * 8 + 60));
  const dynamicHeight = Math.min(450, Math.max(140, lines.length * 24 + 120));

  // Update node dimensions when text changes
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is updated before measuring
    const timeoutId = setTimeout(() => {
      if (updateNodeDimensions) {
        updateNodeDimensions(id);
      }
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [currText, dynamicWidth, dynamicHeight, id, updateNodeDimensions]);

  const inputHandles = variables.map((name, idx) => ({
    id: `${id}-var-${name}`,
    color: '#38bdf8',
    offset: idx,
  }));

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      title="Text"
      subtitle="Dynamic template"
      accentColor="#22c55e"
      data={data}
      inputs={inputHandles}
      outputs={[{ id: `${id}-output`, color: '#22c55e' }]}
      cardStyleOverride={{
        width: dynamicWidth,
        minWidth: dynamicWidth,
        maxWidth: dynamicWidth,
        minHeight: dynamicHeight,
      }}
    >
        <div className="badge">Auto-resizes</div>
        <div style={{ position: 'relative', width: '100%' }}>
          <textarea
            ref={textareaRef}
            className="textarea textarea-enhanced"
            style={{ 
              width: '100%', 
              minHeight: 80,
              maxHeight: 400,
              resize: 'none',
              fontFamily: "'SFMono-Regular', 'Monaco', 'Menlo', 'Consolas', monospace",
              fontSize: '13px',
              lineHeight: '1.6',
              padding: '12px',
              overflowY: 'auto',
            }}
            value={currText}
            onChange={handleTextChange}
            placeholder="Enter text here. Use {{variableName}} to create input handles..."
            spellCheck={false}
          />
        </div>
        {variables.length > 0 && (
          <div className="hint" style={{ 
            marginTop: '8px',
            padding: '6px 10px',
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{ color: '#38bdf8' }}>✓</span>
            <span>Variables: <strong>{variables.join(', ')}</strong></span>
          </div>
        )}
    </BaseNode>
  );
};
