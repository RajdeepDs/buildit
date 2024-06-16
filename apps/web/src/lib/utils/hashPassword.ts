export async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

export async function comparePasswords(
  enteredPassword: string,
  storedHash: string,
) {
  const hashedEnteredPassword = await hashPassword(enteredPassword);
  return hashedEnteredPassword === storedHash;
}
