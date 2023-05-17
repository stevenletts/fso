interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerciseCalculator = (es: number[], target: number): Results => {
  const trainingDays = es.reduce((acc, cur) => {
    if (cur > 0) {
      return acc + 1;
    } else return acc + 0;
  }, 0);

  const success = es.every((e) => e > target);
  const periodLength = es.length;

  return {
    periodLength,
    trainingDays,
    success,
    rating: success ? 100 : 0,
    ratingDescription: success ? "good" : "bad",
    target,
    average: es.reduce((acc, cur) => cur + acc, 0) / periodLength,
  };
};

const parseArgs = (args: string[]) => {
  if (args.length < 4) {
    return "incorrect amount of arguments";
  } else if (args.slice(2, args.length).some((arg) => isNaN(Number(arg)))) {
    return "one of the arguments is not a number";
  } else {
    return exerciseCalculator(
      args.map(Number).slice(3, args.length),
      Number(args[2])
    );
  }
};

console.log(parseArgs(process.argv));
