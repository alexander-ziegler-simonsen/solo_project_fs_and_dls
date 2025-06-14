import { Button } from '@chakra-ui/react';
import orsLogo from './assets/ors-192.png';
import { getData } from './helpers/HandleApiCalls';

function App() {

  const temp = () => { 
    console.log(getData("item")); 
  };
  
  return (
    <>
      <div>
        <img src={orsLogo} className="logo" alt="Online Rizz Shop logo" />
      </div>
      <h1>Online Rizz Shop - app page</h1>

      <p>
        {/* {JSON.stringify(temp)} */}
        <Button 
        onClick={ () => temp() } >test</Button>
      </p>
    </>
  )
}

export default App
