# React JSON Renderer

```sh
# NPM
npm i @mynameisankit/react-json-renderer

# YARN
yarn add @mynameisankit/react-json-renderer
```

`Work-In-Progress` - The package is currently in the release candidate (RC) phase, as I’m still finalizing the component styling. However, the core functionalities are complete, and you can use the package as a reference to build your own implementation."

### API

#### Component

| Prop                       | Type    | Description                              | Default | Required |
| -------------------------- | ------- | ---------------------------------------- | ------- | -------- |
| json                       | any     |                                          |         | No       |
| shouldShowLineNumber       | Boolean | If `true` shows line number at each line | `false` | No       |
| shouldRemoveQuotesFromKeys | Boolean | If `true` remove quotes from every key   | `false` | No       |
| height                     | Number  |                                          |         | Yes      |
| width                      | Number  |                                          |         | Yes      |
| rowHeight                  | Number  |                                          | `20px`  | No       |

##### Usage

-   Without Autosizer

```jsx
import JSONRenderer from "react-json-renderer";

function YourComponent() {
    return <JSONRenderer json={yourObject} height={height} width={width} />;
}
```

-   With Autosizer

```jsx
import AutoSizer from "react-virtualized-auto-sizer";
import JSONRenderer from "react-json-renderer";

function YourComponent() {
    return (
        <AutoSizer>
            {({ height, width }) => (
                <JSONRenderer json={yourObject} height={height} width={width} />
            )}
        </AutoSizer>
    );
}
```

#### Hook

| Arg  | Type | Description | Default | Required |
| ---- | ---- | ----------- | ------- | -------- |
| json | any  |             |         | No       |

| Return Value             | Type                          | Description                                                                      |
| ------------------------ | ----------------------------- | -------------------------------------------------------------------------------- |
| lines                    | Line[]                        | Array of instance of Line Builder                                                |
| handleToggleLineCollapse | Function: (lineIndex) => void | Function which acts as `onClick` handler for `+(expand)` or `-(collapse)` button |

##### Usage

```jsx
import { useJsonLines } from "react-json-renderer";

function Component({ props }) {
    const { json } = props;

    const { lines, handleToggleLineCollapse } = useJsonLines(json);

    return (
        <YourJSONRenderer
            lines={lines}
            handleToggleLineCollapse={handleToggleLineCollapse}
        />
    );
}
```

### Development

```sh
yarn install
yarn storybook
```

This should open the storybook page at port `6006`. You can directly start modifying files in `src` directory.

#### Component Architecture

Will be added

### Future (Priority in order)

-   Themable(GitHub Themes/Prisma Themes, Coming Soon??) Component
-   Live Editing
-   Make the core logic framework agnostic
-   Add test
