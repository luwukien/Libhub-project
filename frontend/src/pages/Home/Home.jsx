// import React from "react";

const Home = () =>{
    return(
        <>
            <header className="font-KumbhSans">
                <nav className="flex justify-between items-center relative py-1 font-bold drop-shadow-sm
                bg-slate-50 h-[70px]">
                    <div className="logo basis-2/6 mx-auto">  
                        <a href="#" className="inline-flex items-center justify-center w-auto h-auto relative">    
                            <img className="w-36 h-auto" src="public/img/Lib-hub.svg" alt="Logo-lib-hub"/>
                        </a>
                    </div>  
                    <ul className="basis-3/6 flex justify-center items-center gap-12">
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
                                <img className="basis-1/6 w-10 h-10 p-1 rounded-full ring-2 ring-pornhub-300 drop-shadow-md hover:ring-orange-400 duration-300 shadow-orange-200 hover:" src="public/img/default-avatar.png" alt="avatar-user" />
                            </a>
                        </li> 
                    </ul>
                </nav>
            </header> 

            <main>
                
            </main> {/*End Body*/}

            <footer >
                Footer
            </footer> {/*End Footer*/}
        
        </>
    )
}

export default Home