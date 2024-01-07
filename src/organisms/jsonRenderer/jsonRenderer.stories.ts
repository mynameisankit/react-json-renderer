import type { Meta, StoryObj } from '@storybook/react';

// Components
import JSONRenderer from './JSONRenderer';

type Story = StoryObj<typeof JSONRenderer>;

const meta: Meta<typeof JSONRenderer> = {
  title: 'organisms/jsonRenderer',
  component: JSONRenderer,
};

export const Default: Story = {
  args: {
    height: 300,
    rowHeight: 20,
    shouldShowLineNumber: true,
    json: {
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
    },
  },
};

export default meta;
