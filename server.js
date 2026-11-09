import express from 'express'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.listen(3000)//Definir rota 
app.use(express.json())//Liberar para expresse usar Json


app.get("/funcionario", async (req, res) => {
    try {
        const funcionarios = await prisma.funcionario.findMany();
        return res.status(200).json(funcionarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

app.post("/funcionario", async (req, res) => {
    try {
        const novoFuncionario = await prisma.funcionario.create({
            data: {
                nome: req.body.nome,
                email: req.body.email,
                cargo: req.body.cargo // Corrigido para receber o cargo correto
            }
        });
        return res.status(201).json(novoFuncionario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});


