import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './themes/ThemeProvider'
import NavigationBar from './components/NavigationBar'
import EditorPage from './pages/EditorPage'
import DocumentationPage from './pages/DocumentationPage'
import AboutPage from './pages/AboutPage'
import HelpPage from './pages/HelpPage'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<EditorPage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
