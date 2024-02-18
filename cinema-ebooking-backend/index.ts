import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	// await prisma.movie.create({
	// 	data: {
	// 		title: "example",
	// 		trailerUrl: "example.com",
	// 		thumbnailUrl: "example.com",
	// 		releaseDate: new Date()
	// 	}
	// })

	const allMovies = await prisma.movie.findMany()
	console.log(allMovies)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})