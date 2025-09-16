import React from "react";
import "../css/partials/CardCampeonatos.css"
import { Link } from 'react-router-dom';


function CardCampeonatos() {
  return (
    <div className="conteudo-card-camp">
      <div className="cards-camp">
        <div className="card-camp copa-hospic">
          <div className="foto-camp copa-hospic-cs2">
            <img src="" alt="" />
          </div>
          <div className="nome-camp">
            <Link to="/campeonatos/copahospic" className="camp-page">
              {" "}
              <h4>Qualify Copa Hospic 3ª Edição</h4>
            </Link>
          </div>
          <div className="info-camp">
            <div className="descricao-camp">
              <div className="descricao-item">
              <i class="bi bi-shield-fill"></i>
                <p>4 Times</p>
              </div>
              <div className="descricao-item">
              <i class="bi bi-currency-dollar"></i>
                <p>1 Vaga p/ camp Principal</p>
              </div>
              <div className="descricao-item">
              <i class="bi bi-tv-fill"></i>
                <p>Transmissão ao vivo</p>
              </div>
            </div>
            <div className="data-camp">
              <i className="bi bi-calendar-date" />{" "}
              <h5> De: 7 de junho à 11 de Junho</h5>
            </div>
            <Link to="/inscricao/copahspc">
                <button className="bttn-inscricao-copa"> Inscreva-se </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="cards-camp">
        <div className="card-camp copa-hospic">
          <div className="foto-camp copa-hospic-cs2">
            <img src="" alt="" />
          </div>
          <div className="nome-camp">
            <Link to="/campeonatos/copahospic" className="camp-page">
              {" "}
              <h4>Copa Hospic 3ª Edição</h4>
            </Link>
          </div>
          <div className="info-camp">
            <div className="descricao-camp">
              <div className="descricao-item">
              <i class="bi bi-shield-fill"></i>
                <p>8 Times</p>
              </div>
              <div className="descricao-item">
              <i class="bi bi-currency-dollar"></i>
                <p>R$500 em Premiações</p>
              </div>
              <div className="descricao-item">
              <i class="bi bi-tv-fill"></i>
                <p>Transmissão ao vivo</p>
              </div>
            </div>
            <div className="data-camp">
              <i className="bi bi-calendar-date" />{" "}
              <h5> De: 7 de junho à 11 de Junho</h5>
            </div>
            <Link to="/inscricao/copahspc" >
                <button className="bttn-inscricao-copa"> Inscreva-se </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCampeonatos;
