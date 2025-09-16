import React from "react";
import "./css/home.css";
import BgHome from "../../src/imagens/backgrounds/BgHome.png"
import CardsHome from "./partials/CardsHome";

function home() {
  const heroStyle = {
        backgroundImage: `url(${BgHome})`,
        backgroundSize: 'cover',
        backgroundPosition: '',
        backgroundRepeat: 'no-repeat',
        height: '500  px',
        padding: '2rem',
        color: '#fff',
        borderRadius: '8px',
  };
  return (
    <div className="conteudo-home">
      <section className="hero" style={heroStyle}>
        <h2>Bem-vindo ao Hospício do Zikaloka!</h2>
        <p>Onde a diversão nunca acaba e a competição está sempre no auge.</p>
        <a href="/inscricao/copahspc" className="btn">
          Inscreva-se na Copa Hospic
        </a>
      </section>
      <CardsHome />
    </div>
  );
}

export default home;
