import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import CryptoJS from 'crypto-js';

declare module 'express-session' {
    export interface SessionData {
        user: { id: number; };
    }
}
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const prisma = new PrismaClient()
const app: Express = express()
const PORT = 3000
const SECRET_KEY = process.env.SECRET_KEY!

app.use(cors(
    {
        origin: 'https://localhost:8080',
        credentials: true
    }
));


app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: true,
        sameSite: 'none',
    },
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

async function aesEncrypt(data: string): Promise<string> {
    const encryptedData = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    return encryptedData;
}

async function aesDecrypt(data: string): Promise<string> {
    const decryptedData = CryptoJS.AES.decrypt(data, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

async function encryptBillingInfo(billingInfo: any): Promise<any> {
    const encryptedBillingInfo = {
        cardName: await aesEncrypt(billingInfo.cardName),
        cardNum: await aesEncrypt(billingInfo.cardNum),
        cvv: await aesEncrypt(billingInfo.cvv),
        expirationDate: await aesEncrypt(billingInfo.expirationDate),
        billingAddress: await aesEncrypt(billingInfo.billingAddress),
        billCity: await aesEncrypt(billingInfo.billCity),
        billState: await aesEncrypt(billingInfo.billState)
    };
    return encryptedBillingInfo;
}

async function decryptBillingInfo(encryptedBillingInfo: any): Promise<any> {
    const decryptedBillingInfo = {
        cardName: await aesDecrypt(encryptedBillingInfo.cardName),
        cardNum: await aesDecrypt(encryptedBillingInfo.cardNum),
        cvv: await aesDecrypt(encryptedBillingInfo.cvv),
        expirationDate: await aesDecrypt(encryptedBillingInfo.expirationDate),
        billingAddress: await aesDecrypt(encryptedBillingInfo.billingAddress),
        billCity: await aesDecrypt(encryptedBillingInfo.billCity),
        billState: await aesDecrypt(encryptedBillingInfo.billState)
    };
    return decryptedBillingInfo;
}

// Endpoint to reset password based on email
app.post('/activate', async (req: Request, res: Response) => {
    try {
        const { email } = req.body; // Extract email and password from request body
        // Check if the email and password are provided
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Find the user by email
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        // If the email doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ error: 'There is no account associated with that email' });
        }


        // Update the user's password using their id
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                status: true,
            },
        });

        // Return success response
        res.status(200).json({ message: 'Activate successfully for email: ' + email });
    } catch (error) {
        console.error('Error activating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to check if the email belongs to an admin
app.post('/checkAdmin', async (req, res) => {
    try {
        const { email } = req.body;

        // Query the database to find if the email belongs to an admin
        const admin = await prisma.admin.findFirst({
            where: {
                user: {
                    email: email
                }
            }
        });

        if (admin) {
            res.status(200).json({ isAdmin: true });
        } else {
            res.status(200).json({ isAdmin: false });
        }
    } catch (error) {
        console.error('Error checking admin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// TODO: Implement this endpoint
app.post('/checkAdmin/me', async (req, res) => {
    res.status(200).json({ isAdmin: false });
});

app.get('/paymentcards', async (req, res) => {
    try {
        
        // Check if req.session.user is defined
        if (!req.session.user || !req.session.user.id) {
            return res.status(401).json({ error: 'User session not found' });
        }

        // Extract the user ID from the session
        const userId = req.session.user.id;

        // Fetch all payment cards associated with the user
        const paymentCards = await prisma.paymentCard.findMany({
            where: {
                userId: userId,
            },
        });

        // Decrypt the sensitive payment card data
        const decryptedPaymentCards = await Promise.all(paymentCards.map(async (card) => {
            return {
                id: card.id,
                cardName: await aesDecrypt(card.cardName),
                cardNum: await aesDecrypt(card.cardNum),
                cvv: await aesDecrypt(card.cvv),
                expirationDate: await aesDecrypt(card.expirationDate),
                billingAddress: await aesDecrypt(card.billingAddress),
                billCity: await aesDecrypt(card.billCity),
                billState: await aesDecrypt(card.billState)
            };
        }));
        res.status(200).json(decryptedPaymentCards);
    } catch (error) {
        console.error('Error fetching payment cards:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/paymentcards/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { cardName, cardNum, cvv, expirationDate, billingAddress, billCity, billState } = req.body;

        // Encrypt sensitive payment card data
        const paymentCardData = {
            cardName,
            cardNum,
            cvv,
            expirationDate,
            billingAddress,
            billCity,
            billState
        };
        const encryptedPaymentCardData = await encryptBillingInfo(paymentCardData);

        // Update the payment card in the database
        const updatedPaymentCard = await prisma.paymentCard.update({
            where: { id },
            data: {
                cardName: encryptedPaymentCardData.cardName,
                cardNum: encryptedPaymentCardData.cardNum,
                cvv: encryptedPaymentCardData.cvv,
                expirationDate: encryptedPaymentCardData.expirationDate,
                billingAddress: encryptedPaymentCardData.billingAddress,
                billCity: encryptedPaymentCardData.billCity,
                billState: encryptedPaymentCardData.billState
            },
        });

        res.status(200).json({ message: 'Payment card updated successfully', paymentCard: updatedPaymentCard });
    } catch (error) {
        console.error('Error updating payment card:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to add a new payment card
app.post('/paymentcards', async (req, res) => {
    try {
        const { email, cardName, cardNum, cvv, expirationDate, billingAddress, billCity, billState } = req.body;

        // Find the user by email
        const user = await prisma.user.findFirst({
            where: {
               // email: "2elainemaria@gmail.com",
                email: email,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userId = user.id;
        // Encrypt sensitive payment card data
        const paymentCardData = {
            cardName,
            cardNum,
            cvv,
            expirationDate,
            billingAddress,
            billCity,
            billState
        };
        const encryptedPaymentCardData = await encryptBillingInfo(paymentCardData);
        // Create the payment card in the database
        const newPaymentCard = await prisma.paymentCard.create({
            data: {
                user: { connect: { id: userId } },
                cardName: encryptedPaymentCardData.cardName,
                cardNum: encryptedPaymentCardData.cardNum,
                cvv: encryptedPaymentCardData.cvv,
                expirationDate: encryptedPaymentCardData.expirationDate,
                billingAddress: encryptedPaymentCardData.billingAddress,
                billCity: encryptedPaymentCardData.billCity,
                billState: encryptedPaymentCardData.billState
            }
        });

        res.status(201).json({ message: 'Payment card created successfully', paymentCard: newPaymentCard });
    } catch (error) {
        console.error('Error creating payment card:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Endpoint to reset password based on email
app.post('/password-reset', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body; // Extract email and password from request body

        // Check if the email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find the user by email
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        // If the email doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ error: 'There is no account associated with that email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password using their id
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
            },
        });

        // Return success response
        res.status(200).json({ message: 'Password reset successfully for email: ' + email });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Check if Email Exists
app.post('/forgot-password', async (req: Request, res: Response) => {
    try {
        const { email } = req.body; // Extract email from request body

        // Check if the email is provided
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Check if the email exists in the database
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        // If the email doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ error: 'There is no account associated with that email' });
        }

        // If the email exists, return success response
        res.status(200).json({ message: 'Email found', user });
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST endpoint for validating passwords
app.post('/users/validate-password', async (req, res) => {
    try {
        // Check if req.session.user is defined
        if (!req.session.user || !req.session.user.id) {
            return res.status(401).json({ error: 'User session not found' });
        }

        // Extract the current password from the request body
        const { currentPassword } = req.body;

        // Extract the user ID from the session
        const userId = req.session.user.id;

        // Fetch the user from the database
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        // Check if the user exists and if the current password matches the user's actual password
        if (!user || await bcrypt.compare(currentPassword, user.password) === false) {
            return res.status(401).json({ isValid: false });
        }

        // If the current password is correct, respond with a success message
        res.status(200).json({ isValid: true });
    } catch (error) {
        console.error('Error validating password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Register and Create New User with Payment Card
app.post('/register', async (req: Request, res: Response) => {
    let pcNull = false;
    const { email, password, firstName, lastName, phone, street, city, state, regPromo, cardName, cardNum, cvv, expirationDate, billingAddress, billCity, billState } = req.body;

    // Check if any of the required fields are null
    if (!email || !password || !firstName || !lastName || !phone) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if any paymentInfo fields are null
    if (!cardName && !cardNum && !cvv && !expirationDate && !billingAddress && !billCity && !billState) {
        pcNull = true;
    }

    // Additional check if pcNull is false but one of the fields from cardName...billState is not null
    if (!pcNull && !(cardName && cardNum && cvv && expirationDate && billingAddress && billCity && billState)) {
        return res.status(400).json({ error: 'Payment Info is incomplete' });
    }

    try {
        // Check if the email already exists in the database
        const existingUser = await prisma.user.findFirst({
            where: {
                email: email, // Provide the email directly
            },
        });

        // If the email already exists, return an error
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10); // Adjust the saltRounds as needed
        // Encrypt sensitive payment card data
        const billingInfo = {
            cardName,
            cardNum,
            cvv,
            expirationDate,
            billingAddress,
            billCity,
            billState
        };
        const encryptedBillingInfo = await encryptBillingInfo(billingInfo);
        // Create a new user with associated payment card
        if (pcNull) { // no paymentcard
            const newUser = await prisma.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                    phone: phone,
                    street: street,
                    city: city,
                    state: state,
                    regPromo: regPromo,
                    status: false,
                } // data 
            });
            res.json(newUser);
        } else {
            const newUser = await prisma.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                    phone: phone,
                    street: street,
                    city: city,
                    state: state,
                    regPromo: regPromo,
                    status: false,
                    paymentInfo: { // Add paymentInfo directly to the user creation
                        create: {
                            cardName: encryptedBillingInfo.cardName,
                            cardNum: encryptedBillingInfo.cardNum,
                            cvv: encryptedBillingInfo.cvv,
                            expirationDate: encryptedBillingInfo.expirationDate,
                            billingAddress: encryptedBillingInfo.billingAddress,
                            billCity: encryptedBillingInfo.billCity,
                            billState: encryptedBillingInfo.billState
                        } // create 
                    } // paymentInfo       
                },
                include: { // Include the paymentInfo association in the response
                    paymentInfo: true
                }
            }); // newUser
            res.json(newUser);
        } // if
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login 
app.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body; // Extract email and password from request body

        // Check if the email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find the user by email
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        // If the user doesn't exist, or the passwords don't match, return error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }


        // If the user exists and the password matches, return success response
        req.session.user = { id: user.id };
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/logout', (req, res) => {
    // Clear the session to invalidate the user's session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ message: 'Logged out successfully' });
        }
    });
});


app.get('/movies', async (req, res) => {
    try {
        const { title } = req.query; // Assuming the query parameter for searching movies is 'title'

        let movies;

        // movies = [{"id":1,"title":"Dune","trailerUrl":"https://youtu.be/n9xhJrPXop4","thumbnailUrl":"https://m.media-amazon.com/images/I/61QbqeCVm0L.jpg","releaseDate":"2024-02-18T05:19:03.000Z"},
        // 		{"id":2,"title":"Godzilla vs. Kong","trailerUrl":"https://youtu.be/odM92ap8_c0","thumbnailUrl":"https://m.media-amazon.com/images/M/MV5BZmYzMzU4NjctNDI0Mi00MGExLWI3ZDQtYzQzYThmYzc2ZmNjXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg","releaseDate":"2024-02-18T05:19:03.000Z"},
        // 		{"id":3,"title":"Kung Fu Panda 3","trailerUrl":"https://youtu.be/10r9ozshGVE","thumbnailUrl":"https://m.media-amazon.com/images/M/MV5BMTUyNzgxNjg2M15BMl5BanBnXkFtZTgwMTY1NDI1NjE@._V1_FMjpg_UX1000_.jpg","releaseDate":"2024-02-18T05:19:03.000Z"},
        // 		{"id":4,"title":"Deadpool","trailerUrl":"https://youtu.be/ONHBaC-pfsk","thumbnailUrl":"https://upload.wikimedia.org/wikipedia/en/2/23/Deadpool_%282016_poster%29.png","releaseDate":"2024-02-18T05:19:03.000Z"}]
        // res.json(movies);

        if (title) {
            const movies = await prisma.movie.findMany({
                where: {
                    title: {
                        contains: title.toString() // Search for movies containing the specified title
                    },
                },
                include: {
                    showings: {
                        include: {
                            bookedSeats: true
                        }
                    }
                }
            });
        } else {
            movies = await prisma.movie.findMany({
                include: {
                    showings: {
                        include: {
                            bookedSeats: true
                        }
                    }
                }
            }); // Fetch all movies if no search query is provided
        }

        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// Endpoint to create a new promotion
app.post('/promotions', async (req: Request, res: Response) => {
    try {
        const { expirationDate, discAmount, regExpression } = req.body; // Extract promotion details from request body

        // Check if all required fields are provided
        if (!expirationDate || !discAmount || !regExpression) {
            return res.status(400).json({ error: 'Expiration date, discount amount, and regular expression are required' });
        }

        // Create the promotion in the database
        const promotion = await prisma.promotion.create({
            data: {
                expirationDate,
                discAmount,
                regExpression
            },
        });

        // Return success response with the created promotion
        res.status(201).json({ message: 'Promotion created successfully', promotion });
    } catch (error) {
        console.error('Error creating promotion:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to get all promotions
app.get('/promotions', async (req: Request, res: Response) => {
    try {
        // Retrieve all promotions from the database
        const promotions = await prisma.promotion.findMany();

        // Return success response with the list of promotions
        res.status(200).json(promotions);
    } catch (error) {
        console.error('Error fetching promotions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/promotions/:id', async (req, res) => {
    try {
        const promotionId = parseInt(req.params.id);
        const promotion = await prisma.promotion.findUnique({
            where: {
                id: promotionId
            }
        });
        if (!promotion) {
            return res.status(404).json({ error: 'Promotion not found' });
        }
        res.status(200).json(promotion);
    } catch (error) {
        console.error('Error fetching promotion:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to update a promotion by ID
app.put('/promotions/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Extract promotion ID from URL
    const { expirationDate, discAmount, regExpression } = req.body; // Extract updated promotion details from request body

    try {
        // Update the promotion in the database
        const updatedPromotion = await prisma.promotion.update({
            where: { id },
            data: { expirationDate, discAmount, regExpression },
        });

        // Return success response with the updated promotion
        res.status(200).json({ message: 'Promotion updated successfully', updatedPromotion });
    } catch (error) {
        console.error('Error updating promotion:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to delete a promotion by ID
app.delete('/promotions/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Extract promotion ID from URL

    try {
        // Delete the promotion from the database
        await prisma.promotion.delete({
            where: { id },
        });

        // Return success response
        res.status(200).json({ message: 'Promotion deleted successfully' });
    } catch (error) {
        console.error('Error deleting promotion:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create movie endpoint 
app.post('/movies', async (req, res) => {
    try {
        const { title, trailerUrl, thumbnailUrl, releaseDate, description, durationMinutes, genres } = req.body;
        const parsedDurationMinutes = parseInt(durationMinutes);
        const newMovie = await prisma.movie.create({
            data: {
                title: title,
                trailerUrl: trailerUrl,
                thumbnailUrl: thumbnailUrl,
                releaseDate: releaseDate,
                description: description,
                durationMinutes: parsedDurationMinutes,
                genres: genres
            }
        });
        res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Read movie endpoint
app.get('/movies/:id', async (req, res) => {
    try {
        const movieId = parseInt(req.params.id);
        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        });
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json({ movie });
    } catch (error) {
        console.error('Error reading movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update movie endpoint 
app.put('/movies/:id', async (req, res) => {
    try {
        const movieId = parseInt(req.params.id);
        const { title, trailerUrl, thumbnailUrl, releaseDate, description, durationMinutes, genres } = req.body;
        const parsedDurationMinutes = parseInt(durationMinutes);
        const updatedMovie = await prisma.movie.update({
            where: {
                id: movieId
            },
            data: {
                title: title,
                trailerUrl: trailerUrl,
                thumbnailUrl: thumbnailUrl,
                releaseDate: releaseDate,
                description: description,
                durationMinutes: parsedDurationMinutes,
                genres: genres

            }
        });
        res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete movie endpoint 
app.delete('/movies/:id', async (req, res) => {
    try {
        const movieId = parseInt(req.params.id);
        await prisma.movie.delete({
            where: {
                id: movieId
            }
        });
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create User endpoint
app.post('/users', async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, street, city, state, status, regPromo } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone,
                street,
                city,
                state,
                status,
                regPromo
            }
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/users/me', async (req, res) => {
    try {
        if (req.session.user === undefined) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userId = req.session.user.id;

        // Find the user by ID
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User found', user });
    } catch (error) {
        console.error('Error reading user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Read User endpoint
app.get('/users/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        // Find the user by ID
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User found', user });
    } catch (error) {
        console.error('Error reading user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update User endpoint
app.put('/users/me', async (req, res) => {
    try {
        if (req.session.user === undefined) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userId = req.session.user.id;
        const { firstName, lastName, email, phone, street, city, state, password, regPromo } = req.body;

        // Hash the password if provided
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update the user in the database
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                firstName,
                lastName,
                email,
                phone,
                street,
                city,
                state,
                password: hashedPassword,
                regPromo
            },
        });

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete User endpoint 
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        // Delete the user from the database
        await prisma.user.delete({
            where: {
                id: userId,
            }
        });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/showrooms', async (req, res) => {
    try {
        const showrooms = await prisma.showroom.findMany();
        res.status(200).json(showrooms);
    } catch (error) {
        console.error('Error fetching showrooms:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/showrooms/:id', async (req, res) => {
    try {
        const showroomId = parseInt(req.params.id);
        const showroom = await prisma.showroom.findUnique({
            where: {
                id: showroomId
            },
            include: {
                seats: true
            }
        });
        res.status(200).json(showroom);
    } catch (error) {
        console.error('Error fetching showroom:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/showings/:movieId', async (req, res) => {
    try {
        const movieId = parseInt(req.params.movieId);
        // include booked seats
        const showings = await prisma.showing.findMany({
            where: {
                movieId: movieId
            },
            include: {
                bookedSeats: true
            }
        });
        res.status(200).json(showings);
    } catch (error) {
        console.error('Error fetching showings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/showings/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { dateTime, showroomId } = req.body;
        const updatedShowing = await prisma.showing.update({
            where: { id },
            data: { dateTime, showroomId }
        });
        res.status(200).json({ message: 'Showing updated successfully', showing: updatedShowing });
    } catch (error) {
        console.error('Error updating showing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/showings', async (req, res) => {
    try {
        const { dateTime, movieId, showroomId } = req.body;
        const newShowing = await prisma.showing.create({
            data: {
                dateTime,
                movieId,
                showroomId
            }
        });
        res.status(201).json({ message: 'Showing created successfully', showing: newShowing });
    } catch (error) {
        console.error('Error creating showing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/showings/:id/booked-seats', async (req, res) => {
    try {
        const showingId = parseInt(req.params.id);
        const showing = await prisma.showing.findUnique({
            where: {
                id: showingId
            },
            include: {
                bookedSeats: true
            }
        });
        if (!showing) {
            return res.status(404).json({ error: 'Showing not found' });
        }
        res.status(200).json(showing.bookedSeats);
    } catch (error) {
        console.error('Error fetching showing seats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// shows all showtimes (admin page)
app.get('/showtimes', async (req, res) => {
    try {
        // Fetch all showings from the database
        const showings = await prisma.showing.findMany({
            include: {
                movie: {
                    select: {
                        title: true
                    }
                }
            }
        });

        // Map through showings and replace movieId with movie title
        const formattedShowings = showings.map(showing => ({
            ...showing,
            movieId: showing.movie.title // Replace movieId with movie title
        }));

        res.status(200).json(formattedShowings);
    } catch (error) {
        console.error('Error fetching showings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

 
// shows all showtimes (admin page)
app.get('/showtimes', async (req, res) => {
    try {
        // Fetch all showings from the database
        const showings = await prisma.showing.findMany({
            include: {
                movie: {
                    select: {
                        title: true
                    }
                }
            }
        });

        // Map through showings and replace movieId with movie title
        const formattedShowings = showings.map(showing => ({
            ...showing,
            movieId: showing.movie.title // Replace movieId with movie title
        }));

        res.status(200).json(formattedShowings);
    } catch (error) {
        console.error('Error fetching showings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// add new showtime row (admin)
app.post('/showtimes', async (req, res) => {
    try {
        const { dateTime, movieId, showroomId } = req.body;

        // Convert movieId to an integer
        const movieIdInt = parseInt(movieId);
        
        // Convert showroomId to an integer or null
        const showroomIdInt = showroomId ? parseInt(showroomId) : null;

        // Find the movie ID associated with the given movieId
        const movie = await prisma.movie.findUnique({
            where: {
                id: movieIdInt
            },
            select: {
                id: true
            }
        });

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const newShowing = await prisma.showing.create({
            data: {
                dateTime: dateTime,
                movieId: movieIdInt, // Use the parsed movieId
                showroomId: showroomIdInt // Use the parsed showroomId
            }
        });
        res.status(201).json({ message: 'Showing created successfully', showing: newShowing });
    } catch (error) {
        console.error('Error creating showing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/showtimes/:id', async (req, res) => {
    const id = parseInt(req.params.id); // Extract showtime ID from URL

    try {
        // Delete the showtime from the database
        // Assume `prisma` is your database client
        await prisma.showing.delete({
            where: { id },
        });

        // Return success response
        res.status(200).json({ message: 'Showtime deleted successfully' });
    } catch (error) {
        console.error('Error deleting showtime:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to update a showtime by ID
app.put('/showtimes/:id', async (req, res) => {
    const id = parseInt(req.params.id); // Extract showtime ID from URL
    const { dateTime, movieId, showroomId } = req.body; // Extract updated showtime details from request body

    try {
            // Update the showtime in the database
            const updatedShowtime = await prisma.showing.update({
                where: { id },
                data: { 
                    dateTime, 
                    movieId: parseInt(movieId), 
                    showroomId: parseInt(showroomId) 
                }, // Parse movieId and showroomId as integers
            });
   


        // Return success response with the updated showtime
        res.status(200).json({ message: 'Showtime updated successfully', updatedShowtime });
    } catch (error) {
        console.error('Error updating showtime:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to get all tickets
app.get('/tickets', async (req, res) => {
    try {
        // Retrieve all tickets from the database
        const tickets = await prisma.ticketPrices.findMany();

        // Return success response with the list of tickets
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to create a ticket price
app.post('/tickets', async (req, res) => {
    try {
        const { ticketType, price } = req.body;

        // Parse price as float
        const priceFloat = parseFloat(price);

        const newTicketPrice = await prisma.ticketPrices.create({
            data: {
                ticketType,
                price: priceFloat
            }
        });
        res.status(201).json({ message: 'Ticket price created successfully', ticketPrice: newTicketPrice });
    } catch (error) {
        console.error('Error creating ticket price:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Endpoint to delete a ticket price by ID
app.delete('/tickets/:id', async (req, res) => {
    const id = parseInt(req.params.id); // Extract ticket ID from URL

    console.log("ticket id: " + id);
    try {
        // Delete the ticket price from the database
        const deletedTicketPrice = await prisma.ticketPrices.delete({
            where: { id },
        });

        // Check if the ticket price was found and deleted
        if (!deletedTicketPrice) {
            // If not found, return a 404 status
            return res.status(404).json({ error: 'Ticket price not found' });
        }

        // Return success response
        res.status(200).json({ message: 'Ticket price deleted successfully' });
    } catch (error) {
        console.error('Error deleting ticket price:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update ticket endpoint 
app.put('/tickets/:id', async (req, res) => {
    try {
        const ticketId = parseInt(req.params.id);
        const { price, ticketType } = req.body;
        const updatedTicket = await prisma.ticketPrices.update({
            where: {
                id: ticketId
            },
            data: {
                price: parseFloat(price),
                ticketType: ticketType
            }
        });
        res.status(200).json({ message: 'Ticket updated successfully', ticket: updatedTicket });
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Get user (admin)
app.get('/user', async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await prisma.user.findMany();

        // Return success response with the list of users
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create user (admin)
app.post('/user', async (req, res) => {
    try {
        const { email, firstName, lastName, password, phone, city, state, regPromo, status, admin } = req.body; // Extract user details from request body

        const regPromoBool = regPromo === 'true'; // Assuming regPromo is a string "true" or "false"
        const statusBool = status === 'true'; 
        const adminBool = status === 'true'; 

        // Check if all required fields are provided
        if (!email || !firstName || !lastName || !password || !phone || !city || !state || !status || !admin) {
            return res.status(400).json({ error: 'All user fields are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        const user = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                phone,
                city,
                state,
                regPromo: regPromoBool,
                status: statusBool,
                admin: adminBool,
            },
        });

        // Return success response with the created user
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to delete a user by ID
app.delete('/user/:id', async (req, res) => {
    const userId = parseInt(req.params.id); // Extract user ID from URL

    try {
        // Delete related records first from PaymentCard table
        await prisma.paymentCard.deleteMany({
            where: {
                userId: userId,
            },
        });

        // Delete related records from Admin table
        await prisma.admin.deleteMany({
            where: {
                id: userId,
            },
        });

        // Then delete the user from the database
        await prisma.user.delete({
            where: { id: userId },
        });

        // Return success response
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to update a user by email
app.put('/user/:email', async (req, res) => {
    const email = req.params.email; // Extract user email from URL
    const { firstName, lastName, password, phone, city, state, regPromo, status, admin } = req.body; // Extract updated user details from request body

    try {
        //const updatedRegPromo = Boolean(regPromo);
       // const updatedStatus = Boolean(status);
        //const updatedAdmin = Boolean(admin);
        const updatedRegPromo = regPromo === 'true';
        const updatedStatus = status === 'true';
        const updatedAdmin = admin === 'true'; 

        // Fetch the current user from the database by email
        const currentUser = await prisma.user.findUnique({ where: { email } });

        if (!currentUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user in the database
        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id }, // Use the ID of the found user
            data: { firstName, lastName, password, phone, city, state, regPromo: updatedRegPromo, status: updatedStatus, admin: updatedAdmin },
        });

        // Check if admin value has changed
        if (currentUser.admin !== updatedAdmin) {
            if (updatedAdmin) {
                // If admin is set to true, add user to the Admin table
                await prisma.admin.create({
                    data: {
                        id: updatedUser.id,
                        email: updatedUser.email || '' // Handle null email
                    }
                });
            } else {
                // If admin is set to false, remove user from the Admin table
                await prisma.admin.delete({
                    where: { id: updatedUser.id }
                });
            }
        }

        // Return success response with the updated user
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to check user status by email
app.post('/checkUserStatus', async (req, res) => {
    const { email } = req.body; // Extract email from the request body

    try {
        // Find the user in the database based on the email
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: { status: true } // Select only the status field
        });

        // If the user is found
        if (user) {
            // If the status is false, return an alert indicating the account is inactive
            if (!user.status) {
                return res.status(200).json({ status: false, message: 'This account is inactive' });
            }
            // If the status is true, return success with status true
            return res.status(200).json({ status: true });
        } else {
            // If the user is not found, return an alert indicating the account does not exist
            return res.status(404).json({ message: 'Account not found' });
        }
    } catch (error) {
        console.error('Error checking user status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user's password (admin)
app.put('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id); // Extract user ID from URL
    const { newPassword } = req.body; // Extract new password from request body

    try {
        console.log("1");
        // Fetch the user from the database
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            console.log("1");
            return res.status(404).json({ error: 'Users not found ' + user + " " + id });
        }

        // Compare the new password with the password in the database
        const isPasswordMatch = await bcrypt.compare(newPassword, user.password);

        if (isPasswordMatch) {
            return res.status(400).json({ error: 'New password cannot be the same as the old one.' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });

        // Return success response with the updated user
        res.status(200).json({ message: 'Password updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// check is curr and new password same (admin)
app.put('/checkpassword/:id', async (req, res) => {
    const id = parseInt(req.params.id); // Extract user ID from URL
    const { currPassword } = req.body; // Extract current password from request body

    try {
        // Fetch the user from the database
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided current password with the password in the database
        const isPasswordMatch = await bcrypt.compare(currPassword, user.password);

        if (isPasswordMatch) {
            // Passwords match
            return res.status(200).json({ message: 'Current password is correct' });
        } else {
            // Passwords don't match
            return res.status(400).json({ error: 'Current password is incorrect' });
        }
    } catch (error) {
        console.error('Error checking current password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/** 
app.post('/payment', async (req, res) => {
    try {
        const { billingAddress, cardNum, expirationDate, billCity, billState, cardName, cvv, userId } = req.body; // Extract payment card details from request body

        // Check if all required fields are provided
        if (!billingAddress || !cardNum || !expirationDate || !billCity || !billState || !cardName || !cvv || !userId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Encrypt sensitive payment card data
        const paymentCardData = {
            billingAddress,
            cardNum,
            expirationDate,
            billCity,
            billState,
            cardName,
            cvv,
            userId
        };
        const encryptedPaymentCardData = await encryptBillingInfo(paymentCardData);

        // Create the payment card in the database
        const paymentCard = await prisma.paymentCard.create({
            data: encryptedPaymentCardData,
        });

        // Return success response with the created payment card
        res.status(201).json({ message: 'Payment card created successfully', paymentCard });
    } catch (error) {
        console.error('Error creating payment card:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
*/

// Get all payment cards (admin)
app.get('/payment', async (req, res) => {
    try {
        // Retrieve all payment cards from the database
        const paymentCards = await prisma.paymentCard.findMany();

        // Decrypt the sensitive payment card data
        const decryptedPaymentCards = await Promise.all(paymentCards.map(async (paymentCard) => {
            return {
                id: paymentCard.id,
                cardName: await aesDecrypt(paymentCard.cardName),
                cardNum: await aesDecrypt(paymentCard.cardNum),
                cvv: await aesDecrypt(paymentCard.cvv),
                expirationDate: await aesDecrypt(paymentCard.expirationDate),
                billingAddress: await aesDecrypt(paymentCard.billingAddress),
                billCity: await aesDecrypt(paymentCard.billCity),
                billState: await aesDecrypt(paymentCard.billState),
                userId: paymentCard.userId
            };
        }));

        // Return success response with the list of decrypted payment cards
        res.status(200).json(decryptedPaymentCards);
        
        //res.status(200).json(paymentCards);

    } catch (error) {
        console.error('Error fetching payment cards:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// add payment card (admin)
app.post('/payment/:id', async (req, res) => {
    try {
        const {id, billingAddress, cardNum, expirationDate, billCity, billState, cardName, cvv, userId } = req.body; // Extract payment card details from request body
        console.log("ID VALAUE IS " + id);
        // Check if all required fields are provided
        if (!billingAddress || !cardNum || !expirationDate || !billCity || !billState || !cardName || !cvv || !userId) {
            return res.status(400).json({ error: 'All fields are required' });
        }
       // cardName: await aesEncrypt(billingInfo.cardName),

        // Ensure userId is parsed as an integer
        const parsedUserId = parseInt(userId);

        const billingInfo = {
            cardName,
            cardNum,
            cvv,
            expirationDate,
            billingAddress,
            billCity,
            billState,
        };
        const encryptedBillingInfo = await encryptBillingInfo(billingInfo);
        // Create the payment card in the database
        const paymentCard = await prisma.paymentCard.create({
            data: {
                cardName: encryptedBillingInfo.cardName,
                cardNum: encryptedBillingInfo.cardNum,
                cvv: encryptedBillingInfo.cvv,
                expirationDate: encryptedBillingInfo.expirationDate,
                billingAddress: encryptedBillingInfo.billingAddress,
                billCity: encryptedBillingInfo.billCity,
                billState: encryptedBillingInfo.billState,
                userId: parsedUserId
            },
        });
        // Return success response with the created payment card
        res.status(201).json({ message: 'Payment card created successfully', paymentCard });
    } catch (error) {
        console.error('Error creating payment card:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to delete a payment card by ID
app.delete('/payment/:id', async (req, res) => {
    const id = parseInt(req.params.id); // Extract payment card ID from URL

    try {
        // Delete the payment card from the database
        await prisma.paymentCard.delete({
            where: { id },
        });

        // Return success response
        res.status(200).json({ message: 'Payment card deleted successfully' });
    } catch (error) {
        console.error('Error deleting payment card:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to update a payment card by ID
app.put('/payment/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Extract payment card ID from URL
    const { billingAddress, cardNum, expirationDate, billCity, billState, cardName, cvv, userId } = req.body; // Extract updated payment card details from request body

    try {

        const billingInfo = {
            cardName,
            cardNum,
            cvv,
            expirationDate,
            billingAddress,
            billCity,
            billState,
        };
        // Ensure userId is parsed as an integer
        const parsedUserId = parseInt(userId);
        const encryptedBillingInfo = await encryptBillingInfo(billingInfo);
        // Update the payment card in the database
        const updatedPaymentCard = await prisma.paymentCard.update({
            where: { id },
            data: {
                cardName: encryptedBillingInfo.cardName,
                cardNum: encryptedBillingInfo.cardNum,
                cvv: encryptedBillingInfo.cvv,
                expirationDate: encryptedBillingInfo.expirationDate,
                billingAddress: encryptedBillingInfo.billingAddress,
                billCity: encryptedBillingInfo.billCity,
                billState: encryptedBillingInfo.billState,
                userId: parsedUserId
            },
        });

        // Return success response with the updated payment card
        res.status(200).json({ message: 'Payment card updated successfully', updatedPaymentCard, encryptedBillingInfo });
    } catch (error) {
        console.error('Error updating payment card:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

 /** 
// Endpoint to update a payment card by ID
app.put('/payment/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // Extract payment card ID from URL
    const { billingAddress, cardNum, expirationDate, billCity, billState, cardName, cvv, userId } = req.body; // Extract updated payment card details from request body

    try {
        // Decrypt the new values
        const decryptedCardName = await aesDecrypt(cardName);
        const decryptedCardNum = await aesDecrypt(cardNum);
        const decryptedCvv = await aesDecrypt(cvv);
        const decryptedExpirationDate = await aesDecrypt(expirationDate);
        const decryptedBillingAddress = await aesDecrypt(billingAddress);
        const decryptedBillCity = await aesDecrypt(billCity);
        const decryptedBillState = await aesDecrypt(billState);

        // Ensure userId is parsed as an integer
        const parsedUserId = parseInt(userId);

        const billingInfo = {
            cardName,
            cardNum,
            cvv,
            expirationDate,
            billingAddress,
            billCity,
            billState,
        };
        const encryptedBillingInfo = await encryptBillingInfo(billingInfo);
        // Create the payment card in the database
        const paymentCard = await prisma.paymentCard.create({
            data: {
                cardName: encryptedBillingInfo.cardName,
                cardNum: encryptedBillingInfo.cardNum,
                cvv: encryptedBillingInfo.cvv,
                expirationDate: encryptedBillingInfo.expirationDate,
                billingAddress: encryptedBillingInfo.billingAddress,
                billCity: encryptedBillingInfo.billCity,
                billState: encryptedBillingInfo.billState,
                userId: parsedUserId
            },
        });
        // Update the payment card in the database
        const updatedPaymentCard = await prisma.paymentCard.update({
            where: { id },
            data: {
                cardName: decryptedCardName,
                cardNum: decryptedCardNum,
                cvv: decryptedCvv,
                expirationDate: decryptedExpirationDate,
                billingAddress: decryptedBillingAddress,
                billCity: decryptedBillCity,
                billState: decryptedBillState,
                userId: parsedUserId,
            },
        });

        // Return success response with the updated payment card
        res.status(200).json({ message: 'Payment card updated successfully', updatedPaymentCard });
    } catch (error) {
        console.error('Error updating payment card:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
*/
app.post('/book-tickets', async (req, res) => {
    const showingId = req.body.showingId;
    const selectedSeats = req.body.selectedSeats;
    const selectedTickets = req.body.selectedTickets;
    const userId = req.body.userId;

    var ticketsData = [];
    var currentTicketIndex = 0;
    for (var i = 0; i < selectedTickets.adultTickets; i++) {
        ticketsData.push({
            ticketType: 'ADULT',
            seatId: selectedSeats[currentTicketIndex].seatId
        });
        currentTicketIndex++;
    }
    for (var i = 0; i < selectedTickets.seniorTickets; i++) {
        ticketsData.push({
            ticketType: 'SENIOR',
            seatId: selectedSeats[currentTicketIndex].seatId
        });
        currentTicketIndex++;
    }
    for (var i = 0; i < selectedTickets.childTickets; i++) {
        ticketsData.push({
            ticketType: 'CHILD',
            seatId: selectedSeats[currentTicketIndex].seatId
        });
        currentTicketIndex++;
    }

    const createdBooking = await prisma.bookingInfo.create({
        data: {
            userId: userId,
            showingId: showingId,
            tickets: {
                create: ticketsData
            }
        }
    });

    var showingSeats = [];
    for (var i = 0; i < selectedSeats.length; i++) {
        showingSeats.push({
            seatId: selectedSeats[i].seatId
        });
    }

    await prisma.showing.update({
        where: {id: showingId},
        data: {
            bookedSeats: {
                create: showingSeats
            }
        }
    });
});



const httpsOptions = {
    key: fs.readFileSync('../ssl/server.key'),
    cert: fs.readFileSync('../ssl/server.cert')
};

https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
