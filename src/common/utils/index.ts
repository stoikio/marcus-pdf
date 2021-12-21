export const pushBetween = <T, I>(arr: T[], item: I): (T | I)[] => {
  return arr.reduce((previousValue, currentValue, i) => {
    if (i === arr.length - 1) {
      return previousValue.concat(currentValue);
    } else {
      return previousValue.concat(currentValue, item);
    }
  }, [] as (T | I)[]);
};

export const mergeMargin = (
  margin1: number | [number, number] | [number, number, number, number],
  margin2: number | [number, number] | [number, number, number, number]
): [number, number, number, number] => {
  let finalMargin1 = margin1

  if (typeof finalMargin1 === 'number') {
    finalMargin1 = [finalMargin1, finalMargin1, finalMargin1, finalMargin1]
  } else if (Array.isArray(finalMargin1) && finalMargin1.length === 2) {
    finalMargin1 = [finalMargin1[0], finalMargin1[1], finalMargin1[0], finalMargin1[1]]
  }

  let finalMargin2 = margin2

  if (typeof finalMargin2 === 'number') {
    finalMargin2 = [finalMargin2, finalMargin2, finalMargin2, finalMargin2]
  } else if (Array.isArray(finalMargin2) && finalMargin2.length === 2) {
    finalMargin2 = [finalMargin2[0], finalMargin2[1], finalMargin2[0], finalMargin2[1]]
  }

  return [finalMargin1[0] + finalMargin2[0], finalMargin1[1] + finalMargin2[1], finalMargin1[2] + finalMargin2[2], finalMargin1[3] + finalMargin2[3]]
}