import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// #region agent log
fetch('http://127.0.0.1:7242/ingest/daf99957-b629-4142-b58b-27d872752052', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 'log_main_1',
    runId: 'pre-fix',
    hypothesisId: 'H1',
    location: 'src/main.jsx:6',
    message: 'Entering main.jsx before React root render',
    data: {},
    timestamp: Date.now(),
  }),
}).catch(() => {});
// #endregion

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
