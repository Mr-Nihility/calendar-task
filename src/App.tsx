import './App.css';
import Calendar from './components/Calendar/Calendar';
import Header from './components/Header/Header';

function App() {
    return (
        <>
            <>
                <div style={{
                    backgroundColor: "EEEFF1",
                    width: "100%",
                    height: "100%"
                }}>
                    <Header></Header>
                    <Calendar></Calendar>
                </div>
            </>
        </>
    )
}

export default App;
