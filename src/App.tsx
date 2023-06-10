import './App.css'
import gargantua from './assets/gargantua.mp4'
import gsap from 'gsap'
import * as React from 'react'
import {useRef, useState} from 'react'
function App() : JSX.Element {

    const showButton = (e: React.FormEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        const searchButton = document.querySelector('.button-51') as HTMLButtonElement | null;
        if(searchButton && text.length>0){
            gsap.to(searchButton,  {autoAlpha: 1, opacity: 1, duration:0.3, ease: 'linear'});
        }
        if(searchButton && text.length==0){
            gsap.to(searchButton,  {autoAlpha: 0, duration: 0.3, ease: 'linear'})
        }
    }



    const searchRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState('');
    const [description,  setDescription] = useState(``)
    const fetchData = ():void => {


        if(searchRef.current) {
            const query = searchRef.current.value
            const randomValue: number = Math.round(Math.random()*100);
            setImage('')
            setDescription('')


            fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image`)
                .then((res) => res.json())
                .then((data) => {

                    setImage(data.collection.items[randomValue].links[0].href);
                    setDescription(data.collection.items[randomValue].data[0].description)
                })
                .catch((err) => console.log(`Failed to fetch data: ${err}`))
        }
        gsap.to('.fetchedDataBox', {y: 30, duration: 1});
    }
    const goBack = ():void =>{
        gsap.to('.fetchedDataBox', {y:'-120%', duration: 0.3});
        setImage('')
        setDescription('')
    }
    return (
        <>
            <div className={'fetchedDataBox'}>
                <div className={'fetchedImage'}>
                    <img src={image}></img>
                </div>
                <div className={'fetchedDescription'}>
                    <article>{description}</article>
                    <button onClick={goBack}>go back</button>
                </div>
            </div>
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
