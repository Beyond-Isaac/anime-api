import express from 'express'
import { listar, buscarPorId, criar, atualizar, deletar } from '../controllers/genero.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

// rotas de leitura públicas (catálogo)
router.get('/', listar)
router.get('/:id', buscarPorId)
router.post('/', authMiddleware, criar)
router.put('/:id', authMiddleware, atualizar)
router.delete('/:id', authMiddleware, deletar)

export default router