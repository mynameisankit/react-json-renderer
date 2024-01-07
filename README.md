# React JSON Renderer

A virtualized, expandable, and themeable JSON viewer for React.

## Install

```bash
npm install @mynameisankit/react-json-renderer
```

```tsx
import JSONRenderer from '@mynameisankit/react-json-renderer';

<JSONRenderer json={{ hello: 'world' }} width={600} height={400} />
```

## Themes

```tsx
import JSONRenderer, { JSON_RENDERER_THEMES } from '@mynameisankit/react-json-renderer';

<JSONRenderer
  json={data}
  width={600}
  height={400}
  shouldShowLineNumber
  theme={JSON_RENDERER_THEMES.githubDark}
/>
```

Built-in themes: `default`, `githubLight`, `githubDark`, and `monokai`. You can also provide partial custom tokens:

```tsx
<JSONRenderer
  json={data}
  width={600}
  height={400}
  theme={{ background: '#111827', color: '#f9fafb', keyColor: '#67e8f9' }}
/>
```

## API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `json` | `unknown` | — | Data to display. |
| `width` / `height` | `number` | — | Required viewport dimensions. |
| `rowHeight` | `number` | `20` | Virtualized row height. |
| `shouldShowLineNumber` | `boolean` | `false` | Shows line numbers. |
| `shouldRemoveQuotesFromKeys` | `boolean` | `false` | Hides key quotes. |
| `theme` | `JSONRendererTheme` | — | Theme-token overrides. |

## Development

```bash
yarn install
yarn storybook
yarn build
yarn lint
```

## Release

```bash
yarn build
npm pack --dry-run
npm login
npm publish --access public
```

For later releases, run `npm version patch` (or `minor` / `major`) before publishing.

## Storybook

Push to `main` to deploy Storybook through GitHub Pages. Once, enable **Settings → Pages → Build and deployment → GitHub Actions** in the repository. The site will be available at https://mynameisankit.github.io/react-json-renderer/.
