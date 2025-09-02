class Vigenere {
    constructor(input, key){
        this.input = input;
        this.key = key;
    }

// Vigenere cipher encryption letters
 getEncryptedLetters() {
     
     let output = "";
this.input = this.input.toUpperCase();
     this.key = this.key.toUpperCase();
    if (!this.input || !this.key) {
        alert("Please enter both text and key.");
        return;
    }

    const keyRepeated = this.getRepeatedKey();

    for (let i = 0; i < this.input.length; i++) {
        let charCode = this.input.charCodeAt(i);
        // A-Z
            let encryptedChar = String.fromCharCode(((charCode - 65 + (keyRepeated.charCodeAt(i) - 65)) % 26) + 65);
            output += encryptedChar;
    }

    return output;
}
    // Vigenere cipher encryption digits
    getEncryptedDigits() {
     
     let output = "";

    if (!this.input || !this.key) {
        alert("Please enter both text and key.");
        return;
    }

    const keyRepeated = this.getRepeatedKey();

    for (let i = 0; i < this.input.length; i++) {
        let charCode = this.input.charCodeAt(i);
        // A-Z
            let encryptedChar = String.fromCharCode(((charCode - 48 + (keyRepeated.charCodeAt(i) - 48)) % 10) + 48);
            output += encryptedChar;
    }

    return output;
}

// Vigenere cipher decryption
 getDecryptedLetters() {
    
    let output = "";

     this.input = this.input.toUpperCase();
     this.key = this.key.toUpperCase();
     
    if (!this.input || !this.key) {
        alert("Please enter both text and key.");
        return;
    }

    const keyRepeated = this.getRepeatedKey();

    for (let i = 0; i < this.input.length; i++) {
        let charCode = this.input.charCodeAt(i);
            let decryptedChar = String.fromCharCode(((charCode - 65 - (keyRepeated.charCodeAt(i) - 65) + 26) % 26) + 65);
            output += decryptedChar;
    }

    return output;
}
    
    // Vigenere cipher decryption
 getDecryptedDigits() {
    
    let output = "";

    if (!this.input || !this.key) {
        alert("Please enter both text and key.");
        return;
    }

    const keyRepeated = this.getRepeatedKey();

    for (let i = 0; i < this.input.length; i++) {
        let charCode = this.input.charCodeAt(i);
            let decryptedChar = String.fromCharCode(((charCode - 48 - (keyRepeated.charCodeAt(i) - 48) + 10) % 10) + 48);
            output += decryptedChar;
    }

    return output;
}
    
    // Function to repeat the key to match the length of the message
 getRepeatedKey() {
    let keyRepeated = this.key;
    while (keyRepeated.length < this.input.length) {
        keyRepeated += this.key;
    }
    return keyRepeated.slice(0, this.input.length);
}
    
}// class