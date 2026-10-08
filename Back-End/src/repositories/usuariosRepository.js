import { query } from "../config/db";


export const  usuariosRepository = {
    async getByLogin(email, senha){
        const sql = ('SELECT * FROM tb_usuario WHERE email = $1, senha = $2 RETURNING * ;');
        const res = await query (sql,[email,senha]);
        return res.rows[0]
    },

    async FindById(id){
        const sql =('SELECT * FROM tb_usuario WHERE id = $1 RETURNING * ;');
        const res = await query (sql,[id]);
        return res.rows[0]
    },
    
    async FindAll() {
        const sql = ('SELECT * FROM tb_usuario RETURNING *;');
        const res = await query (sql);
        return res.rows[0]
    },

    async update(id, usuario){
        const {nome, nome_usuario, senha, tipo,} = usuario;
        const sql = ('UPDATE tb_usuario SET nome =  $1, nome_usuario = $2, senha = $3, tipo = $4 WHERE id = $5 RETURNING * ');
        const res = await query (sql,[nome, nome_usuario, senha, tipo, id, usuario] );
        return res.rows[0]
    },

    async delete(id){
       const {nome, nome_usuario, senha, tipo,} = usuario;
       const sql = ('DELETE FROM ')
    }

}