// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import './index.css'
import App from './App.jsx'
import store from './store.js';
// import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
// AG Grid 필수 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
