import { useState } from 'react'
import Editor from './components/Editor'
import OutputPanel from './components/OutputPanel'
import { compileCode } from './services/api'

function App() {
  const [code, setCode] = useState(
`int main() {
  print("Hello HMSCC");
  return 0;
}`
  )

  const [output, setOutput] = useState('')
  const [errors, setErrors] = useState('')
  const [generatedC, setGeneratedC] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCompile() {
    setLoading(true)
    setOutput('')
    setErrors('')
    setGeneratedC('')

    try {
      const result = await compileCode(code);
      console.log('HMSCC backend response:', result);

      setOutput(
        result.stdout ||
        result.output ||
        ''
      );

      setErrors(
        result.stderr ||
        result.errors ||
        ''
      );

      setGeneratedC(
        result.generatedC ||
        result.cCode ||
        result.code ||
        ''
      );

    } catch (err) {
      setErrors(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <header style={{
        padding: '12px 16px',
        background: '#222',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>HMSCC — Web Interface</span>
        <button
          onClick={handleCompile}
          disabled={loading}
          style={{
            padding: '6px 12px',
            fontFamily: 'monospace',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Compiling...' : 'Compile'}
        </button>
      </header>

      {/* Main Layout */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        padding: '12px'
      }}>
        <Editor code={code} setCode={setCode} />
        <OutputPanel
          output={output}
          errors={errors}
          generatedC={generatedC}
        />
      </div>

    </div>
  )
}

export default App
