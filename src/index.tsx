import { AnyCnameRecord } from 'dns';
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react'; // Hooks
import ReactDOM from 'react-dom';

// this is the 'App' COMPONENT! -----------------------------------------------------------------------------
const App = () => {                          
  // States
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  // Initialize esbuild-wasm
  // const startService = async () => {      // this is an async func
  //   const service = await esbuild.startService({
  //     worker: true,                       // configuration object
  //     wasmURL: '/esbuild.wasm'
  //   });
  // };

  // use 'ref' instead of 'service' - import the 'useRef hook first'
  const startService = async () => {      // this is an async func
    ref.current = await esbuild.startService({ // ref.current replaces service
      worker: true,                       // configuration object
      wasmURL: '/esbuild.wasm'
    });
  };

  // use useEffect hook to call startService one single time
  useEffect(() => {
      startService();
  }, []);                                 // call startService only one single time & use of second argument of an empty array

  const onClick = () => {
    if(!ref.current){
      return;
    }
    console.log(ref.current);
  };

  return <div>
    <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <pre>{code}</pre>
  </div>

}; // App Component End ------------------------------------------------------------------------------------

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);