import React from 'react'
import ReactDOM from 'react-dom/client'
import { EditorPage } from '@/pages/editor'
import './init'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EditorPage/>
  </React.StrictMode>,
)
