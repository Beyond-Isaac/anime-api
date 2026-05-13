import express from 'express'
import { listar, buscarPorId, criar, atualizar, deletar } from '../controllers/genero.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', authMiddleware, listar)
router.get('/:id', authMiddleware, buscarPorId)
router.post('/', authMiddleware, criar)
router.put('/:id', authMiddleware, atualizar)
router.delete('/:id', authMiddleware, deletar)

export default router
