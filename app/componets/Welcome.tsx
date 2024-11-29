import FavouriteCities from './FavouriteCities'
import CityLists from './CityLists'
import  "~/styles/welcome.css"

function Welcome() {
  return (
   <div className='p-4 m-8  flex flex-col items-center justify-center'>
    <h1 className='text-3xl text-white mb-4'>Welcome to the weather app <span className='gradientText font-semibold text-transparent bg-clip-text '> ipgautomotive</span></h1>

    {/* sun svg */}
    <h1 className='text-8xl text-center text-white font-bold w-[90%] '>Discover the Beauty of<br/> Every <span>F<span className="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span><span className='ml-24'>RECAST</span></span></h1>
    
    <div className='text-2xl text-white p-4 m-4 text-center'>
    <p>Let us guide you through sunshine, rain, or snow.</p>
   </div>


   <div className='flex gap-12 w-full items-center justify-center'>
      <FavouriteCities/>
      <CityLists/>
   </div>

   </div>
  )
}

export default Welcome

