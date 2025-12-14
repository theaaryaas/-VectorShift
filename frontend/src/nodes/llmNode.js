// llmNode.js

import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      title="LLM"
      subtitle="Prompt + System"
      accentColor="#a855f7"
      data={data}
      inputs={[
        { id: `${id}-system`, color: '#a855f7' },
        { id: `${id}-prompt`, color: '#c084fc' },
      ]}
      outputs={[{ id: `${id}-response`, color: '#a855f7' }]}
    >
      <div className="badge">Model call</div>
      <div className="hint">Connect system + prompt to generate a response.</div>
    </BaseNode>
  );
};
