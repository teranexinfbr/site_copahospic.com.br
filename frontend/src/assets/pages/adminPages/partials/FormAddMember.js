import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/partials/FormMember.css";

const FormAddMember = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [nick, setNick] = useState('');
  const [cargoId, setCargoId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [steamLink, setSteamLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [twitchLink, setTwitchLink] = useState('');
  const [imagem, setImagem] = useState(null);
  const [cargos, setCargos] = useState([]);
  const [loadingCargos, setLoadingCargos] = useState(true);
  const [error, setError] = useState(null);

  // Carregar cargos do backend
  useEffect(() => {
    const fetchCargos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get_cargos.php');
        setCargos(response.data);
        setLoadingCargos(false);
      } catch (err) {
        console.error('Erro ao carregar cargos:', err);
        setError('Erro ao carregar cargos.');
        setLoadingCargos(false);
      }
    };
    fetchCargos();
  }, []);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('sobrenome', sobrenome);
    formData.append('nick', nick);
    formData.append('cargo_id', cargoId);
    formData.append('descricao', descricao);
    formData.append('steam_link', steamLink);
    formData.append('instagram_link', instagramLink);
    formData.append('twitch_link', twitchLink);

    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      await axios.post('http://localhost:8000/api/add_staff.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Membro adicionado com sucesso!');
      // Limpar formulário
      setNome('');
      setSobrenome('');
      setNick('');
      setCargoId('');
      setDescricao('');
      setSteamLink('');
      setInstagramLink('');
      setTwitchLink('');
      setImagem(null);
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao adicionar membro.');
    }
  };

  if (loadingCargos) {
    return <div>Carregando cargos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="conteudo-panel">
      <div className="titulo-pagina">
        <h2>Adicione um membro na tela de Staff</h2>
      </div>
      <div className="caixa-form">
        <div className="div-form">
          <div className="titulo-form">
            <h3>Informações do membro</h3>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-nome">
              <label className="div-label">Nome:</label>
              <input 
                type="text"
                placeholder="Informe o Primeiro nome..." 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                required
              />
            </div>
            <div className="form-label">
              <label className="div-label">Sobrenome:</label>
              <input 
                type="text" 
                placeholder="Informe UM Sobrenome..."
                value={sobrenome} 
                onChange={(e) => setSobrenome(e.target.value)} 
                required
              />
            </div>
            <div className="form-label">
              <label className="div-label">Nick:</label>
              <input 
                type="text"
                placeholder="Informe o Nickname..." 
                value={nick} 
                onChange={(e) => setNick(e.target.value)} 
                required
              />
            </div>
            <div className="form-label">
              <label className="div-label">Cargo:</label>
              <select
                value={cargoId}
                onChange={(e) => setCargoId(e.target.value)}
                required
              >
                <option value="" disabled>Selecione o Cargo</option>
                {cargos.map((cargo) => (
                  <option key={cargo.id} value={cargo.id}>
                    {cargo.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-label">
              <label className="div-label">Link Steam:</label>
              <input 
                type="url"
                placeholder="Informe o link da conta steam..." 
                value={steamLink} 
                onChange={(e) => setSteamLink(e.target.value)} 
              />
            </div>
            <div className="form-label">
              <label className="div-label">Link Instagram:</label>
              <input 
                type="url"
                placeholder="Informe o link do instagram..." 
                value={instagramLink} 
                onChange={(e) => setInstagramLink(e.target.value)} 
              />
            </div>
            <div className="form-label">
              <label className="div-label">Link Twitch:</label>
              <input 
                type="url"
                placeholder="Informe o link da twitch..." 
                value={twitchLink} 
                onChange={(e) => setTwitchLink(e.target.value)} 
              />
            </div>
            <div className="form-label">
              <label className="div-label">Descrição:</label>
              <textarea
                placeholder="Envie uma pequena descrição..." 
                value={descricao} 
                onChange={(e) => setDescricao(e.target.value)} 
              />
            </div>
            <div className="form-label">
              <label className="div-label">Imagem:</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImagem(e.target.files[0])} 
              />
            </div>
            <button className="butao" type="submit">
              Adicionar Membro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddMember;