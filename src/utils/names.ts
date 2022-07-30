const allowedChars = 'abcdefghijklmnopqrstuwxyz-_%&.';

// trimName trims an username (nick) or a room name returning a sanitized string.
export const trimName = (name: string) => {
  let ret = '';
  for (const c of name) {
    if (allowedChars.includes(c)) ret += c;
  }
  return ret;
};
