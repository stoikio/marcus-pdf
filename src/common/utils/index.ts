export const pushBetween = <T, I>(arr: T[], item: I): (T | I)[] => {
  return arr.reduce((previousValue, currentValue, i) => {
    if (i === arr.length - 1) {
      return previousValue.concat(currentValue);
    } else {
      return previousValue.concat(currentValue, item);
    }
  }, [] as (T | I)[]);
};
