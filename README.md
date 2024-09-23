# Aplicação de Calendário Angular

Esta é uma aplicação simples de calendário construída com Angular, Angular Material e Angular CDK. A aplicação permite aos usuários gerenciar compromissos através de uma interface de calendário.

## Funcionalidades
- **Adicionar Compromisso**: Formulário para adicionar compromissos com data e descrição.
- **Excluir Compromisso**: Função para remover compromissos existentes.
- **Mover Compromisso**: Recurso de arrastar e soltar para mover compromissos entre datas.
- **Visão do Calendário**: Visualizações mensal, semanal e diária, com destaques nas datas com compromissos.
- **Validação de Formulário**: Uso de validações com Angular forms para garantir a integridade dos dados.

## Tecnologias Utilizadas
- **Angular**: Framework frontend (versão CLI 18.0.3).
- **Angular Material**: Biblioteca de componentes UI.
- **Angular CDK**: Ferramentas para implementar interações como arrastar e soltar.

## Uso
- **Adicionar Compromisso**: Clique em uma data, preencha os detalhes e envie.
- **Excluir Compromisso**: Clique no ícone de exclusão ao lado do compromisso.
- **Mover Compromisso**: Arraste o compromisso para outra data.

## Servidor de Desenvolvimento
Execute `ng serve` para iniciar o servidor de desenvolvimento e acesse `http://localhost:4200/`.

## Build
Execute `ng build` para compilar o projeto. Os artefatos serão armazenados no diretório `dist/`.

## Testes
- **Unitários**: Execute `ng test` com [Karma](https://karma-runner.github.io).
- **End-to-End**: Execute `ng e2e` para testes completos. Instale um pacote de testes e2e se necessário.

## Lint
Execute `ng lint` para verificar o estilo do código com ESLint.

