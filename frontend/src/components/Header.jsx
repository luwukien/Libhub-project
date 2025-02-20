import React, { useState } from "react";

const Header = () =>{
    return(
        <>
            <header className="font-KumbhSans">
                <nav className="flex justify-between items-center relative py-1 font-bold drop-shadow-sm
                bg-slate-50 h-[70px]">
                    <div className="basis-1/6 lg:basis-2/6 lg:mx-auto">  
                        <a href="#" className="inline-flex items-center justify-center w-auto h-auto relative">    
                            <img className="w-36 lg:h-auto" src="public/Lib-hub.svg" alt="Logo-lib-hub"/>
                        </a>
                    </div>  
                    <ul id="ct-top-menu" className="basis-3/6 hidden lg:flex lg:justify-center lg:items-center lg:gap-12" >
                        <li>
                            <a className="ct-top-menu-item " href="#">Home</a>
                        </li>
                        <li>
                            <a className="ct-top-menu-item" href="#">About Us</a>
                        </li>
                        <li>
                            <a className="ct-top-menu-item" href="#">Book</a>
                        </li>
                        <li>
                            <a className="ct-top-menu-item" href="#">Contact Us</a>
                        </li>
                        <li>
                            
                        </li>
                        <li>
                            <a className="" href="#">
                                <img className="basis-1/6 w-10 h-10 p-1 rounded-full ring-2 ring-pornhub-200 drop-shadow-md hover:ring-pornhub-300 duration-300 hover:shadow-black" src="public/default-avatar.png" alt="avatar-user" />
                            </a>
                        </li> 
                    </ul>
                    
                    <div className="basis-1/6 lg:hidden flex items-center cursor-pointer px-3 sm:px-8">
                    <svg id="ct-toggle-top-menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                    </div>

                </nav>
            </header>  {/*End Header*/}
        
        </>
    )
}

export default Header