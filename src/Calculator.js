import React, { useState} from "react";
import './calculator.css';

function Calculator() {
    const [value, setValue] = useState("");
    let [isStretched, setIsStretched] = useState(false);
    const [fade, setFade] = useState(false); // Use state for fade effect
    
    function AddtoString(char) {
        setValue(prev => prev + char);
    }

    // #array functions
    // #use State 
    // #XMPHTTP Response
    // #Fetch API 
    // #Axios
    // #call backs 
    // #primises
    // #async await
    // #how the rendering works in reactJs
    // #try catch 


    function evalValues() {
        let expEval = eval(value);

        setValue(expEval.toString());
    }

    function timeGap(duration) {
        return new Promise((resolve, reject)=>{
            try{
                setTimeout(resolve, duration);
            }
            catch{
                alert(reject);
            }
            
        })
    }

    let screenWipe = () => {
        timeGap(2300)
            .then(()=>{
                setIsStretched(false);
            })
            .catch("Error")
        return clearTimeout(timeGap);
    }
  

    // function screenWipe() {
    //     const timeoutId = setTimeout(() => {
    //         setIsStretched(false);
    //     }, 2300);
    //     return () => {
    //         clearTimeout(timeoutId);
    //     };
    // }
    
    console.log('Hi');

    function stretched() {
        setIsStretched(prev => !prev);
    }
   
    // function clear() {
        
    //     stretched();
    //     setTimeout(()=>{
            
    //         setTimeout(()=>{
    //             setFade(true)
    //             console.log("inside clear clicked",fade);
    //         }, 300)
    //         setTimeout(()=>{
    //             setValue('');
    //         }, 1000)
            
    //     }, 2000)
    //     screenWipe();
    //     setTimeout(()=>{
    //         setFade(false);
    //     }, 3301)
        
    // }

    let erase = () => {
        stretched();
        delay(2000) 
            .then((msg)=>{
                delay(300)
                    .then(()=>{
                        setFade(true);
                        console.log(`inside clear clicked ${msg}`, fade);
                     
                    })
                    .catch("300 second callBack")
                delay(1000)
                    .then(()=>{
                        setValue('');
                    })
                    .catch((error)=>{
                        alert(error);
                    })
               
            })
        .catch((error)=>{
            alert("this catch is working");
        })
        // delay(2000) 
        //     .then(()=>{
        //         return delay(300);
        //     })
        //     .then(()=>{
        //         setFade(true);
        //         console.log("inside clear clicked", fade);
                
        //         return delay(700);
        //     })
        //     .then(()=>{
        //         setValue('');
        //     })
        //     .catch("Error in 2 seconds setTimeOut function")
        screenWipe();
        delay(3301)
            .then(()=>{
                setFade(false);
            })
            .catch("Error in last setTimeOut function")
    }


    function delay(duration) {
        return new Promise((resolve,reject) => {
            try{
                setTimeout(resolve("ok"), duration);
                
            }
            catch{
               
                alert(reject) //not failed?
            }
            
        });
    }
    
    function clear() {
        stretched();
    
        delay(2000)
            .then(() => {
                return delay(300);
            })
            .then(() => {
                setFade(true);
                console.log("inside clear clicked", fade);
                return delay(700); // Wait for additional 700ms (total 1000ms from the start of this block)
            })
            .then(() => {
                setValue('');
                return delay(2301); // Wait for additional 2301ms (total 3301ms from the very beginning)
            })
            .then(() => {
                setFade(false);
            });
    
        screenWipe();
    }

    

    


    function back() {
        let newValue = value.substring(0, value.length - 1);
        setValue(newValue);
    }

    console.log(value);

    let disappearCalculator = false;
      
    // function btnDisappear() {
    // let root = document.getElementById('root');
    // if (disappearCalculator == false) {
    //     root.innerHTML = "";
    //     disappearCalculator = true;
    // } else {
    //     // Restore the initial content
    //     root.innerHTML = initialRootContent.innerHTML;
    //     disappearCalculator = false;
    // }
    // }

   
        return  (
        <>
            <button >Disappear Calculator</button>
            
            <div className={`calculator ${disappearCalculator ? "invisibility" : ""}`}>
                <div className="calculator-screen">
                    <div className={`stretchDiv ${isStretched ? 'stretched' : ''}`}>
                        
                    </div>
                    <div className={`result ${fade ? 'fade' : ''}`}>
                            {console.log("in actual div", fade)}
                            {value}
                    </div> 
                </div>
                <div className="button-container">
                <button onClick={erase} className="rounded white btn-size-rounded">!</button>
                <button onClick={stretched} className="rounded white btn-size-rounded">~</button>
                <button onClick={back} className="rounded yellow btn-size-rounded">/</button>
                <button onClick={clear} className="rounded yellow btn-size-rounded">c</button>
                </div>
                
                <div className="calculator-buttons">
                    <button onClick={() => AddtoString('7')} className="white">7</button>
                    <button onClick={() => AddtoString('8')} className="white">8</button>
                    <button onClick={() => AddtoString('9')} className="white">9</button>
                    <button onClick={() => AddtoString('/')} className="white">&divide;</button>
                    <button onClick={() => AddtoString('4')} className="white">4</button>
                    <button onClick={() => AddtoString('5')} className="white">5</button>
                    <button onClick={() => AddtoString('6')} className="white">6</button>
                    <button onClick={() => AddtoString('*')} className="white">x</button>
                    <button onClick={() => AddtoString('1')} className="white">1</button>
                    <button onClick={() => AddtoString('2')} className="white">2</button>
                    <button onClick={() => AddtoString('3')} className="white">3</button>
                    <button onClick={() => AddtoString('-')} className="white">-</button>
                    <button onClick={() => AddtoString('0')} className="white">0</button>
                    <button onClick={() => AddtoString('.')} className="white">.</button>
                    <button onClick={evalValues} className="white">=</button>
                    <button onClick={() => AddtoString('+')} className="white">+</button>
                </div>
                <div></div>
                </div>
        </>
        
    )
}
    
    


export default Calculator;