// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Funções para a tabela Ferramenta
export const getFerramentas = async () => {
  try {
    const response = await api.get('/Ferramenta');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar ferramentas:', error);
    throw error;
  }
};

export const addFerramenta = async (ferramentaData) => {
  try {
    // ferramentaData agora deve conter: { Nome, Tipo, Disponibilidade, Localizacao }
    const response = await api.post('/Ferramenta', ferramentaData);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar ferramenta:', error);
    throw error;
  }
};

export const updateFerramenta = async (codigo, ferramentaData) => {
  try {
    // ferramentaData agora deve conter: { Nome, Tipo, Disponibilidade, Localizacao }
    const response = await api.put(`/Ferramenta/${codigo}`, ferramentaData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar ferramenta:', error);
    throw error;
  }
};

export const deleteFerramenta = async (codigo) => {
  try {
    const response = await api.delete(`/Ferramenta/${codigo}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar ferramenta:', error);
    throw error;
  }
};

// Funções para outras tabelas (exemplo)
export const getDepartamentos = async () => {
    try {
        const response = await api.get('/Departamento');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar departamentos:', error);
        throw error;
    }
};

export const getFuncionarios = async () => {
    try {
        const response = await api.get('/Funcionario');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
        throw error;
    }
};

export default api;