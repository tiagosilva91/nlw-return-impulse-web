import express from 'express';

import { SubmitFeedbackUseCase } from './use-case/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositores/prisma/prisma-feedback-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router()

// Rotas HTTP - GET, POST, PUT, PATCH, DELETE
// GET - Buscar informações
// POST - Cadastrar informações
// PUT - Atualizar informações de uma entidade inteira
// PATCH - Atualizar uma informação única de uma entidade
// DELTE - Deletar um inforamção 

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body
    
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    })

    return res.status(201).send();
})