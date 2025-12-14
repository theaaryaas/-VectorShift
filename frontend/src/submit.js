// submit.js

import { useState } from 'react';
import { useStore } from './store';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/pipelines/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      alert(
        `Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag ? 'Yes' : 'No'}`
      );
    } catch (error) {
      alert('Submission failed. Is the backend running on port 8000?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-bar">
      <div>
        <div className="subtitle">Click to validate your pipeline</div>
      </div>
      <button className="primary-btn" type="button" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit to Backend'}
      </button>
    </div>
  );
};
