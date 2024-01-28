import { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


const d1 = new Date();

function App() {
  const d = new Date(); 
  const [tank1, setTank1] = useState(0)
  const [tank2, setTank2] = useState(0)
  const [tank3, setTank3] = useState(0)
  const [tank4, setTank4] = useState(0)
  let startTime = useRef(d1.getTime());
  async function EvenlySpreadOut() {
    console.log("hi", startTime.current - d.getTime(), d1.getTime());
    let total = tank1 + tank2 + tank3 + tank4;
    let average = Math.floor(total / 4);
    console.log("avg:", average); 
    let t1 = average - tank1;
    let t2 = average - tank2;
    let t3 = average - tank3;
    let t4 = average - tank4;
    let mxValue = Math.max(t1, t2, t3, t4, -t1, -t2, -t3, -t4);
    let totalTime = Math.round(mxValue / 25);
    if(totalTime === 0){
      return;
    }
    let v1 = t1 / totalTime;
    let v2 = t2 / totalTime;
    let v3 = t3 / totalTime;
    let v4 = t4 / totalTime;
    console.log("total", totalTime, mxValue);
    console.log(v1, v2, v3, v4);
    const updateTanks = async () => {
      setTank1(prevTank1 => prevTank1 + v1);
      setTank2(prevTank2 => prevTank2 + v2);
      setTank3(prevTank3 => prevTank3 + v3);
      setTank4(prevTank4 => prevTank4 + v4);
      if(totalTime){
        setTimeout(updateTanks, 1000);
      }
      totalTime--;
    };

    await updateTanks();
    setTank1(Math.round(tank1));
    setTank2(Math.round(tank2));
    setTank3(Math.round(tank3));
    setTank4(Math.round(tank4));
  }
    const handleMouseUp1 = async () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime.current;
      console.log(duration);
      setTank1(prevtank => Math.min(1000, prevtank + Math.floor((duration / 1000)) * 200));
      await EvenlySpreadOut();
    };
    const handleMouseDown1 = async() => {
      startTime.current = d.getTime();
      console.log("kya mai update hua?", startTime.current);
    };
  
    const handleMouseUp2 = async () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime.current;
      setTank2(prevtank => Math.min(1000, prevtank + Math.floor((duration / 1000)) * 200));
      await EvenlySpreadOut();
    };
  
    const handleMouseUp3 = async () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime.current;
      setTank3(prevtank => Math.min(1000, prevtank + Math.floor((duration / 1000)) * 200));
      await EvenlySpreadOut();
    };
  
    const handleMouseUp4 = async () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime.current;
      setTank4(prevtank => Math.min(1000, prevtank + Math.floor((duration / 1000)) * 200));
      await EvenlySpreadOut();
    };
    

  const handleClick1 = async () => {
    setTank1(0);
   // await EvenlySpreadOut();
  }

  const handleClick2 = async () => {
    setTank2(0);
   // await EvenlySpreadOut();
  }
  const handleClick3 = async () => {
    setTank3(0);
    //await EvenlySpreadOut();
  }
  const handleClick4 = async () => {
    setTank4(0);
    //await EvenlySpreadOut();
  }

  return (
    <>
      <div className='row'>
        <div className='col col-3'>
          tank 1
          <div>
            <button className='button1 btn btn-primary' onMouseDown={handleMouseDown1} onMouseUp={handleMouseUp1} >fill</button>
            <button className='button1 btn btn-primary' onClick = {handleClick1} >empty</button>
          
          </div>
          <div>
            {Math.round(tank1)}
          </div>
        </div>
        <div className='col col-3'>
          tank 2

          <div>
            <button className='button2 btn btn-primary' onMouseDown={handleMouseDown1} onMouseUp={handleMouseUp2}>fill</button>
            <button className='button2 btn btn-primary' onClick = {handleClick2}>empty</button>
          
          </div>
          <div>{Math.round(tank2)}</div>
        </div>
        <div className='col col-3'>
          tank 3
          <div>
            <button className='button3 btn btn-primary' onMouseDown={handleMouseDown1} onMouseUp={handleMouseUp3}>fill</button>
            <button className='button3 btn btn-primary' onClick = {handleClick3}>empty</button>
          
          </div>
          <div>{Math.round(tank3)}</div>
        </div>
        <div className='button4 col col-3'>
          tank 4
          <div>
            <button className='button4 btn btn-primary' onMouseDown={handleMouseDown1} onMouseUp={handleMouseUp4}>fill</button>
            <button className='button4 btn btn-primary' onClick = {handleClick4}>empty</button>
          
          </div>
          <div>{Math.round(tank4)}</div>
        </div>
      </div>
    </>
  )
}

export default App
