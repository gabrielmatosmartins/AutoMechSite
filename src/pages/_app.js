import { ChakraProvider } from "@chakra-ui/react";
import { SidebarProvider } from "../contexts/SidebarContext";
import '../css/styles.css'



function MyApp({ Component, pageProps }) {

  setTimeout(() => {
    getUrlParams()
  }, 1500)

  function getUrlParams(){
    let url = new URLSearchParams(window.location.search)
    var tipo = url.get("tipo")
    var id = url.get("id")
    
    localStorage.setItem("id", id)
    localStorage.setItem("tipo", tipo)
  }

  return (
    <ChakraProvider>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </ChakraProvider>
  );
}

export default MyApp;
