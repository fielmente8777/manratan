export function getDateInputLimits(options: {
  showPast?: boolean;
  showFuture?: boolean;
}) {
  const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'

  let min: string | undefined;
  let max: string | undefined;

  if (options.showPast && !options.showFuture) {
    max = today;
  } else if (!options.showPast && options.showFuture) {
    min = today;
  } else if (!options.showPast && !options.showFuture) {
    min = max = today;
  }

  return { min, max };
}
