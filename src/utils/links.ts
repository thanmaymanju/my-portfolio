export function isPlaceholderValue(value: string | undefined | null): boolean {
  if (!value) return true;
  const trimmed = value.trim();
  if (!trimmed) return true;
  return trimmed.startsWith("[") && trimmed.endsWith("]");
}

export function isValidExternalOrLocalUrl(value: string | undefined | null): boolean {
  if (isPlaceholderValue(value)) return false;
  const trimmed = value!.trim();
  return (
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("mailto:")
  );
}
