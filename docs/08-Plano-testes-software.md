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


| **Caso de teste**  | **CT-001 – Criar Lembretes**  |
|:---: |:---: |
| Requisito associado | RF-018	O sistema deverá permitir a criação de lembretes de tarefas a serem feitas. |
| Objetivo do teste | Verificar se o usuário consegue cadastrar um lembrete na aplicação. |
| Passos | - Acessar a página Home pelo Menu Lateral <br> - Identificar o painel de lembretes <br> - Clicar em "Adicionar um lembrete..." <br> - Preencher o campo com a informação desejada <br> - Pressionar o botão "Enter"|
| Critério de êxito | - Lembrete gerado com sucesso. |
| Responsável pela elaboração do caso de teste | João Felipe da Silva Prado. |


| **Caso de teste**  | **CT-003 – Criar Ferramentas**  |
|:---: |:---: |
 | Requisito associado | RF-005 - A empresa deve conseguir realizar a adição de produtos (ferramentas) com código único que serão emprestados, assim como a quantidade específica e localização de cada objeto. |
| Objetivo do teste | Verificar se a empresa consegue realizar o cadastro de ferramentas. |
| Passos |  Acessar a página Estoque pelo Menu Lateral <br> - Identificar o botão "Adicionar Ferramenta' <br> - Clicar em "Adicionar Ferramenta" <br> - Preencher os campo com as informações desejadas <br> - Pressionar o botão "Salvar" ou "Enter" |
| Critério de êxito | - Ferramenta cadastrada com sucesso. |
| Responsável pela elaboração do caso de teste | Iago Gonçalves Moysés. |


## Ferramentas de testes (opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links úteis**:
> - [IBM - criação e geração de planos de teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e técnicas de testes ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> - [Teste de software: conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e geração de planos de teste de software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de teste para JavaScript](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
