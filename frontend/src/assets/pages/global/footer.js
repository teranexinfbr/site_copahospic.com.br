import React from 'react'
import './css/footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <footer className="footer">
        <section id="social-container">
            <div className="social-icons">
            <a href="https://instagram.com/hospicdozika" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-instagram" />
            </a>
            <a href="https://x.com/hospicdozika" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-twitter" />
            </a>
            <a href="https://twitch.tv/zikaloka_twitchtv" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-twitch" />
            </a>
            <a href="https://discord.gg/skN44GQfzx" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-discord" />
            </a>
            <a href="https://www.youtube.com/@zikaloka" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-youtube" />
            </a>
            </div>
            <div className="copyrights">
            <p>© 2025 TeraNex Dev. Todos os Direitos Reservados.</p>
            <Link
            to='/politicas-de-privacidade'>
                Politicas de Privacidade
            </Link>
            <Link
            to='/termos-de-uso' >
                Termos de Uso
            </Link>
            </div>
        </section>
    </footer>

    </>
  )
}

export default Footer