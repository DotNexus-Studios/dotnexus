/** Assembled at runtime — not stored as a plain string in the bundle. */
export function getContactEmail(): string {
  const local = [
    0x68, 0x65, 0x6c, 0x6c, 0x6f,
  ].map((c) => String.fromCharCode(c ^ 0));
  const domain = [
    0x64, 0x6f, 0x74, 0x6e, 0x65, 0x78, 0x75, 0x73, 0x2e, 0x6e, 0x6c,
  ].map((c) => String.fromCharCode(c ^ 0));
  return `${local.join("")}@${domain.join("")}`;
}

export function openContactEmail() {
  window.location.href = `mailto:${getContactEmail()}`;
}
