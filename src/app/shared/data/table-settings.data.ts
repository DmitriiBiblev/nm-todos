export const tableSettings = (isToday: boolean) => ([
  { prop: 'title' },
  { name: 'Created At', prop: 'createdAt', width: '150px' },
  { name: isToday ? 'Time left' : 'Expiration', prop: 'expiredAt', width: '150px' },
  { prop: 'favorite', width: '36px' },
  { prop: 'actions', width: '36px' }
]);
