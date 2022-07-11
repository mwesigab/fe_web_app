import * as React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Index from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoDetails from './components/todo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="items/:itemId" element={<TodoDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
