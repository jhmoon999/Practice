//* June 16: Validate IP Address

// Write a function to check whether an input string is a valid IPv4 address or IPv6 address or neither.

// IPv4 addresses are canonically represented in dot-decimal notation, which consists of four decimal numbers, each ranging from 0 to 255, separated by dots ("."), e.g.,172.16.254.1;

// Besides, leading zeros in the IPv4 is invalid. For example, the address 172.16.254.01 is invalid.

// IPv6 addresses are represented as eight groups of four hexadecimal digits, each group representing 16 bits. The groups are separated by colons (":"). For example, the address 2001:0db8:85a3:0000:0000:8a2e:0370:7334 is a valid one. Also, we could omit some leading zeros among four hexadecimal digits and some low-case characters in the address to upper-case ones, so 2001:db8:85a3:0:0:8A2E:0370:7334 is also a valid IPv6 address(Omit leading zeros and using upper cases).

// However, we don't replace a consecutive group of zero value with a single empty group using two consecutive colons (::) to pursue simplicity. For example, 2001:0db8:85a3::8A2E:0370:7334 is an invalid IPv6 address.

// Besides, extra leading zeros in the IPv6 is also invalid. For example, the address 02001:0db8:85a3:0000:0000:8a2e:0370:7334 is invalid.

// Example 1:
// Input: IP = "172.16.254.1"
// Output: "IPv4"
// Explanation: This is a valid IPv4 address, return "IPv4".

// Example 2:
// Input: IP = "2001:0db8:85a3:0:0:8A2E:0370:7334"
// Output: "IPv6"
// Explanation: This is a valid IPv6 address, return "IPv6".

// Example 3:
// Input: IP = "256.256.256.256"
// Output: "Neither"
// Explanation: This is neither a IPv4 address nor a IPv6 address.
 
// Constraints:
// IP consists only of English letters, digits and the characters "." and ":".

/**
 * @param {string} IP
 * @return {string}
 */
var validIPAddress = function(IP) {
    if (IP.includes('.')) {
        IP = IP.split('.');
        if (IP.length !== 4) return "Neither";
        for (let i = 0; i < 4; i++) {
            let dec = IP[i];
            // if there are leading zeros, then lengths won't match
            if (dec.length !== parseInt(dec).toString().length) return "Neither";
            // if parseInt(dec) is not an integer, result is NaN
            if (isNaN(parseInt(dec))) return "Neither";
            // if parseInt(dec) is integer, but out of bounds
            if (parseInt(dec) < 0 || parseInt(dec) > 255) return "Neither";
        }
        return "IPv4";
    }
    if (IP.includes(':')) {
        IP = IP.split(':');
        if (IP.length !== 8) return "Neither";
        const hexString = '0123456789abcdefABCDEF';
        for (let i = 0; i < 8; i++) {
            let hex = IP[i];
            // cannot exceed 4 digits or be empty
            if (hex.length > 4 || hex.length < 1) return "Neither";
            // cannot have more than 1 leading zero
            if (parseInt(hex) !== 0 && (hex.slice(0, 2) === '00' || 
                hex.slice(0, 3) === '000')) return "Neither";
            // cannot have chars other than those in hexString
            for (let i = 0; i < hex.length; i++) {
                if (!hexString.includes(hex[i])) return "Neither";
            }
        }
        return "IPv6";
    }
    return "Neither";
};