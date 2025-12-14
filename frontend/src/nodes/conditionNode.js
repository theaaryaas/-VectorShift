import { useEffect, useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const ConditionNode = ({ id, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const [field, setField] = useState(data?.field || 'score');
  const [operator, setOperator] = useState(data?.operator || '>');
  const [value, setValue] = useState(data?.value || '0.5');

  useEffect(() => {
    updateNodeData(id, { field, operator, value });
  }, [id, field, operator, value, updateNodeData]);

  return (
    <BaseNode
      title="Condition"
      subtitle="Branching"
      accentColor="#facc15"
      data={data}
      inputs={[{ id: `${id}-input`, color: '#facc15' }]}
      outputs={[
        { id: `${id}-true`, color: '#22c55e' },
        { id: `${id}-false`, color: '#ef4444' },
      ]}
    >
      <div className="form-grid">
        <label className="label">
          Field
          <input
            className="input"
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
          />
        </label>
        <label className="label">
          Operator
          <select
            className="input"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value="==">==</option>
            <option value=">=">&gt;=</option>
            <option value="<=">&lt;=</option>
          </select>
        </label>
        <label className="label">
          Value
          <input
            className="input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
      </div>
    </BaseNode>
  );
};

