export const secToTimestamp = (secs: number) => {
  const date = new Date(secs * 1000);
  if (secs >= 60 * 60) {
    return date.toISOString().substring(11, 19);
  }
  return date.toISOString().substring(14, 19);
};
