import React from 'react'

function CardsHome() {
  return (
    <>
    <section className="highlights">
        <article className="highlight-item item1 ">
          <h3>Copa Hospic</h3>
          <p>Acesse e saiba mais sobre o nosso campeonato.</p>
          <a href="copa_hospic.html">Mais detalhes</a>
        </article>
        <article className="highlight-item item2">
          <h3>Times</h3>
          <p>
            Conheça os Times inscritos na Copa Hospic.
          </p>
          <a href="staff.html">Times inscritos</a>
        </article>
        <article className="highlight-item item3">
          <h3>HSTV</h3>
          <p>Confira nossos streams e vídeos mais recentes.</p>
          <a href="hstv.html">Assista agora</a>
        </article>
      </section>
    </>
  )
}

export default CardsHome