import React from 'react';
import { useFirestoreDocData, useFirestore } from 'reactfire';

function Burrito() {
    const burritoRef = useFirestore()
        .collection('tryreactfire')
        .doc('burrito');

    const burrito = useFirestoreDocData(burritoRef);

    const burritoData = burrito.data;

    if(!burritoData) {
        return <p>No burrito yet fetched</p>
    }
    // @ts-ignore
    return <p>The burrito is {burritoData?.yummy ? 'good' : 'bad'}</p>;
}


function App() {
  return (
    <div className="App">
      <h1>APP works</h1>
            <Burrito />
    </div>
  );
}

export default App;
