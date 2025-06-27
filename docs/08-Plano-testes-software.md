# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

O plano de testes de software é gerado a partir da especificação do sistema e consiste em casos de teste que deverão ser executados quando a implementação estiver parcial ou totalmente pronta. Apresente os cenários de teste utilizados na realização dos testes da sua aplicação. Escolha cenários de teste que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico, o grupo deve detalhar quais funcionalidades foram avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

Não deixe de enumerar os casos de teste de forma sequencial e garantir que o(s) requisito(s) associado(s) a cada um deles esteja(m) correto(s) — de acordo com o que foi definido na <a href="02-Especificacao.md">Especificação do projeto</a>.

Por exemplo:

| **Caso de teste**  | **CT-001 – Cadastrar perfil**  |
|:---: |:---: |
| Requisito associado | RF-00X - A aplicação deve apresentar, na página principal, a funcionalidade de cadastro de usuários para que estes consigam criar e gerenciar seu perfil. |
| Objetivo do teste | Verificar se o usuário consegue se cadastrar na aplicação. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site https://adota-pet.herokuapp.com/src/index.html <br> - Clicar em "Criar conta" <br> - Preencher os campos obrigatórios (e-mail, nome, sobrenome, celular, CPF, senha, confirmação de senha) <br> - Aceitar os termos de uso <br> - Clicar em "Registrar" |
| Critério de êxito | - O cadastro foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |

<br>

| **Caso de teste**  | **CT-002 – Efetuar login**  |
|:---: |:---: |
| Requisito associado | RF-00Y - A aplicação deve possuir opção de fazer login, sendo o login o endereço de e-mail. |
| Objetivo do teste | Verificar se o usuário consegue realizar login. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site https://adota-pet.herokuapp.com/src/index.html <br> - Clicar no botão "Entrar" <br> - Preencher o campo de e-mail <br> - Preencher o campo de senha <br> - Clicar em "Login" |
| Critério de êxito | - O login foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |


| **Caso de teste**  | **CT-003 – Criar Lembretes**  |
|:---: |:---: |
| Requisito associado | RF-018	O sistema deverá permitir a criação de lembretes de tarefas a serem feitas. |
| Objetivo do teste | Verificar se o usuário consegue cadastrar um lembrete na aplicação. |
| Passos | - Acessar a página Home pelo Menu Lateral <br> - Identificar o painel de lembretes <br> - Clicar em "Adicionar um lembrete..." <br> - Preencher o campo com a informação desejada <br> - Pressionar o botão "Enter"|
| Critério de êxito | - Lembrete gerado com sucesso. |
| Responsável pela elaboração do caso de teste | João Felipe da Silva Prado. |

| **Caso de teste**  | **CT-004 – Criar Conta**  |
|:---: |:---: |
| Requisito associado | RF-001	A empresa deve criar um usuário e senha. |
| Objetivo do teste | Verificar se o usuário consegue cadastrar a conta. |
| Passos | - Clicar em "Criar conta" <br> - Preencher os campos obrigatórios (e-mail, nome completo, celular, CPF, senha, cargo, data de nascimento, confirmação de senha, rua, numero e cidade) <br> - Clicar em "Criar Conta" |
| Critério de êxito | - Usuário será direcionado para a tela de login para logar na conta criada. |
| Responsável pela elaboração do caso de teste | João Gabriel Soares Da Silva Franco. |

| **Caso de teste**  | **CT-005 – Criar Empréstimo**  |
|:---: |:---: |
| Requisito associado | RF-007	O sistema deve permitir o usuário a cadastrar um empréstimo |
| Objetivo do teste | Criar um empréstimo |
| Passos | - É necessário preencher todos os campos do forms, quantidade de ferramentas, a data de devolução da ferramenta e uma breve descrição, além disso é necessário selecionar o código do funcionário e código da ferramenta |
| Critério de êxito | - É necessário acessar a tela Lista Empréstimos para verficar se o novo empréstimo foi criado|
| Responsável pela elaboração do caso de teste | Ingrid Yara Alves dos Santos.|

| **Caso de teste**  | **CT-006 – Listar Empréstimos**  |
|:---: |:---: |
| Requisito associado | RF-010	O sistema deve listar todos os empréstimos|
| Objetivo do teste | Listar empréstimos |
| Passos | - É necessário apenas abrir a tela que será exibido todos os empréstimos atuais, se o usuário decidir filtrar estes é necessário preencher o campo nome, com o nome de um funcionário, o sistema irá mostrar todos os empréstimos relacionados com esse funcionário, ou o usuário pode selecionar o código de um funcionário ou de uma ferramenta, o sistema irá mostrar da mesma forma todos os empréstimos relacionados a ambos.
| Critério de êxito | - Será exibido logo abaixo todos o empréstimo ou o emréstimo filtrado|
| Responsável pela elaboração do caso de teste | Ingrid Yara Alves dos Santos.|

| **Caso de teste**  | **CT-006 – Excluir Empréstimos**  |
|:---: |:---: |
| Requisito associado | RF-009	O sistema deve permitir o usuário a excluir os empréstimos|
| Objetivo do teste | Excluir empréstimos |
| Passos | - É necessário apenas clicar no botão "devolver"|
| Critério de êxito | - O empréstimo deve sumir da tela
| Responsável pela elaboração do caso de teste | Ingrid Yara Alves dos Santos.|

| **Caso de teste**  | **CT-006 – Apagar funcionários**  |
|:---: |:---: |
| Requisito associado |RF-013 A empresa deverá conseguir apagar funcionários. |
| Objetivo do teste | Testando a função de apagar um funcionário da empresa. |
| Passos | - No menu lateral vá até "Funcionários" <br> - Encontre o funcionário que deseja excluir do sistema. <br> - Clicar no "Editar". <br> - Clicar no "Excluir" |
| Critério de êxito | - Deleção do funcionário. |
| Responsável pela elaboração do caso de teste | Gabriel Henrique Magri. |

| **Caso de teste**  | **CT-007 – Criar/Editar funcionários**  |
|:---: |:---: |
| Requisito associado |RF-014	A empresa deverá conseguir editar o nome e o código do funcionário. |
| Objetivo do teste | Verificar a criação e edição de funcionários. |
| Passos | - No menu lateral vá até "Funcionários" <br> - Clicar no "Novo Funcionário". <br> - Preencha os campos sugeridos para compor informações sobre o funcionário. <br> - Clicar no "Salvar" |
| Critério de êxito | - Criação do funcionário. |
| Responsável pela elaboração do caso de teste | Gabriel Henrique Magri. |

## Ferramentas de testes (opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links úteis**:
> - [IBM - criação e geração de planos de teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e técnicas de testes ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> - [Teste de software: conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e geração de planos de teste de software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de teste para JavaScript](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
