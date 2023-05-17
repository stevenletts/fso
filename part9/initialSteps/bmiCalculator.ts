export const bmiCalculator = (height: number, weight: number): number => {
  return weight / (height / 100) ** 2;
};

export const classifyBMI = (bmi: number): string => {
  switch (true) {
    case bmi < 16:
      return "underweight (severe thinness)";
    case bmi < 17:
      return "underweight (moderate thinness)";
    case bmi < 18.4:
      return "underweight (mild thinness)";
    case bmi < 24.9:
      return "Normal Range";
    case bmi < 29.9:
      return "overweight";
    case bmi >= 29.9:
      return "obese";
    default:
      return "error";
  }
};

export const parseArguments = (args: string[]): string => {
  if (args.length < 4) {
    return "incorrect amount of arguments";
  } else if (args.slice(2, args.length).some((arg) => isNaN(Number(arg)))) {
    return "one of the arguments is not a number";
  } else {
    return classifyBMI(bmiCalculator(Number(args[2]), Number(args[3])));
  }
};
