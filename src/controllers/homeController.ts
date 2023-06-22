import { Request, Response } from 'express';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { Op } from 'sequelize';

export const home = async (req: Request, res: Response)=>{
    //Consulta
    let searchName: string = 'bon';
    let users = await  User.findAll({
        where: {
           age:{
            [Op.gte]: 18
           }
        },
        offset: 2,
        limit: 2
    });
    
    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};

export const salvarUsuario = async (req: Request, res: Response)=>{
    const user = User.build();
    //Outra forma realizar a desconstrução
    // let { name, age } = req.body;
    
    if(req.body.age !== ''){
        user.name = req.body.name;
        user.age = parseInt(req.body.age);
    } else {
        user.name = req.body.name;
    }
    
    await user.save();

    res.redirect('/');
};