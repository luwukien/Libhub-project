import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RouterHandler = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const handleMessage = (event) => {
        // console.log("📩 [Web -> React] Full Event Data:", event);
        // console.log("📩 [Web -> React] Received:", event.data);
        if (event.data && event.data.type === "navigate") {
          navigate(event.data.url);
      }
        if (event.data?.type === "UnityMessage") {
          console.log("✅ Unity gửi:", event.data);
        }
      };
    
      window.addEventListener("message", handleMessage, false);
    
      const iframe = document.getElementById("game-frame");
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.addEventListener("message", handleMessage, false);
      }
    
      return () => {
        window.removeEventListener("message", handleMessage);
        iframe?.contentWindow?.removeEventListener("message", handleMessage);
      };
    }, []);
    
      

    return null; 
};

export default RouterHandler;
