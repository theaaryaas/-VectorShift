import { useEffect, useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const EmbedNode = ({ id, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const [dimension, setDimension] = useState(data?.dimension || 768);
  const [provider, setProvider] = useState(data?.provider || 'openai');

  useEffect(() => {
    updateNodeData(id, { dimension, provider });
  }, [id, dimension, provider, updateNodeData]);

  return (
    <BaseNode
      title="Embedding"
      subtitle="Vectorize text"
      accentColor="#10b981"
      data={data}
      inputs={[
        { id: `${id}-text`, color: '#22c55e' },
        { id: `${id}-meta`, color: '#2dd4bf' },
      ]}
      outputs={[{ id: `${id}-vector`, color: '#10b981' }]}
    >
      <div className="form-grid">
        <label className="label">
          Provider
          <select
            className="input"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value="openai">OpenAI</option>
            <option value="cohere">Cohere</option>
            <option value="hf">Hugging Face</option>
          </select>
        </label>
        <label className="label">
          Dimension
          <input
            className="input"
            type="number"
            min="64"
            step="64"
            value={dimension}
            onChange={(e) => setDimension(Number(e.target.value))}
          />
        </label>
      </div>
    </BaseNode>
  );
};

