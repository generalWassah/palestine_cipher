// LeftWardDiffusion Class
class LeftWardDiffusion{ // LeftWardDiffusion class
        
        constructor(message, _NEWSFunction, _PI){
            this.message = message;
            this._NEWSFunction = _NEWSFunction;
            this._PalestineIndex = _PI;
            this.originalMessage = this.message;
           
        }
               
     getLeftWardDiffusion(){
        
        let newDiffusedText = '';
        let leftWardDiffused;
          
            let strLen = this.message.length;
            let maxIter = Math.floor(strLen / 2); //maximum iteration for the while loop

            let start = strLen-2;
            let end = strLen;

          if(strLen%2==1){
              start--;
          }
            let iter=maxIter;
        
            while(iter>0){

                let extract = this.message.substring(start,end);
                // diffuse collected subText
                newDiffusedText = newsDiffuseExtract(extract, this._NEWSFunction, this._PalestineIndex);

                //replace corresponding newDiffusedText into newText
                let textInChars = this.message.split('');
                let start1 = start;
                let dLen = newDiffusedText.length;
                let j=0;
               while(dLen>0){
                    //replace String with diffused txt at
                   textInChars[start1] = newDiffusedText[j];
                   start1++;
                   j++;
                   dLen--;
                }//while
                this.message = textInChars.join('');
                start-=2;
                iter--;

            }// while
              leftWardDiffused = this.message;
            return leftWardDiffused;
    }
        
        // get first orbit of the iterated sequence
        getFirstOrbit(){
          this.message = this.originalMessage;
          return this.getLeftWardDiffusion();
     }
       // returns the last orbit of the iterated sequence
    getLastOrbit(){
        this.message = this.originalMessage;
        let msgLen = this.message.length;
       let lastOrbit="";
      if(functionDiff=="N" || functionDiff=="NR"){
        if (functionDiff=="N"){
            if(msgLen%2==0){
                let leftWardReversedDiff = new LeftWardReversedDiffusion(this.message, 'S', this._PalestineIndex);
                lastOrbit = leftWardReversedDiff.getFirstOrbit();
            }else{
                let leftWardReversedDiff = new LeftWardReversedDiffusion(this.message, 'NR', this._PalestineIndex);
                lastOrbit = leftWardReversedDiff.getFirstOrbit();
            }
        } else if(functionDiff=="NR"&&msgLen%2==1){
            let leftWardReversedDiff = new LeftWardReversedDiffusion(this.message, 'N', this._PalestineIndex);
            lastOrbit = leftWardReversedDiff.getFirstOrbit();
        }
      }else if(functionDiff=="E" || functionDiff=="ER"){
        if (functionDiff=="E"){
            if(msgLen%2==0){
                let leftWardReversedDiff = new LeftWardReversedDiffusion(this.message, 'W', this._PalestineIndex);
                lastOrbit = leftWardReversedDiff.getFirstOrbit();
            }else{
                let leftWardReversedDiff = new LeftWardReversedDiffusion(this.message, 'ER', this._PalestineIndex);
                lastOrbit = leftWardReversedDiff.getFirstOrbit();
            }
        }else if (functionDiff=="ER"&&msgLen%2==1){
            let leftWardReversedDiff = new LeftWardReversedDiffusion(this.message, 'E', this._PalestineIndex);
            lastOrbit = leftWardReversedDiff.getFirstOrbit();
        }
      }else if(functionDiff=="W" || functionDiff=="WR"){
        if (functionDiff=="W"){
            if(msgLen%2==0){
                let leftWardReversedDiff = new LeftWardReversedDiffusion(this.message, 'E', this._PalestineIndex);
                lastOrbit = leftWardReversedDiff.getFirstOrbit();
            }else{
                let leftWardReversedDiff = new LeftWardReversedDiffusion(this.message, 'WR', this._PalestineIndex);
                lastOrbit = leftWardReversedDiff.getFirstOrbit();
            }
        }else if (functionDiff=="WR"&&msgLen%2==1){
            let leftWardReversedDiff = new LeftWardReversedDiffusion(this.message, 'W', this._PalestineIndex);
            lastOrbit = leftWardReversedDiff.getFirstOrbit();
        }
      }else if(functionDiff=="S" || functionDiff=="SR"){
        if (functionDiff=="S"){
            if(msgLen%2==0){
                let leftWardReversedDiff = new LeftWardReversedDiffusion(this.message, 'N', this._PalestineIndex);
                lastOrbit = leftWardReversedDiff.getFirstOrbit();
            }else{
                let leftWardReversedDiff = new LeftWardReversedDiffusion(this.message, 'SR', this._PalestineIndex);
                lastOrbit = leftWardReversedDiff.getFirstOrbit();
            }
        }else if (functionDiff=="SR"&&msgLen%2==1){
            let leftWardReversedDiff = new LeftWardReversedDiffusion(this.message, 'S', this._PalestineIndex);
            lastOrbit = leftWardReversedDiff.getFirstOrbit();
        }
     }
        return lastOrbit;
    }// last orbit
       
    // return orbit at specified index using one of NEWS function
     getOrbitAt(index){
        this.message = this.originalMessage;
        let i = 1;
        while(true) {
            let orbitsGen = this.getLeftWardDiffusion();
            if(i==index) {
                return orbitsGen;
            }
            this.message = orbitsGen;
            i++;
        }// while
    }// orbit at
       
       // print orbits up to specified range using one of NEWS function
     printOrbitsInRange(range){
        this.message = this.originalMessage;
        let diffusedText;
        let i = 1;
        while(range>0){
            diffusedText = this.getLeftWardDiffusion();
            document.getElementById('print').value= diffusedText+" "+i++;
            this.message = diffusedText;
            range--;
        }
    }// orbits up to
    // print all orbits
       
    printAllOrbits(){
        this.message = this.originalMessage;
        let t = 1;
        while(true){
            let orbitsGen = this.getLeftWardDiffusion();
            document.getElementById('print').value= orbitsGen+" "+t++;
            if(this.originalMessage==orbitsGen){
                break;
            }
            this.message=orbitsGen;
        }
    }// print all orbits
        
    } // LeftWardDiffusion class 
    