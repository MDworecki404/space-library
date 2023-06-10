import './App.css'
import gargantua from './assets/gargantua.mp4'
function App() : JSX.Element {
    return (
        <>
            <video autoPlay muted loop className={"gargantua"}>
                <source src={gargantua}></source>
            </video>
            <div className={'Main'}>
                <input type={'search'} placeholder={'What are you looking for in space?'}/>
            </div>
        </>
  )
}

export default App
