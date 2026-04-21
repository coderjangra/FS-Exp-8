import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Layout from './components/Layout';
import Actions from './components/Actions';
import Tests from './components/Tests';
import Deploy from './components/Deploy';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/FS-Exp-8/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Actions />} />
            <Route path="tests" element={<Tests />} />
            <Route path="deploy" element={<Deploy />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
