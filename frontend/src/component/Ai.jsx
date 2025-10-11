import React, { useContext, useRef, useState } from "react";
import ai from '../assets/ai.png'
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import open from '../assets/open.mp3'
import beep from '../assets/beep.mp3' // ✅ Apni beep.mp3 file src/assets/ me rakho

function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext)
  const navigate = useNavigate()

  // 🎨 Button animation ke liye state
  const [listening, setListening] = useState(false)

  // ✅ Sounds (ek hi baar create hon)
  const openingSound = useRef(new Audio(open))
  const beepSound = useRef(new Audio(beep))

  // ✅ AI bolne ka function
  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterence)
  }

  // ✅ Speech recognition setup
  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new speechRecognition()

  if (!recognition) {
    console.log("Speech recognition not supported in this browser")
  }

  recognition.continuous = false
  recognition.lang = "en-US"

  let handled = false

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase()
    console.log("Heard:", transcript)

    handled = true // kuch bola gaya

    if (transcript.includes('search') && transcript.includes('open') && !showSearch) {
      speak('Opening search')
      setShowSearch(true)
      navigate('/collection')
    }
    else if (transcript.includes('search') && transcript.includes('close') && showSearch) {
      speak('Closing search')
      setShowSearch(false)
    }
    else if (transcript.includes('collection') || transcript.includes('collections') || transcript.includes('product') || transcript.includes('products')) {
      speak('Opening collection page')
      navigate('/collection')
      setShowSearch(false)
    }
    else if (transcript.includes('about') || transcript.includes('aboutpage')) {
      speak('Opening about page')
      navigate('/about')
      setShowSearch(false)
    }
    else if (transcript.includes('home') || transcript.includes('homepage')) {
      speak('Opening home page')
      navigate('/')
      setShowSearch(false)
    }
    else if (transcript.includes('cart') || transcript.includes('kaat') || transcript.includes('caat')) {
      speak('Opening your cart')
      navigate('/cart')
      setShowSearch(false)
    }
    else if (transcript.includes('contact')) {
      speak('Opening contact page')
      navigate('/contact')
      setShowSearch(false)
    }
    else if (transcript.includes('order') || transcript.includes('orders') || transcript.includes('my order')) {
      speak('Opening your orders page')
      navigate('/order')
      setShowSearch(false)
    }
    else {
      handled = false
      speak("Please try again")
      toast.error("Try again")
    }
  }

  recognition.onend = () => {
    // 🎤 Mic band hone par animation hatao
    setListening(false)

    setTimeout(() => {
      if (!handled) {
        speak("Please try again")
        toast.error("Try again")
      }
      handled = false
    }, 400)
  }

  recognition.onerror = (err) => {
    console.log("Speech error:", err)
    setListening(false)
    speak("Please try again")
    toast.error("Try again")
    handled = false
  }

  // ✅ Button click par AI start
  const handleClick = () => {
    // 1️⃣ Button glow + size animation on
    setListening(true)

    // 2️⃣ Beep bajao
    beepSound.current.play().catch(() => console.log("Beep blocked"))

    // 3️⃣ Phir open sound bajao
    setTimeout(() => {
      openingSound.current.play().catch(() => console.log("Opening sound blocked"))
    }, 300)

    // 4️⃣ Speech recognition start karo
    setTimeout(() => {
      recognition.start()
      console.log("🎙️ Listening started...")
    }, 700)
  }

  return (
    <div
      className={`fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] transition-all duration-500 cursor-pointer`}
      onClick={handleClick}
    >
      <img
        src={ai}
        alt="AI Assistant"
        className={`w-20 h-20 rounded-full border-[3px] border-[#00B8D9] transition-all duration-500 
          ${listening
            ? 'scale-125 shadow-[0_0_25px_#00B8D9,0_0_50px_#00B8D9]'
            : 'scale-100 shadow-lg'
          }`}
      />
    </div>
  )
}

export default Ai
