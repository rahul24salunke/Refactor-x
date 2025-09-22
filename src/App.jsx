import { createBrowserRouter, RouterProvider } from "react-router-dom"
import CodeRunner from "./components/editor/CodeRunner"
import { Code } from "lucide-react"
import AiModules from "./components/editor/AiModule"
import AiWorkspace from "./components/editor/AiModule"
import { ThemeProvider } from "next-themes"

const router=createBrowserRouter([
  {
    path:"/run",
    element:<CodeRunner/>
  },{
    path:"/",
    element:<AiModules/>
  }
])
function App() {

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light">
        <RouterProvider router={router}/>
      </ThemeProvider>
    </>
  )
}

export default App
