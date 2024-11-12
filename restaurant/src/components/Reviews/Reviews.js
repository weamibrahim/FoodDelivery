import React from 'react'
import "./reviews.css"
export default function Reviews() {
  return (
    <div className='container mt-16 p-5 min-h-screen m-auto '>
      <h2 className='font-semibold text-3xl my-10 title'>What our customers say?</h2>

<div class="  grid  mb-8  gap-3  rounded-lg shadow-sm  lg:grid-cols-4 md:mb-12  md:grid-cols-2">
    <figure class=" flex flex-col bg-orange-100 items-center justify-center p-8 text-center border  border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg   ">
        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 ">Very easy this was to integrate</h3>
            <p class="my-4">If you care for your time, I hands down would go with this."</p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile"/>
            <div class="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
                <div>Bonnie Green</div>
                <div class="text-sm text-gray-600">Developer at Open AI</div>
            </div>
        </figcaption>    
    </figure>
    <figure class="flex flex-col items-center bg-orange-100  justify-center p-8 text-center    md:rounded-se-lg ">
        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-600 lg:mb-8 ">
            <h3 class="text-lg font-semibold text-gray-900 ">Solid foundation for any project</h3>
            <p class="my-4">Designing with Figma components that can be easily translated to the utility classes of Tailwind CSS is a huge timesaver!"</p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile "/>
            <div class="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
                <div>Roberta Casas</div>
                <div class="text-sm text-gray-600">Lead designer at Dropbox</div>
            </div>
        </figcaption>    
    </figure>
    <figure class="flex flex-col items-center bg-orange-100  justify-center p-8 text-center    md:rounded-es-lg md:border-b-0   ">
        <blockquote class="max-w-2xl mx-auto mb-4  lg:mb-8 text-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 ">Mindblowing workflow</h3>
            <p class="my-4">Aesthetically, the well designed components are beautiful and will undoubtedly level up your next application."</p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="profile "/>
            <div class="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
                <div>Jese Leos</div>
                <div class="text-sm text-gray-600">Software Engineer at Facebook</div>
            </div>
        </figcaption>    
    </figure>
    <figure class="flex flex-col items-center bg-orange-100  justify-center p-8 text-center  rounded-b-lg md:rounded-se-lg ">
        <blockquote class="max-w-2xl mx-auto mb-4  lg:mb-8 text-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 ">Efficient Collaborating</h3>
            <p class="my-4">You have many examples that can be used to create a fast prototype for your team."</p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="profile "/>
            <div class="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
                <div>Joseph McFall</div>
                <div class="text-sm text-gray-600">CTO at Google</div>
            </div>
        </figcaption>    
    </figure>
</div>

    </div>
  )
}
