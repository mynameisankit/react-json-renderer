import type { Meta, StoryObj } from '@storybook/react';
import AutoSizer from 'react-virtualized-auto-sizer';

// Components
import JSONRenderer from './Component';
import { JSON_RENDERER_THEMES } from './Component.themes';

type Story = StoryObj<typeof JSONRenderer>;

const meta: Meta<typeof JSONRenderer> = {
  title: 'JSONRenderer',
  component: JSONRenderer,
  argTypes: {
    shouldShowLineNumber: {
      defaultValue: true,
      control: 'boolean'
    },
    shouldRemoveQuotesFromKeys: {
      defaultValue: false,
      control: 'boolean'
    }
  }
};

const DATA = {
  "product": "Live JSON generator",
  "version": 3.1,
  "releaseDate": "2014-06-25T00:00:00.000Z",
  "demo": true,
  "person": {
    "id": 12345,
    "name": "John Doe",
    "phones": {
      "home": { us: "800-123-4567", india: "800-123-4567" },
      "mobile": { us: "800-123-4567", india: "800-123-4567" },
    },
    "email": [
      "jd@example.com",
      "jd@example.org"
    ],
    "dateOfBirth": "1980-01-02T00:00:00.000Z",
    "registered": true,
  }
};

export const Default: Story = {
  args: {
    height: 300,
    rowHeight: 20,
    json: DATA,
  }
};

export const WithAutoSizer: Story = {
  ...Default,
  render: args => (
    <div style={{ height: '500px', border: '1px solid black' }}>
      <AutoSizer>
        {({ height, width }) => <JSONRenderer {...args} height={height} width={width} />}
      </AutoSizer>
    </div>
  )
};

export const Primitive: Story = {
  args: {
    ...Default.args,
    json: "JSON Renderer",
  }
};

export const GitHubLightTheme: Story = {
  args: {
    ...Default.args,
    shouldShowLineNumber: true,
    theme: JSON_RENDERER_THEMES.githubLight,
  },
};

export const GitHubDarkTheme: Story = {
  args: {
    ...Default.args,
    shouldShowLineNumber: true,
    theme: JSON_RENDERER_THEMES.githubDark,
  },
};

export const MonokaiTheme: Story = {
  args: {
    ...Default.args,
    shouldShowLineNumber: true,
    theme: JSON_RENDERER_THEMES.monokai,
  },
};

export const CustomTheme: Story = {
  args: {
    ...Default.args,
    shouldShowLineNumber: true,
    theme: {
      background: '#1f2937',
      color: '#f9fafb',
      lineNumberBackground: '#111827',
      lineNumberColor: '#9ca3af',
      indentGuideColor: '#4b5563',
      toggleBackground: '#374151',
      toggleColor: '#f9fafb',
      toggleBorderColor: '#6b7280',
      keyColor: '#67e8f9',
      stringColor: '#bef264',
      numberColor: '#fbbf24',
      booleanColor: '#f9a8d4',
      nullColor: '#c4b5fd',
    },
  },
};

export default meta;
