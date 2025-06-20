import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Recruiterlogin from './pages/recruiter/Recruiterlogin';
import RecruiterRegister from './pages/recruiter/Recruiterregister.jsx';
import Dashboard from './pages/recruiter/Dashboard';
import Resultspage from './pages/recruiter/Resultspage';
import CreateInterview from './pages/recruiter/Createinterview';
import Candidatelogin from './pages/candidate/Candidatelogin';
import Chatinterface from './pages/candidate/Chatinterface';
import Verify from "./pages/verify.jsx";
import CandidatesRules from './pages/candidate/CandidatesRules';
import CandidatesFinish from './pages/candidate/CandidateFinish';
import CandidatesThankYou from './pages/candidate/CandidateThankYou';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Recruiterlogin />} />
        <Route path="/recruiter/Recruiterlogin" element={<Recruiterlogin/>}/>
        <Route path="/recruiter/RecruiterRegister" element={<RecruiterRegister/>}/>
        <Route path="/recruiter/Dashboard" element={<Dashboard/>}></Route>
        <Route path="/recruiter/Resultspage/:id" element={<Resultspage/>}></Route>
        <Route path="/recruiter/Createinterview" element={<CreateInterview/>}></Route>
        <Route path="/candidate/Candidatelogin" element={<Candidatelogin/>}></Route>
       <Route path="/interview/:id" element={<Candidatelogin />} />
        <Route path ="/candidate/Chatinterface" element={<Chatinterface/>}></Route>
        <Route path="/verify" element={<Verify />} />
         <Route path ="/candidate/CandidatesRules" element={<CandidatesRules/>}></Route>
         <Route path="/candidate/CandidatesFinish" element={<CandidatesFinish/>}></Route>
          <Route path="/candidate/CandidatesThankYou" element={<CandidatesThankYou/>}></Route>
          
      </Routes>
    </BrowserRouter>
  );
}

