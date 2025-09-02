class WestDiffusion {
    
    setMessage(message){
        this.originalText = message;
    }
    
    constructor(text, _PalestineIndex) {
        
        this.text = text.toUpperCase();
        this.initText;
        this._PalestineIndex = _PalestineIndex;
        
        this.modulo;
        this.strtIndex;
    }

    getWestSum() {
        
        let textNsum = 0, textPsum = 0;
        for (let i = 0; i < this.initText.length; i++) {
            let aski = this.initText.charCodeAt(i) - this.strtIndex;
            if (i % 2 == 0) {
                textPsum = ((textPsum + aski) % this.modulo + this.modulo) % this.modulo;
            } else {
                textNsum = ((textNsum - aski) % this.modulo + this.modulo) % this.modulo;
            }
        }// for loop for textNsum and textPsum
        let textTsum = (textNsum + textPsum) % this.modulo;
        return textTsum;
    }// getWestSum

    // West diffusion function
    getWestDiffusion() {
        
        if(this.isLetter(this.initText.charAt(0))){
            
          this.modulo = 26;
          this.strtIndex = 65;
            
      }else if(this.isDigit(this.initText.charAt(0))){
          
        this.modulo = 10;
        this.strtIndex = 48;
          
      }
        
        let textTsum = this.getWestSum();
        let a1 = 0, x1 = textTsum;
        let a2 = 0, x2 = 0;
        let dChar = new Array();
        // diffusion function
        for (let j = 0; j < this.initText.length; j++) {
            x2 = this.initText.charCodeAt(j) - this.strtIndex;
            a2 = ((x2 - x1 - a1) % this.modulo + this.modulo) % this.modulo;
            dChar.push(String.fromCharCode(a2 + this.strtIndex));
            a1 = a2;
            x1 = x2;
        } // for loop for diffusion function

        if (((this._PalestineIndex > -1) && (this._PalestineIndex < this.initText.length)) && (this.initText.length % 2 == 1)) {

            dChar[this._PalestineIndex] = String.fromCharCode(textTsum + this.strtIndex);

        }

        let westDiffusedText = dChar.join("");
        return westDiffusedText;
    }// getWestDiffusion

    // get the first orbit of the iterated sequence
    getFirstOrbit() {
        this.initText = this.text;
        return this.getWestDiffusion();
    }// first orbit

    // prints the last orbit of the iterated sequence
    /* getLastOrbit(){
        let west = new West(this.text);
        return west.getFirstOrbit();
    }
     */

    // get orbit at specified index
    getOrbitAt(orbitIndex) {
        this.initText = this.text;
        let orbit = "";
        let i = 1;
        while (true) {
            orbit = this.getWestDiffusion();
            if (i == orbitIndex || orbit === this.text) {
                return orbit;
            }
            this.initText = orbit;
            i++;
        }//while
    }// orbitAt

    // prints orbit from the first to the specified index
    printOrbitsInRange(range) {
        this.initText = this.text;
        let orbitsInRange = "";
        let i = 1;
        while (range > 0) {
            orbitsInRange = this.getWestDiffusion();
            document.getElementById("printText").value += i++ + ". " + orbitsInRange +String.fromCharCode(10);
            this.initText = orbitsInRange;
            range--;
            if (orbitsInRange === this.text) {
                break;
            }
        }
    }// printOrbitsInRange
    // print all of the orbits 
    printAllOrbits() {
        this.initText = this.text;
        let firstOrbit = "";
        let firstOrbitOdd = "";
        firstOrbit = this.getWestDiffusion();
        firstOrbitOdd = firstOrbit;
        document.getElementById("printText").value += 1 + ". " + firstOrbit +String.fromCharCode(10);
        this.initText = firstOrbit;
        let orbitGen = "";
        let t = 2;
        while (true) {
            orbitGen = this.getWestDiffusion();
            if (firstOrbit === orbitGen) {
                break;
            } else if (firstOrbitOdd === orbitGen) {
                break;
            }
            document.getElementById("printText").value += t++ + ". " + orbitGen +String.fromCharCode(10);
            this.initText = orbitGen;
        }
    }// print all orbit

    // prints texts that share same output i.e f(x) = f(y), x!=y
    printCollisions() {
        
        this.initText = this.text;
        
        if (this.initText.length % 2 === 1&&this.initText!=="") {
        let firstOrbit = this.getWestDiffusion();
            let sz;
        if(this.isLetter(this.initText.charAt(0))){
            
          this.modulo = 26;
          this.strtIndex = 65;
            sz = this.modulo - 1;
            
      }else if(this.isDigit(this.initText.charAt(0))){
          
        this.modulo = 10;
        this.strtIndex = 48;
          sz = this.modulo - 1;
      }
            
            let collisions = new Array();
            let textChars = new Array();
            // initializing the number of collision with 0 inclusive
            while (sz > -1) {
                let a1 = 0, x1 = sz;
                let a2 = 0, x2 = 0;
                // function to compute collisions
                for (let j = 0; j < firstOrbit.length; j++) {
                    x2 = firstOrbit.charCodeAt(j) - this.strtIndex;
                    a2 = ((x2 + x1 + a1) % this.modulo + this.modulo) % this.modulo;
                    textChars.push(String.fromCharCode(a2 + this.strtIndex));
                    a1 = a2;
                    x1 = x2;
                } // for loop
                collisions.push(textChars.join(""));
                textChars.splice(0, firstOrbit.length);
                if (sz === 0) {
                    break;
                }
                sz--;
            }// while loop
            for (let i = 0; i < this.modulo; i++) {
                document.getElementById("printText").value += i + 1 + ". " + collisions[i] + " ..." + i +String.fromCharCode(10);
            }
        } else {

            if(this.isLetter(this.initText[0])){
               alert("The letters are even and therefore have no collisions");
              }else if(this.isDigit(this.initText[0])){
               alert("The digits are even and therefore have no collisions");
            }

        }
    }// print collisions 

    extractLettersFrom(text){
        
        let extractedLetters ="";
        
        for(let i=0; i<text.length; i++){
            
          if(this.isLetter(text.charAt(i))){
            extractedLetters = extractedLetters+text.charAt(i);
            }else{
                continue;
            }
        }
        
        return extractedLetters;
    }
    
    isLetter(myChar){
        myChar = myChar.toUpperCase();
        let result = false;
          if(myChar.charCodeAt(0) >= 65 && myChar.charCodeAt(0) <= 91){
            
              result = true;
            }
        return result;
    }
    
    extractDigitsFrom(text){
      let extractedDigits ="";
        
        for(let i=0; i<text.length; i++){
            
          if(this.isDigit(text.charAt(i))){
            extractedDigits = extractedDigits+text.charAt(i);
            }else{
                continue;
            }
        }
        
        return extractedDigits;
  }
    
    isDigit(myChar){
     let result = false;
          if(myChar.charCodeAt(0) >= 48 && myChar.charCodeAt(0) <= 57){
            
              result = true;
            }
        return result;
   }
    /*
    format(textToFormat) {
        // checks if the length of the two strings are equal
        if (textToFormat.length > this.originalText.length) {
            alert("The text to format must be less than or equal to original text length");
            return false;
        } else {

            let count = 0;
            let myFormatArray = new Array();
            for (let i = 0; i < this.originalText.length; i++) {

                if (!this.isLetter(this.originalText[i])) {
                    myFormatArray.push(this.originalText[i]);
                    count++;
                } else {
                    if (this.originalText[i] === this.originalText[i].toUpperCase()) {
                      myFormatArray.push(textToFormat[i - count].toUpperCase());
                     } else {
                         myFormatArray.push(textToFormat[i - count].toLowerCase());
                     }
                }
            }// for loop

        }// else check equality
        return myFormatArray.join("");
    }// format()
*/

}// class




