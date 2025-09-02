class Palestine{
    constructor(input, key){
        this.input = input;
        this.key = key;
    }

    getEncryptedLetters(){
        let outputL = '';
        if (this.isLetter(this.input[0]) && this.isLetter(this.key[0])) { 
            this.input = this.input.toUpperCase();
            this.key = this.key.toUpperCase();
          for (let i = 0; i < this.input.length; i++) {
           let charCode = this.input.charCodeAt(i);
             //A-Z
              let encryptedChar = String.fromCharCode(((charCode - 65 + (this.key.charCodeAt(i) - 65)) % 26) + 65);
               outputL += encryptedChar;
           } //for
         }else{
            alert('Ensure you provided plaintext letters and letters key');
        }
        return outputL;
    }// getEncryptedText()
    
    getEncryptedDigits(){
        let outputD = '';
        if(this.isDigit(this.input[0])){
            for (let i = 0; i < this.input.length; i++) {
              let charCode = this.input.charCodeAt(i);
              // 1-10
              let encryptedChar = String.fromCharCode(((charCode - 48 + (this.key.charCodeAt(i) - 48)) % 10) + 48);
               outputD += encryptedChar;
           } //for
        } else{
            alert('Ensure you provided plaintext digits and digits key');
        }
        return outputD;
    } //getEncryptedDigits()
    
    getDecryptedLetters(){
        let outputL = '';
        if (this.isLetter(this.input[0]) && this.isLetter(this.key[0])) { 
            this.input = this.input.toUpperCase();
            this.key = this.key.toUpperCase();
         for (let i = 0; i < this.input.length; i++) {
           let charCode = this.input.charCodeAt(i);
              // A-Z
              let decryptedChar = String.fromCharCode(((charCode - 65 - (this.key.charCodeAt(i) - 65) + 26) % 26) + 65);
               outputL += decryptedChar;
           } // for
         } else{
            alert('Ensure you provided plaintext letters and letters key');
        }
       return outputL; 
    } // getDecryptedText()
    
    getDecryptedDigits(){
        let outputD = '';
        if(this.isDigit(this.input[0])&&this.isDigit(this.key[0])){
            for (let i = 0; i < this.input.length; i++) {
              let charCode = this.input.charCodeAt(i);
              // 1-10
              let decryptedChar = String.fromCharCode(((charCode - 48 - (this.key.charCodeAt(i) - 48) + 10) % 10) + 48);
               outputD += decryptedChar;
           } // for
        }else{
            alert('Ensure you provided plaintext digits and digits key');
        }
        return outputD;
    } //
    
    // Checks if given character is a letter
    isLetter(myChar){
        myChar = myChar.toUpperCase();
        let result = false;
          if(myChar.charCodeAt(0) >= 65 && myChar.charCodeAt(0) <= 91){
            
              result = true;
            }
        return result;
    }
    
    isDigit(myChar){
       let result = false;
          if(myChar.charCodeAt(0) >= 48 && myChar.charCodeAt(0) <= 57){
            
              result = true;
            }
        return result;
   }
    
}// class Palestine

