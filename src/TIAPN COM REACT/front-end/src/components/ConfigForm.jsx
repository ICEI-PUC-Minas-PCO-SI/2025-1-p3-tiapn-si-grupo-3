import React, { useState } from "react";
import {updateConfig} from "./../services/api.js";

function ConfigForm() {
  const [formData, setFormData] = useState({
    currentUsername: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentUsername, currentPassword, newPassword, confirmPassword } =
      formData;

    if (newPassword !== confirmPassword) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    try {
      const processedData = {
        Email: currentUsername,
        Senha: newPassword,
      };

      const response = await updateConfig(processedData);

      /*if (!response.ok) {
        setMensagem(data.message || "Erro ao alterar a senha.");
      } else {
        setMensagem(data.message);
        setFormData({
          currentUsername: "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }*/
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao se comunicar com o servidor.");
    }
  };

  return (
    <div className="config-container">
      <h2>Configurações da Conta</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="currentUsername">E-mail Atual:</label>
        <input
          type="text"
          id="currentUsername"
          name="currentUsername"
          value={formData.currentUsername}
          onChange={handleChange}
          required
        />

        <label htmlFor="currentPassword">Senha Atual:</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />

        <label htmlFor="newPassword">Nova Senha:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword">Confirmar Nova Senha:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button id="btn-salvar-senha" type="submit">
          Salvar Alterações
        </button>
      </form>

      <div id="mensagem">{mensagem}</div>
    </div>
  );
}

export default ConfigForm;
