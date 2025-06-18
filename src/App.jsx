import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Homepage';
import Recruiterlogin from './pages/recruiter/Recruiterlogin';
import RecruiterRegister from './pages/recruiter/Recruiterregister.jsx';
import Dashboard from './pages/recruiter/Dashboard';
import Resultspage from './pages/recruiter/Resultspage';
import CreateInterview from './pages/recruiter/Createinterview';
import Candidatelogin from './pages/candidate/Candidatelogin';
import Chatinterface from './pages/candidate/Chatinterface'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recruiter/Recruiterlogin" element={<Recruiterlogin/>}/>
        <Route path="/recruiter/RecruiterRegister" element={<RecruiterRegister/>}/>
        <Route path="/recruiter/Dashboard" element={<Dashboard/>}></Route>
        <Route path="/recruiter/Resultspage/:id" element={<Resultspage/>}></Route>
        <Route path="/recruiter/Createinterview" element={<CreateInterview/>}></Route>
        <Route path="/candidate/Candidatelogin" element={<Candidatelogin/>}></Route>
        <Route path ="/candidate/Chatinterface" element={<Chatinterface/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

