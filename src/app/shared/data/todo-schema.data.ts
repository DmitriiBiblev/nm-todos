import { JSONSchema } from '@ngx-pwa/local-storage';

export const TODO_SCHEMA: JSONSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      createdAt: { type: 'string' },
      expiredAt: { type: 'string' },
      isFavorite: { type: 'boolean' }
    },
    required: ['id', 'title', 'createdAt', 'expiredAt', 'isFavorite']
  }
};
