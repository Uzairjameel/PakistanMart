import React from "react";
import clothes from '../assets/clothes.jpeg'
import clothes2 from '../assets/clothes2.jpeg'
import fancy from '../assets/fancy.jpeg'
import fancy1 from '../assets/fancy1.jpeg'

function Background({heroCount}) {
   
        if (heroCount===0) {
            return <img src={clothes} alt="" className="w-[100%] h-[100%] float-left overflow-auto object-cover"/>
        }else if(heroCount ===1){
            return <img src={clothes2} alt="" className="w-[100%] h-[100%] float-left overflow-auto object-cover"/>
        }
        else if(heroCount ===2){
            return <img src={fancy} alt="" className="w-[100%] h-[100%] float-left overflow-auto object-cover"/>
        }
        else if(heroCount ===3){
            return <img src={fancy1} alt="" className="w-[100%] h-[100%] float-left overflow-auto object-cover"/>
        }
    
}

export default Background