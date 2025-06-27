
# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

Descreva aqui a metodologia de trabalho do grupo para abordar o problema. Inclua definições sobre os ambientes de trabalho utilizados pela equipe para desenvolver o projeto. Isso abrange a relação dos ambientes utilizados, a estrutura para a gestão do código-fonte, além da definição do processo e das ferramentas por meio dos quais a equipe se organiza (gestão de equipes).

## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

Discuta como a configuração do projeto foi feita na ferramenta de versionamento escolhida. Exponha como a gestão de tags, merges, commits e branches é realizada. Discuta também como a gestão de issues foi feita.

## Planejamento do projeto

###  Divisão de papéis

> Apresente a divisão de papéis entre os membros do grupo em cada Sprint. O desejável é que, em cada Sprint, o aluno assuma papéis diferentes na equipe. Siga o modelo do exemplo abaixo:

#### Sprint 1
- _Scrum master_: Luiz Henrique
- Protótipos: Ingrid e João Gabriel
- Testes: João Felipe e Iago
- Documentação: Luiz e Gabriel

#### Sprint 2
- _Scrum master_: João Felipe
- Modelagem _Processo 1_: Gabriel, Ingrid Yara, João Gabriel
- Modelagem _Processo 2_: João Felipe, Luiz Henrique e Iago Moysés
- Slides: Ingrid Yara

#### Sprint 4
- _Scrum master_: Iago Moysés
- Telas de ferramentas e empréstimo: Iago Moysés, Ingrid Yara, Luiz Coelho
- Telas de funcionários e Homepage: João Felipe, Gabriel e João Gabriel
- Slides: 


###  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

#### Sprint 1

Atualizado em: 10/03/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Gabriel H.     | Requisitos funcionais e Restrições | 03/03/2025     | 09/03/2025 | ✔️    | 09/03/2025      |
| Ingrid Y.       | Diagrama de Casos de Uso e Slides    | 05/03/2025     | 09/03/2025 | ✔️     |   07/03/2025                |
| João F.      | Histórias de usuário e Personas  | 05/03/2025     | 09/03/2025 | ✔️     |   07/03/2025               |
| Iago M.        | Histórias de usuário e Personas  |    05/03/2025        | 09/03/2025 |  ✔️   |   08/03/2025    |
| João G.        | Diagrama de Casos de Uso e Slides  |    05/03/2025        | 09/03/2025 |  ✔️   |   07/03/2025    |
| Luiz H.       | Requisitos não funcionais e Restrições  |    03/03/2025        | 13/03/2025 |  ✔️   |   11/03/2025    |

#### Sprint 2

Atualizado em: 10/04/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Gabriel H.    | Diagrama 1 e Indicadores de Desempenho   | 05/04/2025     | 10/04/2025 | ✔️    | 10/04/2024      |
| Iago M.       | Diagrama 2 e especificação do diagrama    | 29/03/2025     | 10/04/2025 | ✔️    | 10/04/2025                |
| Ingrid Y.     | Diagrama 1, Slides e preenchimento da descrição das atividades do processo | 27/03/2025 | 04/04/2025 | ✔️ | 04/04/2025  |
|João F.        | Diagrama 2, Metodologias e Relatório Extensão     |  29/03/2025    | 10/04/2025 | ✔️ | 03/04/2025       |
|João G.        | Diagrama 1 e preenchimento da descrição do AS-Is no Git  |  27/03/2025    | 04/04/2025 | ✔️ | 04/04/2025    |
|Luiz H.        | Diagrama 2 e preenchimento da descrição do TO-BE no Git  |  04/04/2025    | 10/04/2025 | ✔️ |  10/04/2025  |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

#### Sprint 3

Atualizado em: 07/05/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Gabriel H.    | Projeto Wireframe, Userflow e Diagrama de Fluxos   | 29/04/2025     | 07/05/2025 | ✔️   | 07/05/2025   |
| Iago M.       | Diagrama de ER, Diagrama de esquema, Diagrama de classes, Diagrama pé de galinha, Projeto de Interface, preenchimento do modelo físico    | 28/04/2025     | 08/05/2025 | ✔️    | 08/05/2025                |
| Ingrid Y.     | Diagrama de ER, Diagrama de esquema, Diagrama de classes, Diagrama pé de galinha, Projeto de Interface, preenchimento do modelo físico e slides | 28/04/2025 | 08/05/2025 | ✔️ | 08/05/2025  |
|João F.        | Projeto de Wireframe, Userflow e Diagrama de Fluxos    |  29/04/2025    | 07/05/2025 | ✔️ | 07/05/2025 |
|João G.        | Jornada de usuário e preenchimento do relatório de extensão |  29/03/2025    | 02/05/2025 | ✔️ | 01/05/2025    |
|Luiz H.        | Jornada de usuário  |  22/04/2025    | 02/05/2025 | ✔️ |  02/05/2025  |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

