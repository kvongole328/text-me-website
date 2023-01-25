import React from 'react'
import styles from '../style';
import {robot,iphone} from '../assets'
const Hero = () => (
    <section id ="home" className={`flex 
    md:flex-row flex-col `}>
        <div className={`flex-1 ${styles.flexStart}
        flex-col x1:px-0 sm:px-16 px-6`}>
            <div className ='flex flex-row justify-between items-center
            w-full'>
                <h1
    className="flex-1 font-poppins font-semibold
ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]"
  >
    Sometimes <br className="sm:block hidden" />{" "}
    <span className="text-gradient"> Texting </span> <br></br> Is easier
  </h1>
            </div>
            <p className={`${styles.paragraph} max-w-[47]`} >
            Powered by GPT, get anything answered right from your phone. You can ask for recipes, inspiration for your blog or even an email draft! 
            We think it's just easier to text. 
            
            </p>

        </div>
        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
            <img src={iphone} alt="billing" className="object-contain  h-[500px] w-[75%]  relative z-[5]" />

        </div>
        
    </section>

)

export default Hero