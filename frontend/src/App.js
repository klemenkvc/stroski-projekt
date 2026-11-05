import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StrosekList from './komponente/StrosekList';
import StrosekObrazec from './komponente/StrosekObrazec';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/">Domača stran</Link>
                    <Link to="/dodaj">Dodaj nov strošek</Link>
                </nav>
                <main>
                    <Routes>
                        <Route path="/" element={<StrosekList />} />
                        <Route path="/dodaj" element={<StrosekObrazec />} />
                        <Route path="/uredi/:id" element={<StrosekObrazec />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;