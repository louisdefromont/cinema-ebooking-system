import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserAccount.css';
import NavBar from "../components/NavBar";
import Button from '@mui/material/Button';

const UserAccount = () => {

    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedUserData, setEditedUserData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        street: '',
        city: '',
        state: ''
    });

    useEffect(() => {
        axios.get('https://localhost:3000/users/me', { withCredentials: true })
          .then(response => {
            setUser(response.data.user);
          })
          .catch(error => {
            console.error('Error fetching user:', error);
          });
    }, []);

    const handleEdit = () => {
        setEditMode(true);
        
        setEditedUserData({
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            street: user.street,
            city: user.city,
            state: user.state,
            password: user.password
        });
    };

    const handleSave = async () => {
        try {
            await axios.put('https://localhost:3000/users/me', editedUserData, { withCredentials: true });
            setEditMode(false);
            
            const response = await axios.get('https://localhost:3000/users/me', { withCredentials: true });
            setUser(response.data.user);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <NavBar />

            <form className="register">
                <h1> Account Details </h1>
                <fieldset className="row1">
                    <section>
                        {user && (
                            <p className='account_detail'>Email: {user && user.email}</p>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <input
                                type="text"
                                name="firstName"
                                value={editedUserData.firstName}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p className='account_detail'>First Name: {user && user.firstName}</p>
                        )}
                        {editMode ? (
                            <>
                                <Button onClick={handleSave}> Save </Button>
                                <Button onClick={handleCancel}> Cancel </Button>
                            </>
                        ) : (
                            <Button onClick={handleEdit}> Edit </Button>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <input
                                type="text"
                                name="lastName"
                                value={editedUserData.lastName}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p className='account_detail'>Last Name: {user && user.lastName}</p>
                        )}
                        {editMode ? (
                            <>
                                <Button onClick={handleSave}> Save </Button>
                                <Button onClick={handleCancel}> Cancel </Button>
                            </>
                        ) : (
                            <Button onClick={handleEdit}> Edit </Button>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <input
                                type="text"
                                name="phone"
                                value={editedUserData.phone}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p className='account_detail'>Phone Number: {user && user.phone}</p>
                        )}
                        {editMode ? (
                            <>
                                <Button onClick={handleSave}> Save </Button>
                                <Button onClick={handleCancel}> Cancel </Button>
                            </>
                        ) : (
                            <Button onClick={handleEdit}> Edit </Button>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <input
                                type="text"
                                name="street"
                                value={editedUserData.street}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p className='account_detail'>Street Address: {user && user.street}</p>
                        )}
                        {editMode ? (
                            <>
                                <Button onClick={handleSave}> Save </Button>
                                <Button onClick={handleCancel}> Cancel </Button>
                            </>
                        ) : (
                            <Button onClick={handleEdit}> Edit </Button>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <input
                                type="text"
                                name="city"
                                value={editedUserData.city}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p className='account_detail'>City: {user && user.city}</p>
                        )}
                        {editMode ? (
                            <>
                                <Button onClick={handleSave}> Save </Button>
                                <Button onClick={handleCancel}> Cancel </Button>
                            </>
                        ) : (
                            <Button onClick={handleEdit}> Edit </Button>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <input
                                type="text"
                                name="state"
                                value={editedUserData.state}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p className='account_detail'>State: {user && user.state}</p>
                        )}
                        {editMode ? (
                            <>
                                <Button onClick={handleSave}> Save </Button>
                                <Button onClick={handleCancel}> Cancel </Button>
                            </>
                        ) : (
                            <Button onClick={handleEdit}> Edit </Button>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <input
                                type="text"
                                name="password"
                                value={editedUserData.password}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p className='account_detail'>Password: {user && user.password}</p>
                        )}
                        {editMode ? (
                            <>
                                <Button onClick={handleSave}> Save </Button>
                                <Button onClick={handleCancel}> Cancel </Button>
                            </>
                        ) : (
                            <Button onClick={handleEdit}> Edit </Button>
                        )}
                    </section>
                </fieldset>
                <a href="/"><Button> Return Home </Button></a>
            </form>
        </>
    )
}

export default UserAccount;
