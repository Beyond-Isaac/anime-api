import express from 'express'
import { listar, buscarPorId, criar, atualizar, deletar } from '../controllers/anime.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

// GET /animes?letra=A → filtra por letra (catálogo A-Z) — rota pública
router.get('/', listar)
router.get('/:id', buscarPorId)
router.post('/', authMiddleware, criar)
router.put('/:id', authMiddleware, atualizar)
router.delete('/:id', authMiddleware, deletar)

export default router