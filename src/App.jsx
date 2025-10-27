import { createBrowserRouter, RouterProvider } from "react-router-dom"
import CodeRunner from "./components/editor/CodeRunner"
import { ThemeProvider } from "next-themes"
import Page404 from "./utils/Page404"
import Auth from "./components/auth/Auth"

const router=createBrowserRouter([
  {
    path:"/",
    element:<CodeRunner/>
  },{
    path:"/Auth",
    element:<Auth/>
  },{
    path:"*",
    element:<Page404/>
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
