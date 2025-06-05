// ------------ Sessão Menu e Sidebar ------------

const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');

menuButton.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});

// ------------ Sessão de Abertura e Fechamento de Popups ------------

function AbrirNovoFuncionario() {
  document.getElementById("Popup-NovoFuncionario").style.display = "block";
}

function fecharPopup() {
  document.getElementById("Popup-NovoFuncionario").style.display = "none";
  document.getElementById("Popup-EditarFuncionario").style.display = "none";
}

// ------------ Sessão de Referência aos Inputs ------------

const NomeFuncionario = document.getElementById("nome-funci-popup");
const CodigoFuncionario = document.getElementById("cod-funci-popup");
const CpfFuncionario = document.getElementById("cpf-funci-popup");
const TelefoneFuncionario = document.getElementById("telefone-funci-popup");
const CelularFuncionario = document.getElementById("cell-funci-popup");
const DepartamentoFuncionario = document.getElementById("depart-funci-popup");
const salvarFunc = document.getElementById("Salvar-Funcionario");

// ------------ Sessão Máscara de Input ------------

function aplicarMascaraCPF(input) {
  input.addEventListener("input", function () {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = value;
  });
}

function aplicarMascaraTelefone(input) {
  input.addEventListener("input", function () {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1)$2-$3');
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1)$2-$3');
    }
    input.value = value;
  });
}

// Máscaras em inputs de cadastro
CpfFuncionario.addEventListener('input', () => aplicarMascaraCPF(CpfFuncionario));
TelefoneFuncionario.addEventListener('input', () => aplicarMascaraTelefone(TelefoneFuncionario));
CelularFuncionario.addEventListener('input', () => aplicarMascaraTelefone(CelularFuncionario));

// Máscaras em inputs de edição
aplicarMascaraCPF(document.getElementById("cpf-funci-popup-editar"));
aplicarMascaraTelefone(document.getElementById("telefone-funci-popup-editar"));
aplicarMascaraTelefone(document.getElementById("cell-funci-popup-editar"));

// ------------ Sessão Carregar Lista de Funcionários ------------

document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-funcionarios");

  fetch("http://localhost:3000/funcionario")
    .then(res => res.json())
    .then(funcionarios => {
      funcionarios.forEach(f => {
        const funcionarioHTML = `
           <div class="funcionario" data-id="${f.id}">
              <div class="img-funcionario"></div>
              <div class="info-funcionario">
                  <div class="nome-funci"><p>Nome: ${f.nome}</p></div>
                  <div class="cod-funci"><p>Código: ${f.codigo}</p></div>
                  <div class="cpf-funci"><p>CPF: ${f.cpf}</p></div>
              </div>
              <span class="iconefunci" onclick="abrirEditarFuncionario('${f.id}')">
                  <i class="fa fa-pencil"></i>
              </span>
           </div>
        `;
        lista.innerHTML += funcionarioHTML;
      });
    })
    .catch(erro => console.error("Erro ao carregar funcionários:", erro));
});

// ------------ Sessão Editar Funcionário ------------

let funcionarioEditandoId = null;

function abrirEditarFuncionario(id) {
  funcionarioEditandoId = id;

  fetch(`http://localhost:3000/funcionario/${id}`)
    .then(res => res.json())
    .then(f => {
      document.getElementById("nome-funci-popup-editar").value = f.nome;
      document.getElementById("cod-funci-popup-editar").value = f.codigo;
      document.getElementById("cpf-funci-popup-editar").value = f.cpf;
      document.getElementById("telefone-funci-popup-editar").value = f.telefone;
      document.getElementById("cell-funci-popup-editar").value = f.celular;
      document.getElementById("Depart-funci-popup-editar").value = f.departamento;

      document.getElementById("Popup-EditarFuncionario").style.display = "block";
    })
    .catch(err => console.error("Erro ao carregar funcionário:", err));
}

// ------------ Sessão Validadores ------------

