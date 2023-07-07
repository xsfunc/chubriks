import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { Pages } from '@/pages'
import { theme } from '@/shared/config'

import './init'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode='dark' theme={theme}>
      <CssBaseline />
      <Pages/>
    </CssVarsProvider>
  </React.StrictMode>,
)
