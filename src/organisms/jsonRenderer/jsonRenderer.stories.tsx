import type { Meta, StoryObj } from '@storybook/react';
import AutoSizer from 'react-virtualized-auto-sizer';

// Components
import JSONRenderer from './JSONRenderer';

type Story = StoryObj<typeof JSONRenderer>;

const meta: Meta<typeof JSONRenderer> = {
  title: 'organisms/jsonRenderer',
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

export default meta;
