// toolbar.js

import { DraggableNode } from './draggableNode';

const groups = [
  {
    title: 'Core',
    items: [
      { type: 'customInput', label: 'Input' },
      { type: 'llm', label: 'LLM' },
      { type: 'text', label: 'Text' },
      { type: 'customOutput', label: 'Output' },
    ],
  },
  {
    title: 'Advanced',
    items: [
      { type: 'markdown', label: 'Markdown' },
      { type: 'http', label: 'HTTP' },
      { type: 'condition', label: 'Condition' },
      { type: 'delay', label: 'Delay' },
      { type: 'embed', label: 'Embedding' },
    ],
  },
];

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-header">
        <div>
          <div className="title">VectorShift Pipeline Builder</div>
          <div className="subtitle">Drag nodes onto the canvas</div>
        </div>
      </div>

      <div className="toolbar-groups">
        {groups.map((group) => (
          <div key={group.title}>
            <div className="group-title">{group.title}</div>
            <div className="node-grid">
              {group.items.map((item) => (
                <DraggableNode key={item.type} type={item.type} label={item.label} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
