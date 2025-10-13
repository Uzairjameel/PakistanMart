import React, { useEffect, useState } from "react";
import Background from "../component/Background";
import Hero from "../component/Hero";
import Product from "./Product";
import OurPolicy from "../component/OurPolicy";
import NewLetterBox from "../component/NewLetterBox";
import Footer from "../component/Footer";

function Home() {
    let heroData = [
        {text1:'30% off limited offer',text2:'style that'},
        {text1:'Discover the bold of best fashion',text2:'Limited time Only!'},
        {text1:'Explore Our Best Collection',text2:'Shop Now!'},
        {text1:'Chose your perfect fashion Fit',text2:'Now on sale!'}
    ]
    let [heroCount,setHeroCount]=useState(0)

    useEffect(()=>{
        let interval = setInterval(() => {
            setHeroCount(prevCount => (prevCount===3?0:prevCount+1))
        }, 3000)
        return ()=> clearInterval(interval)
    },[])
    return(
        <div className="overflow-x-hidden relative top-[70px] pb-[70px] md:pb-0">
        <div className="w-[100vw] md:h-[50vh] sm:h-[30vh] lg:h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025]">
            <Background heroCount={heroCount}/>
            <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]}/>
        </div>
        <Product/>
        <OurPolicy/>
        <NewLetterBox/>
        <Footer/>
        </div>
    )
}

export default Home
