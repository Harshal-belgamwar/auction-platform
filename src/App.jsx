// src/App.jsx
// Updated to wrap AppRouter with BrowserRouter for routing
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '@/routes/AppRouter';
import '@/index.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
        }}
      />
    </BrowserRouter>
  );
}

export default App;
