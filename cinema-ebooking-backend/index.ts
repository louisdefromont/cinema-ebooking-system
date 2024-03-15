import express, { Express, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()
const app: Express = express()
const PORT = 3000
app.use(cors())
app.use(express.json())

/** 

// New endpoint for adding a payment card row
app.post('/paymentCard', async (req: Request, res: Response) => {
    const { cardName, cardNum, cvv, expirationDate, billingAddress, billCity, billState } = req.body;

    try {
        // Create a new paymentCard row in the database
        const newPaymentCard = await prisma.paymentCard.create({
            data: {
                cardName: cardName,
                cardNum: cardNum,
                cvv: cvv,
                expirationDate: expirationDate,
                billingAddress: billingAddress,
                billCity: billCity,
                billState: billState,
            },
        });

        res.json(newPaymentCard);
    } catch (error) {
        console.error('Error creating payment card:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


*/


// Login 
app.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body; // Extract email and password from request body

        // Check if the email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if the email and password combination exists in the database
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password,
            },
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // If the user exists and the password matches, return success response
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Register and Create New User
app.post('/register', async (req: Request, res: Response) => {
    const { email, password, firstName, lastName, phone, street, city, state, regPromo, cardName, cardNum, cvv, expirationDate, billingAddress, billCity, billState } = req.body;

   // const { email, password, firstName, lastName, phone, street, city, state, regPromo } = req.body;

    // Check if any of the required fields are null
    if (!email || !password || !firstName || !lastName || !phone) {
        return res.status(400).json({ error: 'Missing required fields' });
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

        // If the email doesn't exist, create a new user
        const newUser = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phone: phone,
                street: street,
                city: city,
                state: state,
				regPromo: regPromo
            },
        });

        // Create a new payment card
        const newPaymentCard = await prisma.paymentCard.create({
            data: {
                cardName: cardName,
                cardNum: cardNum,
                cvv: cvv,
                expirationDate: expirationDate,
                billingAddress: billingAddress,
                billCity: billCity,
                billState: billState,
                // Connect the payment card to the newly created user
                user: { connect: { id: newUser.id } },
            },
        });
        
        res.json({ newUser, newPaymentCard });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
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
			});
		} else {
			movies = await prisma.movie.findMany(); // Fetch all movies if no search query is provided
		}

		res.json(movies);
	} catch (error) {
		console.error('Error fetching movies:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});