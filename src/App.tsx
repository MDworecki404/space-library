import './App.css'
import gargantua from './assets/gargantua.mp4'
import gsap from 'gsap'
import * as React from 'react'
import {useRef} from 'react'
function App() : JSX.Element {

    const showButton = (e: React.FormEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        const searchButton = document.querySelector('.button-51') as HTMLButtonElement | null;
        if(searchButton && text.length>0){
            gsap.fromTo(searchButton, {autoAlpha: 0, opacity: 0, duration: 0.0, ease: 'linear'}, {autoAlpha: 1, opacity: 1, duration:0.3, ease: 'linear'});
        }
        if(searchButton && text.length==0){
            gsap.fromTo(searchButton, {autoAlpha:1, duration: 0.0, ease: 'linear'}, {autoAlpha: 0, duration: 0.3, ease: 'linear'})
        }
    }
    const searchRef = useRef<HTMLInputElement>(null);
    const fetchData = ():void => {

        if(searchRef.current) {
            const query = searchRef.current.value


            fetch(`https://images-api.nasa.gov/search?q=${query}`)
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.log(`Failed to fetch data: ${err}`))
            }
    }
    return (
        <>
            <video autoPlay muted loop className={"gargantua"}>
                <source src={gargantua}></source>
            </video>
            <div className={'Main'}>
                <input ref={searchRef} onChange={showButton} type={'search'} placeholder={'What are you looking for in space?'}/>
                <button  onClick={fetchData} className="button-51" role="button">Search</button>
            </div>
        </>
  )
}

export default App
