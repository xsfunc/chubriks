import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { Pages } from '@/pages'
import { configApi } from '@/shared/config'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode='dark' theme={configApi.theme}>
      <CssBaseline />
      <Pages/>
    </CssVarsProvider>
  </React.StrictMode>,
)
