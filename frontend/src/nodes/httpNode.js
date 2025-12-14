import { useEffect, useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const HttpNode = ({ id, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');

  useEffect(() => {
    updateNodeData(id, { method, url });
  }, [id, method, url, updateNodeData]);

  return (
    <BaseNode
      title="HTTP"
      subtitle="Call API"
      accentColor="#06b6d4"
      data={data}
      inputs={[
        { id: `${id}-headers`, color: '#0ea5e9' },
        { id: `${id}-body`, color: '#22d3ee' },
      ]}
      outputs={[{ id: `${id}-response`, color: '#06b6d4' }]}
    >
      <div className="form-grid">
        <label className="label">
          Method
          <select
            className="input"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </label>
        <label className="label">
          URL
          <input
            className="input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
      </div>
    </BaseNode>
  );
};

