# Dashboard de Resultados Críticos

Demonstração frontend de um painel para acompanhar resultados laboratoriais e seus prazos de atendimento. O projeto usa Next.js, React, TypeScript e Ant Design.

## Escopo

- Exibe registros fictícios de exames, com número de registro, exame, resultado, setor, unidade e horário de execução.
- Calcula o tempo restante de um prazo de 60 minutos. Resultados com até 30 minutos restantes recebem status de atenção; os que atingem ou ultrapassam o prazo são marcados como atrasados.
- Permite filtrar as unidades pelo menu superior e os setores pelo filtro da tabela.
- Simula a notificação de um resultado: ao acioná-la, o registro é marcado como comunicado e removido da lista ativa.
- Atualiza o relógio usado nos cálculos a cada 10 segundos.

Os dados são gerados localmente e são fictícios. A notificação é apenas uma demonstração: não envia mensagens nem grava alterações. O estado é mantido na memória do navegador e não há backend ou persistência. A tela implementada é o dashboard; “Relatórios” e “Consultas” aparecem no menu, mas ainda não têm páginas ou ações.

## Requisitos

- Node.js 24 (ou uma versão compatível com Next.js 16.4).
- npm.

## Desenvolvimento

```bash
npm ci
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Comandos

```bash
npm run dev          # servidor de desenvolvimento
npm run build        # build de produção
npm start            # inicia o build de produção
npm run lint         # ESLint
npm run format:check # verifica a formatação com Prettier
npm run typecheck    # verifica os tipos TypeScript
npm test             # executa os testes uma vez
npm run test:watch   # executa os testes em modo observação
npm audit            # audita as dependências
```

## Estrutura

```text
app/                  Rotas, layout e estilos globais do Next.js
components/dashboard/ Interface do dashboard, tabela e ações
components/layout/    Barra superior, navegação e filtro de unidades
data/                 Geração dos dados fictícios
domain/dashboard/     Tipos e regras de prazo e status
hooks/                Estado e filtros da tela
tests/                Configuração compartilhada do Vitest
```

`generateMockResults` aceita uma seed e um horário de referência. Com os mesmos parâmetros, produz os mesmos registros. O dashboard usa uma seed fixa e o horário atual como referência.

## Testes e CI

Os testes usam Vitest, jsdom e Testing Library e ficam junto aos módulos que cobrem. O workflow do GitHub Actions roda em pushes e pull requests e verifica lint, formatação, tipos, testes, vulnerabilidades de dependências e build de produção.
