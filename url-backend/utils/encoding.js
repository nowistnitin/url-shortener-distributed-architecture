const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base = characters.length;

const encodeBase62 = (num) => {
  let encoded = '';
  while (num > 0) {
    encoded = characters[num % base] + encoded;
    num = Math.floor(num / base);
  }
  // Return '0' for num = 0
  return encoded || '0';  
};

module.exports = {
  encodeBase62
};