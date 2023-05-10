export const convertLbsToKg = (lbs: number) => lbs * 0.4535924;

export const convertInchesToCM = (inches: number) => inches * 2.54;

export const getBmr = (
  sex: string,
  weightInKg: number,
  heightInCM: number,
  age: number
) => {
  // Mifflin St. Jeor Formulas
  const baseNumber = 10 * weightInKg + 6.25 * heightInCM - 5 * age;

  if (sex === "Male") return baseNumber + 5;

  return baseNumber - 161;
};
