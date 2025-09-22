import { createBrowserRouter, RouterProvider } from "react-router-dom"
import CodeRunner from "./components/editor/CodeRunner"
import { ThemeProvider } from "next-themes"

const router=createBrowserRouter([
  {
    path:"/",
    element:<CodeRunner/>
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
