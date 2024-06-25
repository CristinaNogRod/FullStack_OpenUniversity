type Result = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

export const calculateExercises = (
  dailyHours: Array<number>,
  target: number
): Result => {
  const average = dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length;
  const rating = average >= target ? 3 : average >= target - 1 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "Great job!"
      : rating === 2
      ? "Not too bad but could be better"
      : "You should try harder";
  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((h) => h > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
