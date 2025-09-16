import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importação correta
import Header from './assets/pages/global/header';
import Footer from './assets/pages/global/footer';  
import Home from './assets/pages/home/home';
import Staff from './assets/pages/staff/staff';
import Campeonatos from './assets/pages/campeonatos/campeonatos';
import CopaHospic from './assets/pages/campeonatos/partials/CopaHospic';
import AdminPanel from './assets/pages/adminPages/AdminPanel';
import PoliticaDePrivacidade from './assets/pages/global/politica_de_privacidade';
import TermoDeUso from './assets/pages/global/termos_de_uso';


function App() {
  return (

    <Router>
      <Header />
      <main className='main-conteudo'>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/staff" element={<Staff />} />
          <Route path="/campeonatos" element= {<Campeonatos/>} />
          <Route path="/politicas-de-privacidade" element={<PoliticaDePrivacidade/> }/>
          <Route path="/termos-de-uso" element={<TermoDeUso />} />
          <Route path="/campeonatos/copahospic" element={<CopaHospic />} />
          <Route path="/painel" element={< AdminPanel/>} />
        </Routes>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
