import prisma from '../lib/prisma.js'

async function listar(req, res) {
  try {
    const generos = await prisma.genero.findMany({
      orderBy: { nome: 'asc' }
    })
    return res.status(200).json(generos)
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao listar gêneros.' })
  }
}

async function buscarPorId(req, res) {
  const { id } = req.params

  try {
    const genero = await prisma.genero.findUnique({
      where: { id: Number(id) },
      include: { animes: true }
    })

    if (!genero) {
      return res.status(404).json({ erro: 'Gênero não encontrado.' })
    }

    return res.status(200).json(genero)
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar gênero.' })
  }
}

async function criar(req, res) {
  const { nome } = req.body

  if (!nome) {
    return res.status(400).json({ erro: 'O campo nome é obrigatório.' })
  }

  try {
    const generoExistente = await prisma.genero.findUnique({ where: { nome } })

    if (generoExistente) {
      return res.status(400).json({ erro: 'Gênero já cadastrado.' })
    }

    const genero = await prisma.genero.create({ data: { nome } })

    return res.status(201).json(genero)
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao criar gênero.' })
  }
}

async function atualizar(req, res) {
  const { id } = req.params
  const { nome } = req.body

  if (!nome) {
    return res.status(400).json({ erro: 'O campo nome é obrigatório.' })
  }

  try {
    const generoExiste = await prisma.genero.findUnique({ where: { id: Number(id) } })

    if (!generoExiste) {
      return res.status(404).json({ erro: 'Gênero não encontrado.' })
    }

    const genero = await prisma.genero.update({
      where: { id: Number(id) },
      data: { nome }
    })

    return res.status(200).json(genero)
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao atualizar gênero.' })
  }
}

async function deletar(req, res) {
  const { id } = req.params

  try {
    const generoExiste = await prisma.genero.findUnique({
      where: { id: Number(id) },
      include: { animes: true }
    })

    if (!generoExiste) {
      return res.status(404).json({ erro: 'Gênero não encontrado.' })
    }

    if (generoExiste.animes.length > 0) {
      return res.status(400).json({ erro: 'Não é possível deletar um gênero que possui animes cadastrados.' })
    }

    await prisma.genero.delete({ where: { id: Number(id) } })

    return res.status(200).json({ mensagem: 'Gênero deletado com sucesso.' })
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao deletar gênero.' })
  }
}

export { listar, buscarPorId, criar, atualizar, deletar }
