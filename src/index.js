import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// --- ¡ESTA ES LA LÍNEA QUE TE FALTA! ---
// Sin esto, Mantine no carga ningún estilo y todo se ve roto.
import '@mantine/core/styles.css'; 
// ---------------------------------------

import { MantineProvider } from '@mantine/core';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* En la versión 7 ya no se usa "withGlobalStyles", solo el Provider básico */}
    <MantineProvider defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </React.StrictMode>
);