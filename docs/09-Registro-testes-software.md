# Registro de testes de software

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>, <a href="08-Plano-testes-software.md"> Plano de testes de software</a>


| **Caso de teste** 	| **CT-001 – Criar Lembrete** 	|
|:---:	|:---:	|
| Requisito associado | RF-018 O sistema deverá permitir a criação de lembretes de tarefas a serem feitas. |
| Registro de evidência |  [Teste Criação Lembrete](https://drive.google.com/file/d/1OSIfO9uy3BSxYGjahiTFpTFONgi1Ev-U/view?usp=sharing) |

| **Caso de teste** 	| **CT-002 – Criar Conta** 	|
|:---:	|:---:	|
| Requisito associado | RF-001 A empresa deve criar um usuário e senha. |
| Registro de evidência |  [Teste Criação Conta](https://drive.google.com/file/d/1-Ibsfg-szzXgZ5Lhhxpgwhbt90aMl39S/view?usp=sharing) |

| **Caso de teste** 	| **CT-006 – Apagar Funcionários** 	|
|:---:	|:---:	|
| Requisito associado |RF-013 A empresa deverá conseguir apagar funcionários. |
| Registro de evidência |  [Teste Apagar Funcionário]([https://drive.google.com/file/d/1OSIfO9uy3BSxYGjahiTFpTFONgi1Ev-U/view?usp=sharing](https://drive.google.com/file/d/1bVl2F0Z_Csntm48nZICuOLgd5GqEO2B0/view?usp=sharing)) |

| **Caso de teste** 	| **CT-007 – Criar/Editar funcnionários** 	|
|:---:	|:---:	|
| Requisito associado | RF-014 A empresa deverá conseguir editar o nome e o código do funcionário. |
| Registro de evidência |  [Teste Criação Funcionário]([https://drive.google.com/file/d/1-Ibsfg-szzXgZ5Lhhxpgwhbt90aMl39S/view?usp=sharing](https://drive.google.com/file/d/1g67Y5F2SNOd9sMD-LwkzkXdjRbO-Cfgt/view?usp=sharing)) |


## Avaliação

Durante os testes realizados com a aplicação Manejo GR, foi possível observar diversos pontos positivos e também identificar aspectos que podem ser aprimorados nas próximas iterações.

- Pontos fortes:
  - Interface intuitiva e limpa: Usuários relataram facilidade de uso mesmo sem treinamento prévio.
  - Agilidade nos registros de empréstimos: A funcionalidade de empréstimo foi bem recebida, reduzindo o tempo necessário para controle manual.
  - Relatórios acessíveis: A geração de relatórios foi apontada como útil por gestores para o acompanhamento das ferramentas.
  - Sistema de lembretes: Contribuiu para melhor organização das tarefas diárias, facilitando o acompanhamento de pendências.

- Pontos fracos:
  - Falta de feedback visual em algumas ações: Em determinadas funções (como ao salvar um empréstimo), o sistema não apresentava confirmação visual clara, gerando dúvidas.
  - Tempo de resposta em telas com grandes volumes de dados: Durante os testes com estoques maiores, notou-se certa lentidão na tela de listagem de ferramentas.
  - Controle de permissões limitado: Algumas ações sensíveis estavam disponíveis para todos os usuários, sem distinção de perfis.

- Ações e melhorias propostas:
  - Inclusão de mensagens visuais de confirmação e erro: Para tornar a navegação mais clara e intuitiva.
  - Otimização de carregamento de dados: Implementação de paginação e melhoria nas queries do banco de dados.
  - Criação de níveis de acesso: Desenvolvimento de perfis de usuários com permissões distintas (ex: administrador, operador).

- Falhas detectadas:
  - Tentativa de registrar empréstimo com campos vazios não gerava alerta.
  - Histórico de ferramentas apresentava duplicidade em alguns registros.
  - Botão de "Bloquear funcionário" não exibia feedback claro sobre a ação.

Esses resultados permitiram à equipe compreender melhor o uso real da ferramenta e direcionar as próximas iterações para corrigir falhas, melhorar a experiência do usuário e reforçar aspectos críticos como segurança e desempenho. O objetivo nas próximas versões será consolidar os pontos positivos e resolver os gargalos identificados, garantindo uma solução ainda mais robusta, confiável e eficiente.

