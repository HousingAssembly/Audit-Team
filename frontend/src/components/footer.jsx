import { Link } from 'react-router-dom';

export default function Footer() {
  return ( 
    <div className="w-full bg-palette-red">
      <div className="flex flex-col items-center mx-12 space-y-2 sm:space-y-6 text-white py-5 sm:py-8">
        <div className="flex flex-row space-x-6">
          <div className="flex flex-row space-x-5 sm:space-x-10 flex-shrink-0 sm:mt-0 mt-[2px]">
            <Link to="https://www.instagram.com" target="_blank" rel="noopener norefferer"><img className="object-contain h-5 sm:h-10 w-auto" src="instagram.png" alt="Instragram Icon"/></Link>
            <Link to="https://www.facebook.com" target="_blank" rel="noopener norefferer"><img className="object-contain h-5 sm:h-10 w-auto" src="facebook.png" alt="Facebook Icon"/></Link>
            <Link to="https://www.twitter.com" target="_blank" rel="noopener norefferer"><img className="object-contain h-5 sm:h-10 w-auto" src="twitter.png" alt="Twitter Icon"/></Link>
            <Link to="https://www.youtube.com" target="_blank" rel="noopener norefferer"><img className="object-contain h-5 sm:h-10 w-auto" src="youtube.png" alt="Youtube Icon"/></Link>
          </div>
        </div>
        <div className="font-normal text-[13px] sm:text-[20px]">@2025 HouseAudit. All Right Reserved.</div>
      </div>  
    </div>
  );
}
