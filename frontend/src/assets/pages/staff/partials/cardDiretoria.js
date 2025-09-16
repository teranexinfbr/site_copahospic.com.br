import React, {useState, useEffect } from 'react';
import "../css/staff.css"
import axios from 'axios'

function CardDiretoria() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get_staff.php?cargo=Desenvolvedor   ');
                setMembers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar membros:', error);
                setError('Erro ao carregar membros. Tente novamente mais tarde.');
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
      <div className="cards-staff-diretoria">
        {members.map((member) => (
          <div key={member.id} className="card-staff">
              <div className="staff-info">
                  <h5>{member.nome} "{member.nick}" {member.sobrenome}</h5>
                  <p><strong>Cargo:</strong> {member.cargo || 'Não especificado'}</p>
                  <p>{member.descricao}</p>
              </div>
              <div className="foto-staff">
                  {/* Usa imagem (base64) se disponível, senão foto_link */}
                  {member.imagem ? (
                      <img src={member.imagem} alt={`Imagem de ${member.nick}`} />
                  ) : member.foto_link ? (
                      <img src={member.foto_link} alt={`Foto de ${member.nick}`} />
                  ) : (
                      <p>Sem imagem disponível</p>
                  )}
              </div>
              <div className="nome-staff">
                  <h4>{member.nick}</h4>
              </div>
              <div className="link-staff">
                  {member.twitch_link && (
                      <a href={member.twitch_link} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-twitch" />
                      </a>
                  )}
                  {member.instagram_link && (
                      <a href={member.instagram_link} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-instagram" />
                      </a>
                  )}
                  {member.steam_link && (
                      <a href={member.steam_link} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-steam" />
                      </a>
                  )}
              </div>
          </div>
        ))}
      </div>
    );
  }


export default CardDiretoria