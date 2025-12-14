// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="draggable-node"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '110px', 
          height: '64px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '12px',
          backgroundColor: '#0f172a',
          border: '1px solid #334155',
          justifyContent: 'center', 
          flexDirection: 'column',
          color: '#e2e8f0',
          boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
          transition: 'transform 120ms ease, border-color 120ms ease',
        }} 
        draggable
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#38bdf8')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#334155')}
      >
          <span style={{ color: '#fff' }}>{label}</span>
      </div>
    );
  };
  