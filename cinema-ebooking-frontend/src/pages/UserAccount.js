import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserAccount.css';
import NavBar from "../components/NavBar";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const UserAccount = () => {

    const [user, setUser] = useState(null);
    const [paymentCards, setPaymentCards] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedUserData, setEditedUserData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        password: '',
        currentPassword: '',

    });
    const [currentlyEditingCard, setCurrentlyEditingCard] = useState(null);

    useEffect(() => {
        axios.get('https://localhost:3000/users/me', { withCredentials: true })
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
        axios.get('https://localhost:3000/paymentcards', { withCredentials: true })
            .then(response => {
                setPaymentCards(response.data);
            })
            .catch(error => {
                console.error('Error fetching payment cards:', error);
            });
    }, []);

    const handleSavePaymentCard = async () => {
        try {
            await axios.put('https://localhost:3000/paymentcards/' + currentlyEditingCard.id, currentlyEditingCard, { withCredentials: true });
            const response = await axios.get('https://localhost:3000/paymentcards', { withCredentials: true });
            setPaymentCards(response.data);
            setCurrentlyEditingCard(null);
        } catch (error) {
            console.error('Error updating payment card:', error);
        }
    };

    const handleAddPaymentCard = () => {
        setEditMode(true);
        setEditedUserData({
            userID: '',
            cardName: '',
            cardNum: '',
            cvv: '',
            expirationDate: '',
        });
    };


    const handleEdit = () => {
        setEditMode(true);

        setEditedUserData({
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            street: user.street,
            city: user.city,
            state: user.state,
            password: user.password,
            regPromo: user.regPromo,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
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

    const handlePasswordSave = async () => {
        try {
            const isValidPassword = await validatePassword(editedUserData.currentPassword);
            if (!isValidPassword) {
                window.alert('Current password is incorrect');
                return;
            }

            await axios.put('https://localhost:3000/users/me', { password: editedUserData.password }, { withCredentials: true });
            setEditMode(false);

            const response = await axios.get('https://localhost:3000/users/me', { withCredentials: true });
            setUser(response.data.user);
            window.alert('Password updated!')
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };


    const handleCancel = () => {
        setEditMode(false);
        setCurrentlyEditingCard(null);
    };


    const handleInputCheck = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setEditedUserData(prevState => ({
            ...prevState,
            [name]: inputValue
        }));
    };

    const validatePassword = async (currentPassword) => {
        try {
            // Make a request to validate the password
            const response = await axios.post('https://localhost:3000/users/validate-password', { currentPassword }, { withCredentials: true });
            return response.data.isValid; // Assuming the response contains a boolean indicating whether the password is valid
        } catch (error) {
            console.error('Error validating password:', error);
            return false; // Return false in case of error
        }
    };

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('isAdmin');
            sessionStorage.setItem('isLoggedIn', false);
            await axios.post('https://localhost:3000/logout', {}, { withCredentials: true });
            // Clear user session and reset user state
            setUser(null);
            navigate('/')
            window.alert('Successfully Logged Out!')
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <>
            <NavBar />

            <form className="register" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1> Account Details </h1>
                <fieldset className="row1">
                    <section>
                        {user && (
                            <p className='account_detail'>Email: {user && user.email}</p>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <div>
                                <p className='account_detail'>First Name: </p>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editedUserData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ) : (
                            <p className='account_detail'>First Name: {user && user.firstName}</p>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <div>
                                <p className='account_detail'>Last Name: </p>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editedUserData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ) : (
                            <p className='account_detail'>Last Name: {user && user.lastName}</p>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <div>
                                <p className='account_detail'>Phone Number: </p>
                                <input
                                    type="text"
                                    name="phone"
                                    value={editedUserData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ) : (
                            <p className='account_detail'>Phone Number: {user && user.phone}</p>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <div>
                                <p className='account_detail'>Street Address: </p>
                                <input
                                    type="text"
                                    name="street"
                                    value={editedUserData.street}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ) : (
                            <p className='account_detail'>Street Address: {user && user.street}</p>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <div>
                                <p className='account_detail'>City: </p>
                                <input
                                    type="text"
                                    name="city"
                                    value={editedUserData.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ) : (
                            <p className='account_detail'>City: {user && user.city}</p>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <div>
                                <p className='account_detail'>State: </p>
                                <input
                                    type="text"
                                    name="state"
                                    value={editedUserData.state}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ) : (
                            <p className='account_detail'>State: {user && user.state}</p>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <div>
                                <p className='account_detail'>Current Password: </p>
                                <input
                                    type="password" // Use password type for current password input
                                    name="currentPassword"
                                    value={editedUserData.currentPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ) : (
                            null // Don't display current password input in non-edit mode
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <div>
                                <p className='account_detail'>New Password: </p>
                                <input
                                    type="password" // Use password type for new password input
                                    name="password"
                                    value={editedUserData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ) : (
                            <p className='account_detail'>Password: *********</p>
                        )}
                    </section>
                    <section>
                        {editMode ? (
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <p className='account_detail'>Enable Promotions: </p>
                                <input
                                    type="checkbox"
                                    name="regPromo"
                                    checked={editedUserData.regPromo}
                                    onChange={handleInputCheck}
                                />
                            </div>
                        ) : (
                            <p className='account_detail'>
                                Promotions: {user && user.regPromo ? 'Subscribed' : 'Not Subscribed'}
                            </p>
                        )}
                    </section>


                    <section style={{ display: 'flex', flexDirection: 'column' }}>
                        <h2>Payment Cards:</h2>
                        {paymentCards.map(card => (
                            <div key={card.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {editMode && currentlyEditingCard && currentlyEditingCard.id === card.id ? (
                                    <div>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={currentlyEditingCard.cardName}
                                            onChange={(e) => setCurrentlyEditingCard({ ...currentlyEditingCard, cardName: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            name="cardNum"
                                            value={currentlyEditingCard.cardNum}
                                            onChange={(e) => setCurrentlyEditingCard({ ...currentlyEditingCard, cardNum: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={currentlyEditingCard.cvv}
                                            onChange={(e) => setCurrentlyEditingCard({ ...currentlyEditingCard, cvv: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            name="expirationDate"
                                            value={currentlyEditingCard.expirationDate}
                                            onChange={(e) => setCurrentlyEditingCard({ ...currentlyEditingCard, expirationDate: e.target.value })}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <span>{card.cardName}, </span>
                                        <span>{card.cardNum}, </span>
                                        <span>{card.cvv}, </span>
                                        <span>{card.expirationDate}</span>
                                    </div>
                                )}

                                {editMode && (
                                    currentlyEditingCard && currentlyEditingCard.id === card.id ? (
                                        <div>
                                            <Button onClick={handleSavePaymentCard}>Save</Button>
                                            <Button onClick={() => setCurrentlyEditingCard(null)}>Cancel</Button>
                                        </div>
                                    ) : (
                                        <Button onClick={() => setCurrentlyEditingCard(card)}>Edit</Button>
                                    )
                                )}
                            </div>
                        ))}
                        {editMode ? (
                            <>
                                <Button onClick={handleAddPaymentCard}>Add New Payment Card</Button>
                            </>
                        ) : null}
                    </section>

                    <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        {editMode ? (
                            <div>
                                <Button onClick={handleSave} variant="contained">Save</Button>
                                <Button onClick={handleCancel} variant="contained">Cancel</Button>
                            </div>
                        ) :
                            (
                                <div>
                                    <Button onClick={handleEdit} variant="contained">Edit</Button>
                                </div>
                            )
                        }

                        <div>
                            {user != null ? (
                                <Button onClick={handleLogout} variant="contained">Log Out</Button>
                            ) : (
                                null
                            )}

                        </div>
                    </section>


                </fieldset>
            </form>
        </>
    )
}

export default UserAccount;
