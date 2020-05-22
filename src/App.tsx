import React, {FunctionComponent} from 'react';
import './App.scss';
import Map from './components/Map/Map';
import Countries from "./components/Countries/Countries";

const App: FunctionComponent = () => {


    return (
        <div className="App">
            <div className="container">
                <Countries />
                <Map />
            </div>
        </div>
    );
}

export default App;
