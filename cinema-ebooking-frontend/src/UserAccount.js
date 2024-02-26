import React from "react";
import './UserAccount.css';
import NavBar from "./components/NavBar";
import Button from '@mui/material/Button';

const UserAccount = () => {

    return(
        <>
            <NavBar />

            <form className="register">
                <h1> Account Details </h1>
                <fieldset className="row1">
                    <p>
                        <label> Email: </label>
                        <label> Example@mail.com </label>
                    </p>
                    <p>
                        <label> Username </label>
                        <input type="text" placeholder="Username"></input>
                        <Button> Edit </Button>
                    </p>
                    <p>
                        <label> Password </label>
                        <input type="text" placeholder="OldPassword"></input>
                        <Button> Edit </Button>
                    </p>
                </fieldset>
                <a href="/"><Button> Return Home </Button></a>
            </form>
        </>
    )
}

export default UserAccount;