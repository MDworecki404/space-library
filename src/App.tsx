import './App.css';
import './App_mobile.css'
import './App_tablets.css'
import gargantua from './assets/gargantua.mp4'
import gsap from 'gsap'
import * as React from 'react'
import {useRef, useState} from 'react'

function App(): JSX.Element {

    const showButton = (e: React.FormEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        const searchButton = document.querySelector('.button-51') as HTMLButtonElement | null;
        if (searchButton && text.length > 0) {
            gsap.to(searchButton, {autoAlpha: 1, opacity: 1, duration: 0.3, ease: 'linear'});
        }
        if (searchButton && text.length == 0) {
            gsap.to(searchButton, {autoAlpha: 0, duration: 0.3, ease: 'linear'})
        }
    }


    const searchRef = useRef<HTMLInputElement>(null);
    const boxRef = useRef<HTMLDivElement>(null)
    const [image, setImage] = useState<string[]>([]);
    const [description, setDescription] = useState<string[]>([])
    const [err, setErr] = useState<string>('')
    const fetchData = (): void => {


        if (searchRef.current) {
            const query = searchRef.current.value
            setImage([])
            setDescription([])


            fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image`)
                .then((res) => res.json())
                .then((data) => {
                    const numbers: number[] = [];
                    while (numbers.length < 10) {
                        const randomNumber = Math.floor(Math.random() * 100);
                        if (!numbers.includes(randomNumber)) {
                            numbers.push(randomNumber);
                        }
                    }
                    console.log(numbers)
                    for (let i = 0; i < 10; i++) {
                        const imgHref = data.collection.items[numbers[i]].links[0].href
                        const descHref = data.collection.items[numbers[i]].data[0].description
                        if (!imgHref || !descHref) {
                            console.log('not found')
                        } else {
                            setErr('')
                            setImage(image => [...image, imgHref]);
                            setDescription(description => [...description, descHref])

                        }

                    }
                    gsap.to('.loading', {duration: 0.2, autoAlpha: 1,})
                    gsap.to('.fetchedDataBox', {y: 30, duration: 1, delay: 2});
                    gsap.to('.loading', {duration: 0.2, autoAlpha: 0, delay: 2.1});
                })
                .catch((err) => {
                    console.log(`Failed to fetch data: ${err}`);
                    setErr('nothing found')
                })
        }

    }
    const goBack = (): void => {
        gsap.to('.fetchedDataBox', {y: '-120%', duration: 0.3});
        setImage([])
        setDescription([])
    }

    return (<>
            <div className={'loading'}></div>
            <div className={'errMessage'}>{err}</div>
            <div ref={boxRef} className={'fetchedDataBox'}>
                <div className={'buttonDiv'}>
                    <button onClick={goBack}>go back</button>
                </div>
                <div className={"Box"}>

                    {image.map((img, index) => (<div key={index + 1000}>
                            <div key={index} className={'fetchedImage'}>
                                <img key={index + 5000} alt={'query image'} src={img}></img>
                            </div>

                            <div key={index + 2000} className={'fetchedDescription'}>
                                <article key={index + 3000}>{description[index]}</article>
                            </div>
                        </div>))}
                </div>
            </div>
            <video autoPlay muted loop className={"gargantua"}>
                <source src={gargantua}></source>
            </video>
            <div className={'Main'}>
                <input ref={searchRef} onChange={showButton} type={'search'}
                       placeholder={'What are you looking for in space?'}/>
                <button onClick={fetchData} className="button-51" role="button">Search</button>
            </div>
        </>)
}

export default App
