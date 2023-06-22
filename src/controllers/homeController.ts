import { Request, Response } from 'express';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { Op, where } from 'sequelize';

export const home = async (req: Request, res: Response)=>{
    // let results = await User.findAll({where: {name: 'Fulaninho'}});
    // if(results.length > 0){
    //     let usuario = results[0];

    //     await usuario.destroy();
    // }
    //Consulta
    let users = await User.findAll();
    
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