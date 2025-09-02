class NorthOddDiffusion {
    
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

    getNorthOddDiffusion() {
        
        if(this.isLetter(this.initText.charAt(0))){
            
          this.modulo = 26;
          this.strtIndex = 65;
            
      }else if(this.isDigit(this.initText.charAt(0))){
          
        this.modulo = 10;
        this.strtIndex = 48;
          
      }

        let text1Sum = 0, text2Sum = 0;
        let textTsum = 0;

        let mySign = 1;

        if (this._PalestineIndex % 2 == 0) {
            mySign = -1;
        }
        // left sum

        let aski = 0;
        for (let i = 0; i < this.initText.length; i++) {
            if (i != this._PalestineIndex) {
                aski = this.initText.charCodeAt(i) - this.strtIndex;
                if (i % 2 == 0) {
                    text1Sum = ((text1Sum + (mySign) * aski) % this.modulo + this.modulo) % this.modulo;
                } else {
                    text2Sum = ((text2Sum - (mySign) * aski) % this.modulo + this.modulo) % this.modulo;
                }
                /*if*/
            } else {
                continue;
            } // else for if

        }// for loop

        textTsum = (text1Sum + text2Sum) % this.modulo;

        let discardedChar = String.fromCharCode(textTsum + this.strtIndex);

        let dChar = this.initText.split("");
        dChar[this._PalestineIndex] = discardedChar;
        let myStr = dChar.join("");
        //clear array
        dChar.splice(0, dChar.length);
        // South diffusion function definition
        let a1 = 0, x1 = this.initText.charCodeAt(this._PalestineIndex) - this.strtIndex;
        let a2 = 0, x2 = 0;
        //let myStr = dChar.join("");
        // diffusion function
        for (let j = 0; j < myStr.length; j++) {
            x2 = myStr.charCodeAt(j) - this.strtIndex;
            a2 = ((-x2 + x1 - a1) % this.modulo + this.modulo) % this.modulo;
            dChar.push(String.fromCharCode(a2 + this.strtIndex));
            a1 = a2;
            x1 = x2;
        } // for loop for diffusion function

        return dChar.join("");
    }// getDiffusedText

    // get the first orbit of the iterated sequence
    getFirstOrbit() {
        this.initText = this.text;
        return this.getNorthOddDiffusion();
    }// first orbit

    // get orbit at specified index
    getOrbitAt(orbitIndex) {
        this.initText = this.text;
        let i = 1;
        while (true) {
            let orbit = this.getNorthOddDiffusion();
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
            orbitsInRange = this.getNorthOddDiffusion();
            document.getElementById("printText").value += i++ + ". " + orbitsInRange +String.fromCharCode(10);
            this.initText = orbitsInRange;
            range--;
            if (orbitsInRange == this.text) {
                break;
            }
        }
    }// printOrbitsInRange

    // print all of the orbits 
    printAllOrbits() {
        this.initText = this.text;
        let firstOrbit = this.getNorthOddDiffusion();
        let firstOrbitOdd = firstOrbit;
        document.getElementById("printText").value += 1 + ". " + firstOrbit +String.fromCharCode(10);
        this.initText = firstOrbit;
        let t = 2;
        while (true) {
            let orbitGen = this.getNorthOddDiffusion();
            if (firstOrbit == orbitGen) {
                break;
            } else if (firstOrbitOdd == orbitGen) {
                break;
            }
            document.getElementById("printText").value += t++ + ". " + orbitGen +String.fromCharCode(10);
            this.initText = orbitGen;
        }
    }// print all orbit

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
    format(message) {

            let letterCount = 0;
            let digitCount = 0;
        
            let myFormatArray = new Array();
            
            for (let i = 0; i < this.originalText.length; i++) {
                
                if(this.isLetter(this.originalText[i])){
                    
                          if (this.originalText[i] === this.originalText[i].toUpperCase()) {
                            myFormatArray.push(message[letterCount].toUpperCase());
                              letterCount++;
                              counter++;
                          } else {
                              myFormatArray.push(message[letterCount].toLowerCase());
                             letterCount++;
                              counter++;
                          }
                    
                }else if (this.isDigit(this.originalText[i])){
                    myFormatArray.push(message[digitCount]);
                   digitCount++;
                    counter++;
                }else{
                    myFormatArray.push(originalText[i]);
                    counter++;
                }
                
                
            }// for loop
        
//document.getElementById("demo").innerHTML=myFormatArray.join("");
        return myFormatArray.join("");
    }// format()
*/

}



