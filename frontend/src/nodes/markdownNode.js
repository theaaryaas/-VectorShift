import { useEffect, useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const MarkdownNode = ({ id, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const [title, setTitle] = useState(data?.title || 'Document');
  const [theme, setTheme] = useState(data?.theme || 'light');

  useEffect(() => {
    updateNodeData(id, { title, theme });
  }, [id, title, theme, updateNodeData]);

  return (
    <BaseNode
      title="Markdown"
      subtitle="Render text"
      accentColor="#3b82f6"
      data={data}
      inputs={[{ id: `${id}-markdown`, color: '#3b82f6' }]}
      outputs={[{ id: `${id}-html`, color: '#3b82f6' }]}
    >
      <div className="form-grid">
        <label className="label">
          Title
          <input
            className="input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="label">
          Theme
          <select
            className="input"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="contrast">High contrast</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};

