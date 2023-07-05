import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { EditorPage } from '@/pages/editor'

import './init'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider>
      <CssBaseline />
      <EditorPage />
    </CssVarsProvider>
  </React.StrictMode>,
)
