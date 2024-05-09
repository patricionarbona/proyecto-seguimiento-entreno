import { useState } from "react"

export default function Carousel({children: slides}) {
    const [ curr, setCurr] = useState(0)

    const prev = () => setCurr(curr => curr === 0 ? slides.length - 1 : curr - 1)
    const next = () => setCurr(curr => curr === slides.length - 1 ?  0 : curr + 1)
    return (
        <div className="overflow-hidden relative">
            <div className="flex transition-transform ease-out duration-500" style={{transform: `translateX(-${curr * 100}%)`}}>{slides}</div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button onClick={prev} className="p-1 rounded-full shadow bg-white-80 text-gray-800 hover:bg-white">
                    <svg className="w-20 h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  color="#000000" fill="none">
                        <path d="M10 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.41415 13.6026L6.38058 14.3639C7.94638 15.5974 8.72928 16.2141 9.36464 15.9328C10 15.6515 10 14.6881 10 12.7613V11.2387C10 9.31191 10 8.34853 9.36464 8.06721C8.72928 7.7859 7.94638 8.40264 6.38059 9.63612L5.41415 10.3974C4.47138 11.1401 4 11.5115 4 12C4 12.4885 4.47138 12.8599 5.41415 13.6026Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button onClick={next} className="p-1 rounded-full shadow bg-white-80 text-gray-800 hover:bg-white">
                <svg className="w-20 h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000" fill="none">
                    <path d="M14 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.5859 13.6026L17.6194 14.3639C16.0536 15.5974 15.2707 16.2141 14.6354 15.9328C14 15.6515 14 14.6881 14 12.7613L14 11.2387C14 9.31191 14 8.34853 14.6354 8.06721C15.2707 7.7859 16.0536 8.40264 17.6194 9.63612L18.5858 10.3974C19.5286 11.1401 20 11.5115 20 12C20 12.4885 19.5286 12.8599 18.5859 13.6026Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </button>
            </div>
        </div>
    )
}