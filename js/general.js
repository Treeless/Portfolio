// General helper functions

function getYearDifference(date1, date2) {
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25; // Approximate
  const date1Ms = new Date(date1).getTime();
  const date2Ms = new Date(date2).getTime();
  const diffInMs = Math.abs(date2Ms - date1Ms);
  const diffInYears = diffInMs / msPerYear;
  return diffInYears;
}