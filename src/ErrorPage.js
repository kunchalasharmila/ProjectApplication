import { useNavigate } from "react-router-dom";

function ErrorPage(){
    const navigate = useNavigate();

    const BackToHome=()=>{
        navigate("/");
    }
    return(
    <>
        <h2>Oops page Not Found</h2>
        <h1>404 error</h1>
        <button onClick={BackToHome}>BackToHome</button>

    </> 
    );
}

export default ErrorPage;