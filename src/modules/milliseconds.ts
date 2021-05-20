interface Time {
  hours: number,
  minutes: number,
  seconds: number
}

const convertation = {
  hours: 3600000,
  minutes: 60000,
  seconds: 1000,
};

const from = (ms: number): Time => {
  const { hours, minutes, seconds } = convertation;

  return {
    hours: Math.floor(ms / hours),
    minutes: Math.floor((ms % hours) / minutes),
    seconds: Math.floor((ms % hours % minutes) / seconds),
  };
};

const to = (initial: Time) => {
  let ms = 0;

  Object.keys(initial).forEach((unit) => {
    const unitKey = unit as keyof Time;
    ms += initial[unitKey] * convertation[unitKey];
  });

  return ms;
};

export { from, to, Time };
