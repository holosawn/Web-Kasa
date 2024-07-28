import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  
  const { worker } = await import('./mocks/browser')
  
  // restartOnTerminate to restart worker after long waits in a page 
  return worker.start()
  
}


enableMocking().then(()=>{
  root.render(
      <App />
  );
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
