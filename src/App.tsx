

// import { TimePicker } from '@mui/x-date-pickers';
import { BrowserRouter } from 'react-router'
import { Routes, Route } from "react-router";
import './App.css'
import Homepage from './components/Homepage';
import GetStartedPage from './components/GetStarted';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/getStarted" element={<GetStartedPage />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
