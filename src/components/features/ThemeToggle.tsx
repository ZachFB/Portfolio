import { Button } from "../ui/button";
import { useTheme } from "./ThemeProvider"
import { Moon, Sun } from "lucide-react";


export const ThemeToggle = () => {
const {setTheme, theme} = useTheme();
   return (
    <div>
        <Button 
        size={"icon"}
        variant={"ghost"}
        className="border border-foreground"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
        {theme==="light" ? 
        <Moon size={16}/> 
        : 
        <Sun size={16}/>
        }
        </Button>
    </div>
  )
}
