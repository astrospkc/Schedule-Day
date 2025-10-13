

// import { TimePicker } from '@mui/x-date-pickers';
import { BrowserRouter } from 'react-router'
import { Routes, Route } from "react-router";
import './App.css'
import Homepage from './components/Homepage';
import GetStartedPage from './components/GetStarted';
import Dashboard from './components/Dashboard';
import { useUserStore } from './store/useUserStore';


function App() {

  const { isAuthenticated } = useUserStore()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/getStarted" element={<GetStartedPage />} />
          {
            isAuthenticated && (
              <Route path="/dashboard" element={<Dashboard />} />
            )
          }

        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
