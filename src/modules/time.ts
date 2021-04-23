import { TimeInterface } from '@interfaces/Time';

const convert = (timeObj: TimeInterface): string => {
  const time = { ...timeObj };
  const current = new Date().getHours();

  Object.keys(time).forEach((point) => {
    const date = new Date(time[point as keyof TimeInterface] * 1000);
    time[point as keyof TimeInterface] = date.getHours();
  });

  // if else are used instead of switch cases for the sake of performance

  if (current >= 0 && current < time.sunrise) return 'night';
  if (current === time.sunrise) return 'sunrise';
  if (current > time.sunrise && current < 12) return 'morning';
  if (current >= 12 && current < time.sunset) return 'day';
  if (current === time.sunset) return 'sunset';
  if (current > time.sunset && current < 24) return 'night';
  return '';
};

export default { convert };
