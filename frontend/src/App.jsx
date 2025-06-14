import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage.jsx';

function App() {

  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>

  )
}

export default App
