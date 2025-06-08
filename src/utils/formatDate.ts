export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
