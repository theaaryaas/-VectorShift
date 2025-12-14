import { Handle, Position } from 'reactflow';

const handleStyle = (accentColor) => ({
  background: accentColor || '#4f46e5',
  border: 'none',
  width: 10,
  height: 10,
});

const cardStyle = (accentColor, customStyle = {}) => ({
  minWidth: 220,
  maxWidth: 360,
  background: '#0f172a',
  color: '#e2e8f0',
  border: `1px solid ${accentColor || '#334155'}`,
  borderRadius: 12,
  boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
  padding: '12px 14px',
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  ...customStyle,
});

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 8,
  gap: 8,
};

const titleStyle = { fontSize: 16, fontWeight: 700 };
const subtitleStyle = { fontSize: 12, color: '#94a3b8' };
const descriptionStyle = { marginTop: 6, fontSize: 12, color: '#cbd5e1' };

const renderHandles = (items = [], type) =>
  items.map((item, idx) => (
    <Handle
      key={`${type}-${item.id}`}
      type={type}
      position={type === 'target' ? Position.Left : Position.Right}
      id={item.id}
      style={{
        ...handleStyle(item.color),
        top: `${((idx + 1) * 100) / (items.length + 1)}%`,
      }}
    />
  ));

export const BaseNode = ({
  title,
  subtitle,
  accentColor,
  inputs = [],
  outputs = [],
  children,
  data,
  cardStyleOverride,
}) => {
  const displayTitle = data?.displayName?.trim() || title;
  const description = data?.description?.trim();

  return (
    <div style={cardStyle(accentColor, cardStyleOverride)}>
      {renderHandles(inputs, 'target')}
      <div style={headerStyle}>
        <div>
          <div style={titleStyle}>{displayTitle}</div>
          {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
        </div>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: accentColor || '#4f46e5',
            opacity: 0.9,
          }}
        />
      </div>
      {description && <div style={descriptionStyle}>{description}</div>}
      <div>{children}</div>
      {renderHandles(outputs, 'source')}
    </div>
  );
};

