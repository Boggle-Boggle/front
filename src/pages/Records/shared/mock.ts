export const GROUP_ITEMS = [
  '내가 만든 그룹 (1)',
  '내가 만든 그룹 (2)',
  '내가 만든 그룹 (3)',
  '내가 만든 그룹 (4)',
  '내가 만든 그룹 (5)',
];

export const EDIT_GROUP_ITEMS = Array.from({ length: 5 }, (_, index) => ({
  id: `group-${index + 1}`,
  name: '내가 만든 그룹 01',
}));

export const WEEKDAYS = ['SUN', 'MON ', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const CALENDAR_DAYS = [28, 29, 30, 31, ...Array.from({ length: 31 }, (_, index) => index + 1)];
