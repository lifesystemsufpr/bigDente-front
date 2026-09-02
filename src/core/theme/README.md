# Tema

Design system em CSS puro sobre Tailwind v4. Ponto de entrada: `globals.css`
(importado uma unica vez em `src/main.tsx`).

> **Estado atual:** a paleta e um _placeholder neutro_. O tema definitivo ainda
> vai chegar — a estrutura abaixo existe justamente para que isso seja trocar
> numeros em um arquivo, e nao caçar cor em componente.

## Mapa dos arquivos

```
theme/
├── globals.css              Entrada. So imports, na ordem correta.
├── ThemeContext.tsx         Provider React: alterna a classe `dark` no <html>.
├── tokens/
│   ├── palette.css          Primitivas: escalas 50→950 geradas de "seeds".
│   ├── colors.css           Registra as cores como utilities do Tailwind.
│   ├── typography.css       Familias, tamanho extra, ajustes de texto.
│   ├── radius.css           Escala de raio derivada de `--radius`.
│   ├── shadows.css          Elevacao sensivel ao tema.
│   ├── motion.css           Duracoes, curvas e animacoes.
│   └── layout.css           Breakpoints, medidas da casca, z-index.
├── themes/
│   ├── light.css            Contrato semantico do modo claro (`:root`).
│   └── dark.css             Contrato semantico do modo escuro (`.dark`).
├── base/
│   ├── variants.css         Variantes `dark:` e `hocus:`.
│   └── reset.css            Estilos de elemento nativo usando os tokens.
└── utilities/
    └── index.css            Classes compostas (`surface`, `scrim`, `z-modal`...).
```

## As duas camadas de cor

| Camada        | Onde                        | Exemplo                  | Quem usa       |
| ------------- | --------------------------- | ------------------------ | -------------- |
| Primitiva     | `tokens/palette.css`        | `--brand-600`            | so os `themes/`|
| Semantica     | `themes/light.css` / `dark` | `--primary`              | os componentes |

**Regra de ouro:** componente nunca referencia a paleta. Ele usa
`bg-primary`, `text-muted-foreground`, `border-border`. Trocar a marca vira uma
edicao em `palette.css` — nenhum `.tsx` e aberto.

## Como aplicar o tema definitivo

1. **Cores** — em `tokens/palette.css`, ajuste os _seeds_ (matiz + saturacao de
   cada familia). Toda a escala e derivada deles:

   ```css
   --brand-hue: 222;
   --brand-sat: 60%;
   ```

   Se a marca tiver um valor exato que nao cabe na rampa (um verde especifico
   no `500`, por exemplo), sobrescreva so aquele degrau.

2. **Distribuicao** — em `themes/light.css` / `themes/dark.css`, so se algum
   token precisar apontar para outro degrau (ex.: `--primary` no `700` em vez
   do `600`). Todo token criado no claro precisa existir no escuro.

3. **Forma** — em `tokens/radius.css`, `--radius` controla o arredondamento de
   toda a interface a partir de um numero.

4. **Fonte** — `tokens/typography.css` (o `@import` do Google Fonts vive no topo
   do `globals.css`, porque a especificacao do CSS exige que `@import` venha
   antes de qualquer regra).

## Vocabulario disponivel

**Cores** (todas aceitam opacidade: `bg-primary/10`)

`background` · `foreground` · `card` · `popover` · `overlay` · `primary` ·
`secondary` · `accent` · `destructive` · `success` · `warning` · `info` ·
`muted` · `border` · `border-strong` · `input` · `ring` · `sidebar` ·
`chart-1..6`

Sufixos: `-foreground`, `-hover`, `-active`, `-soft`, `-soft-foreground`.

**Utilities compostas**

`surface` · `scrim` · `glass` · `skeleton` · `focus-ring` · `interactive` ·
`scrollbar-thin` · `scrollbar-none` · `sr-only-focusable` ·
`z-raised` → `z-toast`

**Layout** `h-header` · `w-sidebar` · `w-sidebar-open` · `p-page` ·
`max-w-app` · `max-w-reading` · breakpoint `xs:` (480px)

**Movimento** `animate-fade-in` · `animate-slide-up` · `animate-scale-in` ·
`animate-shimmer` · `ease-emphasized` · `ease-overshoot`

**Variantes** `dark:` · `hocus:` (hover + foco por teclado)

## Adicionar uma cor nova

Sempre tres passos, nesta ordem:

1. `themes/light.css` — declare o token (tripla HSL, ex.: `220 60% 48%`).
2. `themes/dark.css` — declare o **mesmo** nome com o valor do escuro.
3. `tokens/colors.css` — registre `--color-x: hsl(var(--x))`.

## Detalhes que economizam tempo

- **Formato HSL sem `hsl()`.** Os tokens guardam `222 60% 48%`, nao
  `hsl(222 60% 48%)`. E o que permite `bg-primary/10` e
  `hsl(var(--primary) / 0.1)`.
- **`@theme inline` em `colors.css` e `shadows.css`.** Os valores dependem de
  variaveis que mudam entre claro e escuro; `inline` faz a resolucao acontecer
  no elemento que usa a classe, entao `.dark` funciona ate em um trecho isolado
  da pagina. Efeito colateral: `var(--color-primary)` nao existe no CSS final —
  em CSS custom escreva `hsl(var(--primary))`.
- **Bordas.** O Tailwind v4 usa `currentColor` como cor padrao de borda;
  `base/reset.css` devolve o comportamento do v3 (`hsl(var(--border))`) para
  que `border-b` sem cor nao herde a cor do texto.
- **Movimento reduzido.** `prefers-reduced-motion` ja e tratado globalmente no
  reset; nao precisa repetir isso por componente.
