import { createContext } from "react";


 export const AnimationContext=createContext()

 export const AnimationProvider=({children})=>{
    const heroVarient={
        hidden:{x:"-100vw"},
        visible:{x:0, transition:{duration:1,delay:0.5}},
       
    }
 


 return(
    <AnimationContext.Provider value={heroVarient}>
        {children}
    </AnimationContext.Provider>
 )}