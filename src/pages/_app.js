import { ChakraProvider } from "@chakra-ui/react";
import { SidebarProvider } from "../contexts/SidebarContext";
import '../css/styles.css'


export function MyApp({ Component, pageProps }) {
  return (
    <div className="normalBackground">
      <ChakraProvider>
        <SidebarProvider>
          <Component {...pageProps} />
        </SidebarProvider>
      </ChakraProvider>
    </div>
  );
}