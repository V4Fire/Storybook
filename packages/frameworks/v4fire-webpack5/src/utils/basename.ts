/**
 * Returns basename for the path
 * @param path
 */
export default function basename(path: string): string {
  const match = /([^\\/]+)$/.exec(path);
  return match ? match[1] : '';
}