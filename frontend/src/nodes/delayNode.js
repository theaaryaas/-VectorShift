import { useEffect, useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const DelayNode = ({ id, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const [ms, setMs] = useState(data?.ms || 500);

  useEffect(() => {
    updateNodeData(id, { ms });
  }, [id, ms, updateNodeData]);

  return (
    <BaseNode
      title="Delay"
      subtitle="Throttle"
      accentColor="#7c3aed"
      data={data}
      inputs={[{ id: `${id}-input`, color: '#a855f7' }]}
      outputs={[{ id: `${id}-output`, color: '#7c3aed' }]}
    >
      <div className="form-grid single">
        <label className="label">
          Duration (ms)
          <input
            className="input"
            type="number"
            min="0"
            step="100"
            value={ms}
            onChange={(e) => setMs(Number(e.target.value))}
          />
        </label>
      </div>
    </BaseNode>
  );
};

