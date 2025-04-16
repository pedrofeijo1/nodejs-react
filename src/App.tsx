import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/useAuth";
import {Toaster} from "@/components/ui/sonner.tsx";
import './index.css';

function App() {
  return (
    <>
      <UserProvider>
        <Outlet />
        <Toaster richColors position="top-right" expand={true}/>
      </UserProvider>
    </>
  );
}

export default App;
