import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

/* Usa interface por que é necessário extends um type do Model
do sequelize*/
export interface UserInstance extends Model {
   id: number;
   name: string;
   age: number;
}
// Ensinamos o sequelize a rodar a tabela de usuarios
export const User = sequelize.define<UserInstance>("User", {
   id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
   },
   name: {
      type: DataTypes.STRING,
      get() {
         return this.getDataValue('name').toUpperCase();
      }
   },
   firstLetterOfname:{
      type: DataTypes.VIRTUAL,
      get() {
         let name: string = this.getDataValue('name');
         return name.charAt(0);
      }
   },
   age: {
      type: DataTypes.INTEGER,
      defaultValue: 18,
      set(value: number) {
         if(value < 18){
            value = 18;
         }
         this.setDataValue('age', value);
      }
   }
}, {
   tableName: 'users',
   timestamps: false
});
/*timestamps: true ou sem especificar o false
-> Ele assume que a tabela tem mais dois campos createdAt e 
updateAt*/