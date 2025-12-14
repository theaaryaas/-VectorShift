// inputNode.js

import { useEffect, useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  useEffect(() => {
    updateNodeData(id, { inputName: currName, inputType });
  }, [currName, inputType, id, updateNodeData]);

  return (
    <BaseNode
      title="Input"
      subtitle="Pipeline entry"
      accentColor="#22d3ee"
      data={data}
      outputs={[{ id: `${id}-value`, color: '#22d3ee' }]}
    >
      <div className="form-grid">
        <label className="label">
          Name
          <input
            className="input"
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
          />
        </label>
        <label className="label">
          Type
          <select
            className="input"
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
