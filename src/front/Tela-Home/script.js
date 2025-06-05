const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');

// Botão de menu lateral
menuButton.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});

/* -----------------------Widgets: Contagem------------------- */

// Animação da contagem
document.querySelectorAll(".count").forEach(countElement => {
  countElement.addEventListener("mouseenter", () => {
    const target = +countElement.getAttribute("data-count");
    let current = 0;
    const increment = Math.ceil(target / 50);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        countElement.textContent = target;
        clearInterval(interval);
      } else {
        countElement.textContent = current;
      }
    }, 20);
  });
});

/* -----------------------Widgets: Lembretes------------------- */

const API_URL = "http://localhost:3000";
const reminderInput = document.getElementById("reminderInput");
const reminderList = document.getElementById("reminderList");

// Passo 1: Carrega lembretes do backend ao iniciar a página
async function carregarLembretes() {
  try {
    const response = await fetch(`${API_URL}/Lembrete`);
    const lembretes = await response.json();


    reminderList.innerHTML = "";
    if (lembretes.length === 0) {
      showEmptyReminderMessage();
      return;
    }

    lembretes.forEach(lembrete => {
      addReminderVisual(lembrete.Observacao, lembrete.Codigo);
    });
  } catch (err) {
    console.error("Erro ao carregar lembretes:", err);
  }
}

// Passo 2: Adiciona lembrete no backend e atualiza visualmente

const adminId = 14; // <- Troque esse valor com o ID do administrador logado (ideal: recuperar do login)

async function addReminder(text) {
  if (!text) return;

  let dados = {
    observacao: text,
    administrador_codigo: adminId
  }

  try {

    fetch('http://localhost:3000/Lembrete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    }).then(response => console.log(response.status));



  } catch (err) {
    console.error(err);
  }
}

// Passo 3: Remove lembrete no backend e atualiza lista visual
async function removerLembrete(id) {
  try {
    const res = await fetch(`${API_URL}/Lembrete/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error("Erro ao deletar lembrete");

    // Atualiza a lista completa para garantir dados sincronizados (passo 4)
    await carregarLembretes();

  } catch (err) {
    console.error(err);
  }
}

// Função para adicionar visualmente o lembrete (li com checkbox, texto, delete) à lista
function addReminderVisual(text, id) {
  clearEmptyReminder();

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("change", () => {
    li.classList.toggle("done");
  });

  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "🗑️";
  deleteBtn.classList.add("delete");
  deleteBtn.style.cursor = "pointer";
  deleteBtn.title = "Excluir lembrete";
  deleteBtn.addEventListener("click", () => {
    removerLembrete(id);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  reminderList.appendChild(li);
}

// Atualiza a mensagem de lista vazia
function showEmptyReminderMessage() {
  reminderList.innerHTML = `
    <li class="empty-reminder">
      <i class="fa fa-info-circle"></i> Nenhum lembrete adicionado ainda.
    </li>`;
}

// Remove mensagem de lista vazia caso exista
function clearEmptyReminder() {
  const empty = reminderList.querySelector(".empty-reminder");
  if (empty) empty.remove();
}

// Evento: adicionar lembrete ao pressionar Enter
reminderInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && this.value.trim() !== "") {
    addReminder(this.value.trim());
    this.value = "";
  }
});

// Passo 1: Inicializa a lista ao carregar a página
window.addEventListener("DOMContentLoaded", carregarLembretes);
