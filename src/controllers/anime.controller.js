import prisma from '../lib/prisma.js'

async function listar(req, res) {
  const { letra } = req.query

  try {
    const filtro = letra
      ? { titulo: { startsWith: letra.toUpperCase() } }
      : {}

    const animes = await prisma.anime.findMany({
      where: filtro,
      orderBy: { titulo: 'asc' },
      include: { genero: true }
    })

    return res.status(200).json(animes)
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao listar animes.' })
  }
}

async function buscarPorId(req, res) {
  const { id } = req.params

  try {
    const anime = await prisma.anime.findUnique({
      where: { id: Number(id) },
      include: { genero: true }
    })

    if (!anime) {
      return res.status(404).json({ erro: 'Anime não encontrado.' })
    }

    return res.status(200).json(anime)
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar anime.' })
  }
}

async function criar(req, res) {
  const { titulo, sinopse, ano, estudio, generoId } = req.body

  if (!titulo || !sinopse || !ano || !estudio || !generoId) {
    return res.status(400).json({ erro: 'Título, sinopse, ano, estúdio e generoId são obrigatórios.' })
  }

  if (typeof ano !== 'number') {
    return res.status(400).json({ erro: 'O campo ano deve ser um número.' })
  }

  try {
    const generoExiste = await prisma.genero.findUnique({ where: { id: Number(generoId) } })

    if (!generoExiste) {
      return res.status(404).json({ erro: 'Gênero não encontrado.' })
    }

    const anime = await prisma.anime.create({
      data: { titulo, sinopse, ano, estudio, generoId: Number(generoId) },
      include: { genero: true }
    })

    return res.status(201).json(anime)
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao criar anime.' })
  }
}

async function atualizar(req, res) {
  const { id } = req.params
  const { titulo, sinopse, ano, estudio, generoId } = req.body

  try {
    const animeExiste = await prisma.anime.findUnique({ where: { id: Number(id) } })

    if (!animeExiste) {
      return res.status(404).json({ erro: 'Anime não encontrado.' })
    }

    if (generoId) {
      const generoExiste = await prisma.genero.findUnique({ where: { id: Number(generoId) } })

      if (!generoExiste) {
        return res.status(404).json({ erro: 'Gênero não encontrado.' })
      }
    }

    const anime = await prisma.anime.update({
      where: { id: Number(id) },
      data: {
        titulo,
        sinopse,
        ano,
        estudio,
        generoId: generoId ? Number(generoId) : undefined
      },
      include: { genero: true }
    })

    return res.status(200).json(anime)
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao atualizar anime.' })
  }
}

async function deletar(req, res) {
  const { id } = req.params

  try {
    const animeExiste = await prisma.anime.findUnique({ where: { id: Number(id) } })

    if (!animeExiste) {
      return res.status(404).json({ erro: 'Anime não encontrado.' })
    }

    await prisma.anime.delete({ where: { id: Number(id) } })

    return res.status(200).json({ mensagem: 'Anime deletado com sucesso.' })
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao deletar anime.' })
  }
}

export { listar, buscarPorId, criar, atualizar, deletar }
