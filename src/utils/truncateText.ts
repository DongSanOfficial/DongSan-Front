/**
 * 문자열이 지정된 최대 길이를 초과하면 말줄임표(...)를 붙여 자름
 *
 * @param text 원본 문자열
 * @param maxLength 최대 허용 길이
 * @returns 잘린 문자열 또는 원본 문자열
 */
export function truncateText(
  text: string | undefined,
  maxLength: number
): string {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
