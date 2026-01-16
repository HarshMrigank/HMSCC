function Section({ title, bg, color, content }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <h3>{title}</h3>
      <pre style={{
        background: bg,
        color: color,
        padding: '10px',
        minHeight: '80px'
      }}>
        {content}
      </pre>
    </div>
  )
}

function OutputPanel({ output, errors, generatedC }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #ccc',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Section
        title="Compiler Output"
        bg="#111"
        color="#0f0"
        content={output || 'No output yet'}
      />
      <Section
        title="Errors"
        bg="#300"
        color="#f88"
        content={errors || 'No errors'}
      />
      <Section
        title="Generated C Code"
        bg="#222"
        color="#fff"
        content={generatedC || 'Not generated yet'}
      />
    </div>
  )
}

export default OutputPanel
