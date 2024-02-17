export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function calculateMinutesDifference(inputDate: Date): number {
  if (!(inputDate instanceof Date) || isNaN(inputDate.getTime())) {
    return NaN; // Return NaN if the input is not a valid date
  }
  const now = new Date();
  const differenceInMillis: number = now.getTime() - inputDate.getTime();
  const differenceInMinutes: number = Math.floor(
    differenceInMillis / (1000 * 60)
  );

  return differenceInMinutes;
}
