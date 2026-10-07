import { query } from "../config/db";


export const  usuariosRepository = {
    async getByLogin(Email, senha){
        const sql = ('SELECT* FROM tb_usuario WHERE email = $1, senha = $2 RETURNING * ;');
        const res = await query (sql,[Email,senha]);
        return res.rows[0]
    },

    async FindById(id){
        const sql =('SELECT *FROM tb_usuario WHERE id = $1 RETURNING * ;');
        const res = await query (sql,[id]);
        return res.rows[0]
    },
    
    async FindAll() {
        const sql = ('SELECT * FROM tb_usuario RETURNING *;');
        const res = await query (sql);
        return res.rows[0]
    },
}