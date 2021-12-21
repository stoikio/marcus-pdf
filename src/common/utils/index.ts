export const pushBetween = <T, I>(arr: T[], item: I): (T | I)[] => {
  return arr.reduce((previousValue, currentValue, i) => {
    if (i === arr.length - 1) {
      return previousValue.concat(currentValue);
    } else {
      return previousValue.concat(currentValue, item);
    }
  }, [] as (T | I)[]);
};


export const formatMargin = (margin: number | [number, number] | [number, number, number, number]): [number, number, number, number] => {
  if (typeof margin === 'number') {
    return [margin, margin, margin, margin]
  }

  if (margin.length === 2) {
    return [margin[0], margin[1], margin[0], margin[1]]
  }

  return margin
}

export const mergeMargin = (
  margin1: number | [number, number] | [number, number, number, number],
  margin2: number | [number, number] | [number, number, number, number]
): [number, number, number, number] => {
  let formattedMargin1 = formatMargin(margin1)

  let formattedMargin2 = formatMargin(margin2)

  return [
    formattedMargin1[0] + formattedMargin2[0],
    formattedMargin1[1] + formattedMargin2[1],
    formattedMargin1[2] + formattedMargin2[2],
    formattedMargin1[3] + formattedMargin2[3]
  ]
}