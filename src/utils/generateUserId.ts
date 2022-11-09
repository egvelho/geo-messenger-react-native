export function generateUserId() {
  return `${Math.round(Math.random() * 1000)}-${Math.round(
    Math.random() * 1000,
  )}-${Date.now().toString()}`;
}