function validarTelefoneCelular(valor) {
  const regex = /^\(\d{2}\)\d{5}-\d{4}$/;
  return regex.test(valor);
}

function validarCPF(valor) {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return regex.test(valor);
}

// ------------ Sessão Salvar Novo Funcionário ------------

salvarFunc.addEventListener('click', function (event) {
  event.preventDefault();

  let nome = NomeFuncionario.value.trim();
  let codigo = CodigoFuncionario.value.trim();
  let cpf = CpfFuncionario.value.trim();
  let telefone = TelefoneFuncionario.value.trim();
  let celular = CelularFuncionario.value.trim();

  if (nome === "" || codigo === "") {
    alert("Preencha os campos Nome e Código.");
    return;
  }

  if (!validarTelefoneCelular(telefone)) {
    alert("Telefone inválido. Use o formato (xx)xxxxx-xxxx");
    TelefoneFuncionario.focus();
    return;
  }

  if (!validarTelefoneCelular(celular)) {
    alert("Celular inválido. Use o formato (xx)xxxxx-xxxx");
    CelularFuncionario.focus();
    return;
  }

  if (!validarCPF(cpf)) {
    alert("CPF inválido. Use o formato xxx.xxx.xxx-xx");
    CpfFuncionario.focus();
    return;
  }

  const DadosFuncionario = {
    nome,
    codigo,
    cpf,
    telefone,
    celular,
    departamento: DepartamentoFuncionario.value.trim()
  };

  fetch(`http://localhost:3000/funcionario`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(DadosFuncionario)
  })
    .then(() => {
      fecharPopup();
      location.reload();
    })
    .catch(error => console.error("Erro:", error));
});

// ------------ Sessão Salvar Edição de Funcionário ------------

document.getElementById("Salvar-Funcionario-Editar").addEventListener("click", function () {
  if (!funcionarioEditandoId) return;

  const nome = document.getElementById("nome-funci-popup-editar").value.trim();
  const codigo = document.getElementById("cod-funci-popup-editar").value.trim();
  const cpf = document.getElementById("cpf-funci-popup-editar").value.trim();
  const telefone = document.getElementById("telefone-funci-popup-editar").value.trim();
  const celular = document.getElementById("cell-funci-popup-editar").value.trim();
  const departamento = document.getElementById("Depart-funci-popup-editar").value.trim();

  if (!nome || !codigo || !cpf || !telefone || !celular) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  if (!validarCPF(cpf)) {
    alert("CPF inválido. Use o formato 000.000.000-00");
    return;
  }

  if (!validarTelefoneCelular(telefone)) {
    alert("Telefone inválido. Use o formato (00)00000-0000");
    return;
  }

  if (!validarTelefoneCelular(celular)) {
    alert("Celular inválido. Use o formato (00)00000-0000");
    return;
  }

  const dadosAtualizados = {
    nome,
    codigo,
    cpf,
    telefone,
    celular,
    departamento,
  };

  fetch(`http://localhost:3000/funcionario/${funcionarioEditandoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosAtualizados)
  })
    .then(() => {
      fecharPopup();
      location.reload();
    })
    .catch(err => console.error("Erro ao atualizar funcionário:", err));
});

// ------------ Sessão Excluir Funcionário ------------

document.getElementById("Excluir-Funcionario").addEventListener("click", function () {
  if (!funcionarioEditandoId) return;

  fetch(`http://localhost:3000/funcionario/${funcionarioEditandoId}`, {
    method: "DELETE"
  })
    .then(() => {
      fecharPopup();
      location.reload();
    })
    .catch(err => console.error("Erro ao excluir funcionário:", err));
});


document.getElementById("search-funcionario").addEventListener("input", function () {
  const termo = this.value.toLowerCase();
  const funcionarios = document.querySelectorAll(".funcionario");

  funcionarios.forEach(funcionario => {
    const nome = funcionario.querySelector(".nome-funci p").textContent.toLowerCase();
    funcionario.style.display = nome.includes(termo) ? "flex" : "none";
  });
});
