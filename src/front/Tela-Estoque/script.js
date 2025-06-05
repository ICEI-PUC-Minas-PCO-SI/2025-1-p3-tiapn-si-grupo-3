document.addEventListener("DOMContentLoaded", () => {
    // --- CONSTANTES E VARIÁVEIS GLOBAIS ---
    const API_URL = "http://localhost:3000";
    const modal = document.getElementById("formModal");
    const formulario = document.getElementById("formularioNovaFerramenta");
    const tabelaCorpo = document.getElementById("tbEstoque");
    const botaoAbrirModal = document.getElementById("btnFerramenta");
    const botaoFecharModal = document.getElementById("fecharModal");
    const menuButton = document.querySelector('.menu-button');
    const sidebar = document.querySelector('.sidebar');

    

    
    async function carregarFerramentas() {
        try {
            const response = await fetch(`${API_URL}/Ferramenta`);
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }
            const ferramentas = await response.json();

            tabelaCorpo.innerHTML = ''; 

            if (ferramentas.length === 0) {
                tabelaCorpo.innerHTML = '<tr><td colspan="6" class="text-center">Nenhuma ferramenta encontrada.</td></tr>';
                return;
            }

            ferramentas.forEach(ferramenta => {
                const novaLinha = document.createElement("tr");
                novaLinha.innerHTML = `
                    <td>${String(ferramenta.Codigo).padStart(3, '0')}</td>
                    <td>${ferramenta.Nome}</td>
                    <td>${ferramenta.Tipo}</td>
                    <td>${ferramenta.Quantidade}</td>
                    <td>${ferramenta.Localizacao}</td>
                    <td>
                        <a href="#" class="btn-editar" data-id="${ferramenta.Codigo}"><i class="fa fa-pen-to-square text-warning"></i></a>
                         <a href="#" class="btn-deletar ms-2" data-id="${ferramenta.Codigo}" title="Excluir"> 
                        <i class="fa fa-trash text-danger"></i>
                    </a>
                        </td>
                `;
                tabelaCorpo.appendChild(novaLinha);
            });
            
            popularFiltroLocalizacao();

        } catch (error) {
            console.error("Falha ao carregar ferramentas:", error);
            tabelaCorpo.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Erro ao carregar dados. Verifique o console.</td></tr>`;
        }
    }

    function prepararEdicao(id) {
        const linha = document.querySelector(`.btn-editar[data-id="${id}"]`).closest('tr');
        const [_, nome, tipo, quantidade, localizacao] = Array.from(linha.cells).map(cell => cell.textContent);

        document.getElementById('idEdicao').value = id;
        document.getElementById('nome').value = nome;
        document.getElementById('tipo').value = tipo;
        document.getElementById('quantidade').value = quantidade;
        document.getElementById('localizacao').value = localizacao;
        
        modal.querySelector('h2').textContent = 'Editar Ferramenta';
        abrirModal();
    }
    
    async function handleFormSubmit(event) {
        event.preventDefault();

        const id = document.getElementById("idEdicao").value;
        const dadosFerramenta = {
            nome: document.getElementById("nome").value,
            tipo: document.getElementById("tipo").value,
            quantidade: document.getElementById("quantidade").value,
            localizacao: document.getElementById("localizacao").value,
        };

        const isEdicao = !!id;
        const url = isEdicao ? `${API_URL}/Ferramenta/${id}` : `${API_URL}/Ferramenta`;
        const method = isEdicao ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosFerramenta)
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.error || 'Falha ao salvar a ferramenta.');
            }
            
            fecharModal();
            await carregarFerramentas(); // Recarrega a tabela para mostrar as mudanças

        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert(`Não foi possível salvar a ferramenta. Erro: ${error.message}`);
        }
    }

    async function handleDeleteFerramenta(id) {
    // Pede confirmação ao usuário
    const confirmado = window.confirm("Tem certeza que deseja excluir esta ferramenta?");

    if (confirmado) {
        try {
            const response = await fetch(`${API_URL}/Ferramenta/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                
                let errorMessage = 'Falha ao deletar a ferramenta.';
                try {
                    const erroJson = await response.json();
                    errorMessage = erroJson.error || errorMessage;
                } catch (e) {
                    
                }
                throw new Error(errorMessage);
            }

           

            alert('Ferramenta deletada com sucesso!'); 
            await carregarFerramentas(); // Recarrega a tabela para mostrar as mudanças

        } catch (error) {
            console.error("Erro ao deletar:", error);
            alert(`Não foi possível deletar a ferramenta. Erro: ${error.message}`);
        }
    }
}

    /**
     * Popula o dropdown de filtro com localizações únicas.
     */
    function popularFiltroLocalizacao() {
        const select = document.getElementById('filtroLocalizacao');
        const linhas = tabelaCorpo.getElementsByTagName('tr');
        const localizacoes = new Set();
        
        // Limpa opções antigas, mantendo a primeira ("Localização")
        while (select.options.length > 1) {
            select.remove(1);
        }

        for (let i = 0; i < linhas.length; i++) {
            const colunas = linhas[i].getElementsByTagName('td');
            if (colunas.length > 4) {
                const localizacao = colunas[4].textContent.trim();
                if (localizacao) localizacoes.add(localizacao);
            }
        }

        Array.from(localizacoes).sort().forEach(localizacao => {
            const option = document.createElement('option');
            option.value = localizacao;
            option.textContent = localizacao;
            select.appendChild(option);
        });
    }

    /**
     * Filtra a tabela com base nos inputs de pesquisa e localização.
     */
    function filtrarTabela() {
        const termoPesquisa = document.querySelector('.form-control').value.toLowerCase();
        const localizacaoSelecionada = document.getElementById('filtroLocalizacao').value;
        const linhas = tabelaCorpo.getElementsByTagName('tr');

        for (const linha of linhas) {
            const colunas = linha.getElementsByTagName('td');
            if (colunas.length === 1) continue; // Ignora linhas de mensagem (ex: "Nenhum resultado")

            const nome = colunas[1].textContent.toLowerCase();
            const codigo = colunas[0].textContent.toLowerCase();
            const tipo = colunas[2].textContent.toLowerCase();
            const localizacao = colunas[4].textContent;

            const matchPesquisa = nome.includes(termoPesquisa) || tipo.includes(termoPesquisa) || codigo.includes(termoPesquisa);
            const matchLocalizacao = !localizacaoSelecionada || localizacao === localizacaoSelecionada;

            linha.style.display = (matchPesquisa && matchLocalizacao) ? '' : 'none';
        }
    }

    // --- FUNÇÕES DE CONTROLE DO MODAL ---
    function abrirModal() {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }

    function fecharModal() {
        formulario.reset();
        document.getElementById("idEdicao").value = '';
        modal.classList.remove("flex");
        modal.classList.add("hidden");
    }


    // --- EVENT LISTENERS ---

    // Carrega os dados iniciais
    carregarFerramentas();

    // Menu lateral
    menuButton.addEventListener('click', () => sidebar.classList.toggle('hidden'));

    // Modal
    botaoAbrirModal.addEventListener("click", () => {
        formulario.reset();
        document.getElementById("idEdicao").value = '';
        modal.querySelector('h2').textContent = 'Nova Ferramenta';
        abrirModal();
    });

    botaoFecharModal.addEventListener("click", fecharModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) fecharModal();
    });

    // Ações na tabela (Editar/Deletar)
    tabelaCorpo.addEventListener('click', (e) => {
        const target = e.target.closest('a');
        if (!target) return;

        e.preventDefault();
        const id = target.getAttribute('data-id');

        if (target.classList.contains('btn-editar')) {
            prepararEdicao(id);
        }
       else if (target.classList.contains('btn-deletar')) {
          handleDeleteFerramenta(id);
        }
    });
    
    // Formulário
    formulario.addEventListener("submit", handleFormSubmit);

    // Filtros
    document.querySelector('.form-control').addEventListener('input', filtrarTabela);
    document.getElementById('filtroLocalizacao').addEventListener('change', filtrarTabela);
});