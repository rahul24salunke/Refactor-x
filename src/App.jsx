import { createBrowserRouter, RouterProvider } from "react-router-dom"
import CodeRunner from "./components/editor/CodeRunner"
import { ThemeProvider } from "next-themes"
import Page404 from "./utils/Page404"

const router=createBrowserRouter([
  {
    path:"/",
    element:<CodeRunner/>
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
