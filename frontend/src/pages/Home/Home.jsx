import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
const Home = () =>{
    return(
        <>
            <Header />
            
            <main>
                <div className="relative flex flex-col items-center text-black text-center px-4 h-screen">
                    <fieldset className="w-full max-w-3xl items-center my-52 mx-auto">  
                        <h1 className="text-3xl font-bold mb-8">What book are you looking for?</h1>
                        {/* Search-bar */}
                        <div className="input-field relative w-full">
                            <button className="icon-search absolute top-1/2 -translate-y-1/2 flex justify-center items-center h-full w-16 hover:text-pornhub-200 hover:transition-colors ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>        
                            </button>
                            <input type="text" placeholder="Tittle book, author, ISBN, ..." className="w-full h-[70px] p-8 pl-16 rounded-full text-black focus:outline-none bg-gray-200 font-NunitoSans" />

                        </div>
                    </fieldset>                    
                </div>                    
            </main> {/*End Body*/}

        <Footer />        
        </>
    )
}

export default Home