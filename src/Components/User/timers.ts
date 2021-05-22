interface Timers {
  wallpaper: NodeJS.Timeout | undefined
  weatherUpdate: NodeJS.Timeout | undefined
}

const timers: Timers = {
  wallpaper: undefined,
  weatherUpdate: undefined,
};

export default timers;
