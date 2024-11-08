export const fetchProducts =async ()=>{
    try{
const response=await fetch('https://fooddelivery-ivory.vercel.app/api/food/')
if(!response.ok){
    throw new Error("failed to fetch")
}
const data =await response.json()
return data

    }
    catch(err){
        console.log("eror fetching",err)
    }
}