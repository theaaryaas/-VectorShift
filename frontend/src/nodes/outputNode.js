// outputNode.js

import { useEffect, useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  useEffect(() => {
    updateNodeData(id, { outputName: currName, outputType });
  }, [currName, outputType, id, updateNodeData]);

  return (
    <BaseNode
      title="Output"
      subtitle="Pipeline exit"
      accentColor="#f97316"
      data={data}
      inputs={[{ id: `${id}-value`, color: '#f97316' }]}
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
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
