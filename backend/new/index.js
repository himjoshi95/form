import CryptoJS from "crypto-js";

const decrypt = (encryptedText, key, iv) => {
  // Convert Base64 string to CipherParams object
  const encrypted = CryptoJS.enc.Base64.parse(encryptedText);

  // Decrypt the text using AES with the given key and IV
  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: encrypted },
    CryptoJS.enc.Hex.parse(key), // Convert key from hex string to WordArray
    {
      iv: CryptoJS.enc.Hex.parse(iv), // Convert IV from hex string to WordArray
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );

  // Convert decrypted data to UTF-8 string
  return decrypted.toString(CryptoJS.enc.Utf8);
};

function stringToHex(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16);
    }
    return hex;
}

const myString = "ReligareRTA@125";
const hexString1 = stringToHex(myString);
const myString2 = "ReligareRTA@126";
const hexString2 = stringToHex(myString2);

console.log(hexString1, hexString2);  


const key = hexString1;  // Your key in hex format
const iv = hexString2;    // Your IV in hex format
const encryptedText = "sm5i08Fvk915Z9rl55ldoA==";  // Your encrypted text

const decryptedText = decrypt(encryptedText, key, iv);
console.log("----------------")
console.log(decryptedText);  // Decrypted plain text


