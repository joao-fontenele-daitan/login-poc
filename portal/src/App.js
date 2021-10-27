import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Home from "./Home";
import './App.css';
import LoginForm from "./LoginForm";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route path="/login"><LoginForm /></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
