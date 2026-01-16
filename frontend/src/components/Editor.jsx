function Editor({ code, setCode }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      border: '1px solid #ccc',
      padding: '10px'
    }}>
      <h3>HMSCC Source Code</h3>
      <textarea
        style={{
          flex: 1,
          resize: 'none',
          fontFamily: 'monospace',
          fontSize: '14px',
          padding: '10px',
          border: '1px solid #999'
        }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </div>
  )
}

export default Editor
