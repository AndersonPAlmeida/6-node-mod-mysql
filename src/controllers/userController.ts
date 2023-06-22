import { Request, Response } from 'express';
import { User } from '../models/User';
import { Op, where } from 'sequelize';

export const nome = (req: Request, res: Response) => {
    let nome: string = req.query.nome as string;
    let idade: string = req.query.idade as string;

    res.render('pages/nome', {
        nome,
        idade
    });
};

export const idadeForm = (req: Request, res: Response) => {
    res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
    let mostrarIdade: boolean = false;
    let idade: number = 0;

    if(req.body.ano) {
        let anoNascimento: number = parseInt(req.body.ano as string);
        let anoAtual: number = new Date().getFullYear();
        idade = anoAtual - anoNascimento;
        mostrarIdade = true;
    }

    res.render('pages/idade', {
        idade,
        mostrarIdade
    });
};

export const aumentarIdade = async (req: Request, res: Response)=>{
    let id_update = req.params.id
    let users = await User.findAll({where: {id: id_update}});

    if (users.length > 0) {
        let user = users[0];
        user.age++;
        
        await user.save();
    }
    res.redirect('/');
};

export const diminuirIdade = async (req: Request, res: Response)=>{
    let id_update = req.params.id
    let users = await User.findAll({where: {id: id_update}});

    if (users.length > 0) {
        let user = users[0];
        user.age--;
        
        if(user.age <= 0) {
            user.age = 0;
        }
        await user.save();
    }
    res.redirect('/');
};

export const deletarUsuario = async (req: Request, res: Response)=>{
    let id_delete = req.params.id
    let users = await User.findAll({where: {id: id_delete}});

    if (users.length > 0) {
        let user = users[0];
        
        await user.destroy();
    }
    res.redirect('/');
};