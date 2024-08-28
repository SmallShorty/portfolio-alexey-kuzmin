
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProjectDetails from "./pages/ProjectDetails.jsx";
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/project/:id" element={<ProjectDetails/>}/>
                    {/*<Route path="*" element={<Error/>}/>*/}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
