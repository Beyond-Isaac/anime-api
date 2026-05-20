import 'dotenv/config'
import express from 'express'
import authRoutes from './routes/auth.routes.js'
import generoRoutes from './routes/genero.routes.js'
import animeRoutes from './routes/anime.routes.js'

const app = express()

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/generos', generoRoutes)
app.use('/animes', animeRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`anime-api rodando na porta ${PORT}`)
})
