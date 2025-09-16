import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/partials/FormMember.css";

const FormEditMember = () => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [nick, setNick] = useState("");
  const [cargoId, setCargoId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [steamLink, setSteamLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitchLink, setTwitchLink] = useState("");
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

  // Função para buscar membro pelo ID
  const handleFetchMember = async () => {
    if (!id || isNaN(id)) {
      alert("Por favor, insira um ID válido.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/get_staff.php?id=${id}`);
      
      if (response.data && response.data.length > 0) {
        const member = response.data[0];
        setNome(member.nome || "");
        setSobrenome(member.sobrenome || "");
        setNick(member.nick || "");
        // Mapear cargo (nome) para cargo_id
        const cargo = cargos.find(c => c.nome === member.cargo);
        setCargoId(cargo ? cargo.id : "");
        setDescricao(member.descricao || "");
        setSteamLink(member.steam_link || "");
        setInstagramLink(member.instagram_link || "");
        setTwitchLink(member.twitch_link || "");
      } else {
        alert("Nenhum membro encontrado para o ID fornecido.");
      }
    } catch (error) {
      console.error("Erro ao buscar o membro:", error);
      alert("Erro ao buscar o membro. Verifique o console para mais detalhes.");
    }
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
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
      await axios.post('http://localhost:8000/api/update_staff.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Membro atualizado com sucesso!');
      // Limpar formulário
      setId("");
      setNome("");
      setSobrenome("");
      setNick("");
      setCargoId("");
      setDescricao("");
      setSteamLink("");
      setInstagramLink("");
      setTwitchLink("");
      setImagem(null);
    } catch (error) {
      console.error('Erro ao atualizar o membro:', error);
      alert('Erro ao atualizar o membro. Verifique o console para mais detalhes.');
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
        <h2>Editar informações do membro</h2>
      </div>
      <div className="caixa-form">
        <div className="div-form">
          <div className="titulo-form">
            <h3>Buscar e editar membro</h3>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-label">
              <label className="div-label">ID do Membro:</label>
              <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Digite o ID do membro"
                required
              />
              <button
                type="button"
                onClick={handleFetchMember}
                className="botao-pesquisar"
              >
                Buscar Membro
              </button>
            </div>
            <div className="form-nome">
              <label className="div-label">Nome:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="form-label">
              <label className="div-label">Sobrenome:</label>
              <input
                type="text"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                required
              />
            </div>
            <div className="form-label">
              <label className="div-label">Nick:</label>
              <input
                type="text"
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
                value={steamLink}
                onChange={(e) => setSteamLink(e.target.value)}
              />
            </div>
            <div className="form-label">
              <label className="div-label">Link Instagram:</label>
              <input
                type="url"
                value={instagramLink}
                onChange={(e) => setInstagramLink(e.target.value)}
              />
            </div>
            <div className="form-label">
              <label className="div-label">Link Twitch:</label>
              <input
                type="url"
                value={twitchLink}
                onChange={(e) => setTwitchLink(e.target.value)}
              />
            </div>
            <div className="form-label">
              <label className="div-label">Descrição:</label>
              <textarea
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
              Atualizar Membro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormEditMember;