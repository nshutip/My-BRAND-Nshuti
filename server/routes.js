const express = require("express")
const Article = require("./models/Article")
const router = express.Router()

// Get all articles
router.get("/articles", async (req, res) => {
	const articles = await Article.find()
	res.send(articles)
})

// Create an article
router.post("/articles", async (req, res) => {
	const article = new Article ({
		title: req.body.title,
		content: req.body.content,
	})
	await article.save()
	res.send(article)
})

// Get individual article
router.get("/articles/:id", async (req, res) => {
	const article = await Article.findOne({ _id: req.params.id })
	res.send(article)
})

// Update an article
router.patch("/articles/:id", async (req, res) => {
	try {
		const article = await Article.findOne({ _id: req.params.id })

		if (req.body.title) {
			article.title = req.body.title
		}

		if (req.body.content) {
			article.content = req.body.content
		}

		await article.save()
		res.send(article)
	} catch {
		res.status(404)
		res.send({ error: "Article doesn't exist!" })
	}
})

// Deleting an article
router.delete("/articles/:id", async (req, res) => {
	try {
		await Article.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Article doesn't exist!" })
	}
})

module.exports = router