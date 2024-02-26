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