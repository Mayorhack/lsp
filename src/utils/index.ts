export function formatDate(dateString: string) {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
