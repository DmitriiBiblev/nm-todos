export const TODO_SCHEMA = {
  type: 'object' as const,
  properties: {
    id: { type: 'number' as const },
    title: { type: 'string' as const },
    createdAt: { type: 'string' as const },
    expiredAtDate: { type: 'string' as const },
    expiredAtTime: { type: 'string' as const },
    isFavorite: { type: 'boolean' as const }
  },
  required: ['id', 'title', 'createdAt', 'expiredAtDate', 'isFavorite']
};
