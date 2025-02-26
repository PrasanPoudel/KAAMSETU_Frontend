import React , {useEffect} from 'react'

function SendMessage() {
   useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      }, []);
  return (
 <div className='flex flex-col justify-center items-center h-auto py-10 w-full md:mx-auto md:w-[80%]' >
<p className='text-3xl font-medium'>Send Message</p>
<p className='text-gray-500 text-xl'></p>
<form className='w-full flex flex-col mt-5 gap-4'>
  <div className='flex flex-col gap-4'>
    <div className='flex flex-col w-full gap-2'>
    <label className="text-xl font-medium">Name</label>
    <input type="text" className='border-2 border-black pl-2' />
    </div>
    <div className='flex flex-col w-full gap-2'>
    <label className="text-xl font-medium">Email Address</label>
    <input type="email" className='border-2 border-black pl-2'/>
    </div>
  </div>
  <div className='flex flex-col w-full gap-2'>
  <label className="text-xl font-medium">Message</label>
    <textarea className='h-[200px] border-2 border-black pl-2'/>
  </div>
  <button className='flex self-center justify-center items-center text-white w-full bg-sky-600 hover:bg-sky-700 md:px-2 px-1 py-2 rounded-md text-xl'>Submit</button>
</form>
 </div>
  )
}

export default SendMessage