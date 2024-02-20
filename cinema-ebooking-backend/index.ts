import express, { Express } from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()
const app: Express = express()
const PORT = 3000
app.use(cors())

app.get('/movies', async (req, res) => {
	try {
		const { title } = req.query; // Assuming the query parameter for searching movies is 'title'

		let movies;

		movies = [{"id":1,"title":"example","trailerUrl":"example.com","thumbnailUrl":"https://www.uga.edu/img/GEORGIA-FS-CW.c49269db.png","releaseDate":"2024-02-18T05:19:03.000Z"},{"id":2,"title":"example2","trailerUrl":"example.com","thumbnailUrl":"https://www.uga.edu/img/GEORGIA-FS-CW.c49269db.png","releaseDate":"2024-02-18T05:19:03.000Z"},{"id":3,"title":"example3","trailerUrl":"example.com","thumbnailUrl":"https://www.uga.edu/img/GEORGIA-FS-CW.c49269db.png","releaseDate":"2024-02-18T05:19:03.000Z"},{"id":4,"title":"example4","trailerUrl":"example.com","thumbnailUrl":"https://www.uga.edu/img/GEORGIA-FS-CW.c49269db.png","releaseDate":"2024-02-18T05:19:03.000Z"}]
		res.json(movies);

		// if (title) {
		// 	const movies = await prisma.movie.findMany({
		// 		where: {
		// 			title: {
		// 				contains: title.toString() // Search for movies containing the specified title
		// 			},
		// 		},
		// 	});
		// } else {
		// 	movies = await prisma.movie.findMany(); // Fetch all movies if no search query is provided
		// }

		// res.json(movies);
	} catch (error) {
		console.error('Error fetching movies:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});