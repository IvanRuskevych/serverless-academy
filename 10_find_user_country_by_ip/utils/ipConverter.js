/**
 * Convert IP address to number/integer
 */
const ipConverter = (ip) => {
  const octets = ip.split(".");

  const numericArray = octets.map((octet) => parseInt(octet, 10)); // get array with numbers of octets

  const numericIP =
    (numericArray[0] << 24) |
    (numericArray[1] << 16) |
    (numericArray[2] << 8) |
    numericArray[3];
  return numericIP >>> 0;
};

module.exports = { ipConverter };
