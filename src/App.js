import { useEffect, useState } from 'react';
import './App.css';
import Data from './Data'
function App() {
  const[periodicTable, setPeriodicTable] = useState([ ])
  const[outerElements, setOuterElements] = useState([ ])
  const[info, setInfo] = useState(null)
  function getColor(color){
     if(color.indexOf("nonmetal") > -1) {
        return "nonmetal";
     } else if(color.indexOf("alkaline") > -1) {
      return "alkaline";
   } else if(color.indexOf("alkali") > -1) {
    return "alkali";
 } else if(color.indexOf("transition") > -1) {
  return "transition";
}else if(color.indexOf("basic") > -1) {
  return "basic";
} else if(color.indexOf("metalloid") > -1) {
  return "metalloid";
} else if(color.indexOf("halogen") > -1) {
  return "halogen";
} else if(color.indexOf("noble") > -1) {
  return "noble";
}
  } 
  useEffect(() => {
    async function getPeriodicTable(){
        const res = Data;
        let periodicTableCopy = [[], [], [], [], [], [], [],[]];
        let oEC = [[], []]
        res.data.map(element => {
          if ((element.number >=57 && element.number <= 71) || (element.number >=89 && element.number <= 103)) {
             if (element.number >=57 && element.number <= 71) {
                 oEC[0].push(element)
             } else if (element.number >=89 && element.number <= 103) {
              oEC[1].push(element)
          }
             if (element.number === 57 || element.number === 89){
              periodicTableCopy[element.period-1].push(false)
             }
          } else {
            periodicTableCopy[element.period-1].push(element)
            if (element.number===1){
                for (let i =0;i<16;i++){
                  periodicTableCopy[element.period-1].push(false)
                }
            } 
            if (element.number === 4 || element.number === 12) {
              for (let i =0;i<10;i++){
                periodicTableCopy[element.period-1].push(false)
              }
            }
          }
        })
        //console.log(oEC)
        setPeriodicTable(periodicTableCopy);
        setOuterElements(oEC);
        //console.log(periodicTable)
    }
    //console.log(periodicTable)
    getPeriodicTable();
  },[])
  return (
    <div className="mBody">
      
      {info ?(
        <div className='info'>
           <div className="infoBody">
           <button onClick={()=>{
                setInfo(null)
              }}>X</button>
              <br/>
              <h2>{info.name}({info.symbol}) · {info.category.toUpperCase()} · {info.number}</h2>
              <h3>PHASE: {info.phase}</h3>
              <h3>ATOMIC MASS: {info.atomic_mass} · ELECTRION CONFIGURATION: {info.electron_configuration}</h3>
              <h3>DENSITY: {info.density}</h3>
              <h3>DISCOVERED BY: {info.discovered_by}</h3>
              <h3>MELTING POINT: {info.melt} · BOILING POINT: {info.boil}</h3>
              <p>{info.summary}</p>
           </div>
           <div className="infoBody2">
           <button onClick={()=>{
                setInfo(null)
              }}>X</button>
              <br/>
              <p>{info.name}({info.symbol}) · {info.category.toUpperCase()} · {info.number}</p>
              <p>PHASE: {info.phase}</p>
              <p>ATOMIC MASS: {info.atomic_mass} · ELECTRION CONFIGURATION: {info.electron_configuration}</p>
              <p>DENSITY: {info.density}</p>
              <p>DISCOVERED BY: {info.discovered_by}</p>
              <p>MELTING POINT: {info.melt} · BOILING POINT: {info.boil}</p>
              <p className='miniTextSummary'>{info.summary}</p>
           </div>
        </div>
      ) : (
        <></>
      )}
      <h1>Periodic Table</h1>
      <br/>
      <div className="periodicTable">
      {periodicTable.map(period => (
           <div className="row" key={period[0].period}>
              {period.map(element => {
                if (element) {
                  return (
                    <>
                  {element.symbol !== "Uue" ? (
                    <div onClick={()=>{
                      setInfo(element);
                    }} className={`element ${getColor(element.category)}`} key={element.symbol}>
                    <div>
                    <p className="miniSymbol"><b>{element.symbol}</b></p>
                    <p className="miniText">{element.name}</p>
                    </div>
                  
                </div>
                  ) : (
                    <></>
                  )}
                  </>
                )
                } else {
                  return (
                  <div className="fakeElement" key={element.symbol}>                    
                  </div>
                  )
                }
                })}
           </div>
      ))}
      {outerElements.map(arr => {
        return (
          <div className="row" key={arr[0].period}>
                {arr.map(element => {
          if (element.number <= 71) {
            return(
              <div onClick={()=>{
                setInfo(element);
              }} className={`element lanthan`} key={element.symbol}>
                    <div>
                    <p className="miniSymbol"><b>{element.symbol}</b></p>
                    <p className="miniText">{element.name}</p>
                    </div>
                  
                </div>
            )
         } else {
          return(
            <div onClick={()=>{
              setInfo(element);
            }} className={`element actin`} key={element.symbol}>
                  <div>
                  <p className="miniSymbol"><b>{element.symbol}</b></p>
                  <p className="miniText">{element.name}</p>
                  </div>
                
              </div>
          )
         }
        })}
          </div>
        )
      })}
      </div>
      <div>
        <p>Created by: @github(danielhyuncoder)</p>
      </div>
    </div>
  );
}

export default App;
