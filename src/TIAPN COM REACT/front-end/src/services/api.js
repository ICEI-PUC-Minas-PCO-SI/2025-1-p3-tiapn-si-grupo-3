// frontend/src/services/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const updateConfig = async (processedData) => {

  try {

    const response = await api.put(`/Configuracao`, processedData);
    return response.data;

  } catch (error) {

    console.log("Erro ao atualizar senha:", error);
  }
};

// Funções para a tabela Ferramenta
export const getFerramentas = async () => {
  try {
    const response = await api.get("/Ferramenta");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar ferramentas:", error);
    throw error;
  }
};

export const addFerramenta = async (ferramentaData) => {
  try {
    // ferramentaData agora deve conter: { Nome, Tipo, Disponibilidade, Localizacao }
    const response = await api.post("/Ferramenta", ferramentaData);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar ferramenta:", error);
    throw error;
  }
};

export const updateFerramenta = async (codigo, ferramentaData) => {
  try {
    // ferramentaData agora deve conter: { Nome, Tipo, Disponibilidade, Localizacao }
    const response = await api.put(`/Ferramenta/${codigo}`, ferramentaData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar ferramenta:", error);
    throw error;
  }
};

export const deleteFerramenta = async (codigo) => {
  try {
    const response = await api.delete(`/Ferramenta/${codigo}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar ferramenta:", error);
    throw error;
  }
};

export const getEmprestimos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Emprestimos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar empréstimos:", error);
    throw error; // Propaga o erro para ser tratado no componente
  }
};

export const getEventos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Eventos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao eventos:", error);
    throw error;
  }
};

export const addEvento = async (eventoData) => {
  try {
    const response = await api.post("/Eventos", eventoData);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar evento:", error);
    throw error;
  }
};

export const updateEvento = async (codigo, eventoData) => {
  try {
    const response = await api.put(`/Eventos/${codigo}`, eventoData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    throw error;
  }
};

export const deleteEvento = async (codigo) => {
  try {
    const response = await api.delete(`/Eventos/${codigo}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar evento:", error);
    throw error;
  }
};

// Funções para outras tabelas (exemplo)
export const getDepartamentos = async () => {
  try {
    const response = await api.get("/Departamento");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar departamentos:", error);
    throw error;
  }
};

export const getFuncionarios = async () => {
  try {
    const response = await api.get("/Funcionario");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar funcionários:", error);
    throw error;
  }
};

// Rotas para Lembrete
// GET /Lembrete

export const getLembrete = async () => {
  try {
    const response = await api.get("/Lembrete");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar lembretes aqui:", error);
    throw error;
  }
};

export const postLembrete = async (observacao, administrador_codigo) => {
  try {
    const response = await api.post(
      `/Lembrete`,
      observacao,
      administrador_codigo
    );
    return response.data;
  } catch (erro) {
    console.log(erro);
  }
};

export const deleteLembrete = async (codigo) => {
  try {
    const response = await api.delete(`/Lembrete/${codigo}`);
  } catch (err) {
    console.err("Erro ao deletar lembrete:", err);
    throw err;
  }
};

export const getEmprestimo = async () => {
  try {
    const response = await api.get("/ListaEmprestimos");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar emprestimo atrasado:", error);
    throw error;
  }
};

export const getEmprestimoAtrasado = async () => {
  try {
    const response = await api.get("/EmprestimoAtrasado");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar emprestimo atrasado:", error);
    throw error;
  }
};

export const getEmprestimoFuncionario = async () => {
  try {
    const response = await api.get("/EmprestimoFuncionario");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar emprestimo:", error);
    throw error;
  }
};

export const deleteEmprestimo = async (codigo) => {
  try {
    const response = await api.delete(`/Emprestimo/${codigo}`);
  } catch (err) {
    console.log("Erro ao deletar emprestimo:", err);
    throw err;
  }
};

export const postEmprestimo = async (req, res) => {
  try {
    alert("Empréstimo criado com sucesso")
    const response = await api.post(`/Emprestimo`, req);
    
    return response.data;
  } catch (erro) {
    console.log(erro);
  }
};
const API_URL = "http://localhost:3000/funcionario";

// Função para buscar todos os funcionários
export const getEmployees = async () => {
  try {
    const response = await api.get(`/Funcionario`);
    // if (!response.ok) throw new Error("Erro ao buscar funcionários.");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar funcionario:", error);
    throw error;
  }
};

// Função para buscar um único funcionário pelo código
export const getEmployeeById = async (codigo) => {
  try {
    const response = await api.get(`/Funcionario/${codigo}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar funcionario:", error);
    throw error;
  }
};

// Função para criar um novo funcionário
export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post("/Funcionario", employeeData);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Função para atualizar um funcionário
export const updateEmployee = async (codigo, employeeData) => {
  try {
    const response = await api.put(`/Funcionario/${codigo}`, employeeData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Função para excluir um funcionário
export const deleteEmployee = async (codigo) => {
  const response = await fetch(`${API_URL}/${codigo}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao excluir funcionário.");
  }
  return response.json();
};

export default api;
