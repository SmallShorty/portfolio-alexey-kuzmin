import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {SkeletonTheme} from "react-loading-skeleton";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <SkeletonTheme baseColor="#11111" highlightColor="#444">
          <App />
      </SkeletonTheme>
  </React.StrictMode>,
)
