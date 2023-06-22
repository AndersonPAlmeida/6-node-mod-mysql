import { Request, Response } from 'express';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { Op } from 'sequelize';

export const home = async (req: Request, res: Response)=>{
    //Consulta
    /* let searchName: string = 'bon';
    // let users = await  User.findAll({
    //     where: {
    //        age:{
    //         [Op.gte]: 18
    //        }
    //     },
    //     offset: 2,
    //     limit: 2
    }); */

    //Build + Save
    const user = User.build({
        name: 'Fulaninho',
        age: 25
    });
    await user.save();
    //Create
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
        frasesDoDia: []
    });
};