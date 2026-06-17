import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import generoRoutes from './routes/genero.routes.js'
import animeRoutes from './routes/anime.routes.js'

const app = express()

// Por enquanto libera qualquer origem (facilita o dev local e os testes do front).
// Quando o animu.wiki estiver com domínio fixo na Vercel, troque por:
// app.use(cors({ origin: 'https://seu-dominio.vercel.app' }))
app.use(cors())

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/generos', generoRoutes)
app.use('/animes', animeRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`anime-api rodando na porta ${PORT}`)
})