import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../../components/layouts/Header";

const Home = () =>{

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [allBook, setAllBook] = useState(null);

    const getUserInfo = async () => {
        try{
            const response = await axiosInstance.get("/get-user");
            if(response.data && response.data.user){
                setUserInfo(response.data.user);
            }
        }catch(error){
            if(error.response.status === 401){
                localStorage.clear();
                navigate("/home");
            }
        }
    };

    useEffect(() => {
        getUserInfo();  
        return () => {
            
        }

        },[]
    )

    return(
        <>
            <header>
                <Navbar userInfo={userInfo}/>
            </header> 

            <main>
                <div className="relative flex flex-col items-center text-black text-center px-4 h-screen">
                    <fieldset className="w-full max-w-3xl items-center my-52 mx-auto">  
                    </fieldset>                    
                </div>                    
            </main> {/*End Body*/}

            <footer >
                Footer
            </footer> {/*End Footer*/}
        
        </>
    )
}

export default Home