#### Sprint 4

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Gabriel H.     | Tela e CRUD de funcionários | 19/05/2025     | 05/06/2025 | ✔️    |    05/06/2025    |
| Ingrid Y.       | Tela e CRUD de empréstimos    | 15/05/2025     | 05/06/2025 | ✔️     |          04/06/2025          |
| João F.      | Tela de início   | 16/05/2025    | 05/06/2025  | ✔️     |           05/06/2025        |
| Iago M.        |  Tela e CRUD de ferramentas  |    12/05/2025        | 05/06/2025 |  ✔️   |   01/06/2025     |         
| João G.        | Tela e CRUD de login  |    17/05/2025        | 05/06/2025  |  ✔️   |   05/06/2025    |
| Luiz H.       | HTML, CSS E JAVASCRIPT das telas de Departamento e Configurações  |  19/05/2025    |  |  ✔️   |   04/06/2025     |

#### Sprint 5

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Gabriel H.     | Tela funcionários em REACT e video final do projeto | 13/06/2025    | 21/06/2025 |   ✔️     |     |
| Ingrid Y.       | Tela empréstimos em REACT e slides   |   13/06/2025   | 21/06/2025 |   ✔️      |                 |
| João F.      | Tela início em REACT e completar os feedbacks do relatório e do repositório  |     | 21/06/2025 |   ✔️      |             |
| Iago M.        |  Telas ferramentas, agenda e assinatura em REACT  |        13/06/2025   | 21/06/2025 |    ✔️    |     |         
| João G.        | Tela login e cadastro em REACT e hospedagem do site  |   13/06/2025       | 21/06/2025  |    ✔️    |     |
| Luiz H.       | Telas departamento e configurações em REACT e hospedagem do site  |    | 21/06/2025 |    ✔️    |     |

### Processo

Conforme orientação da professora Amália, o grupo deve designar um Scrum Master diferente para cada sprint, garantindo assim uma supervisão contínua e diversificada do processo. Essa responsabilidade inclui a gestão do mecanismo de controle utilizado pela equipe para a execução das tarefas, o GitHub Projects. Essa ferramenta possibilita a organização das atividades a serem desenvolvidas, além do acompanhamento detalhado do progresso de cada tarefa, permitindo identificar claramente quem é o responsável por sua execução e qual o seu status atual. Dessa forma, o grupo implementa de maneira prática o framework Scrum, utilizando o recurso de gerenciamento de projetos do GitHub para monitorar o andamento do trabalho, garantir a transparência no desenvolvimento e facilitar a colaboração entre os membros da equipe.

![Manejo GitHub Projects](images/Manejo_GitProjects.png)
 
## Relação de ambientes de trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas. Todos os ambientes e frameworks utilizados no desenvolvimento da aplicação estão listados na seção abaixo.

https://vercel.com/login
### Ferramentas

Liste todas as ferramentas que foram empregadas no projeto, justificando a escolha delas, sempre que possível.

Exemplo: os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito é apresentada na tabela que se segue.

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-3.git            |
| Documentos do projeto               | GitHub                             | https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-3/tree/main/docs |
| Slide de Apresentação                | Canva                              |https://www.canva.com/design/DAGhErQqtyw/Gf00ZqT2x5SFzS-EAGICSA/edit               |
| Gerenciamento do projeto            | GitHub Projects                    |https://github.com/orgs/ICEI-PUC-Minas-PCO-SI/projects/104                          |
| Criação de Diagramas                 | HEFLO                            | https://app.heflo.com/Home#&logout=true                   |
| Criação do Wireframe e UserFlow               | Figma                        |https://www.figma.com/design/VOaotVD0gdieKyhPdMuj8k/Manejo-GR?node-id=0-1&p=f&t=GQkAHKaUGfy250ad-0                 |
| Encontros Online               | Teams                          |https://www.microsoft.com/pt-br/microsoft-teams/log-in                  |
| Hospedagem               | Vercel                          |      https://vercel.com/login            |
