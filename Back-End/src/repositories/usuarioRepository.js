import { query } from "../config/db";

export const usuarioRepository = {
    async create(usuario) {
        const { nome, nome_usuario, email, senha, imagem_usuario, tipo } = usuario;
        const sql = `INSERT INTO tb_usuario(nome, nome_usuario, email, senha, imagem_usuario, tipo)
        VALUES($1, $2, $3, $4, $5, $4) RETURNING *`;
        const res = await query(sql, [nome, nome_usuario, email, senha, imagem_usuario, tipo]);
        return res.rows[0];
    },
    async getByLogin(email, senha) {
        const sql = ('SELECT * FROM tb_usuario WHERE email = $1, senha = $2 RETURNING * ;');
        const res = await query(sql, [email, senha]);
        return res.rows[0]
    },

    async FindById(id) {
        const sql = ('SELECT * FROM tb_usuario WHERE id_usuario = $1 ;');
        const res = await query(sql, [id]);
        return res.rows[0]
    },

    async FindAll() {
        const sql = ('SELECT * FROM tb_usuario;');
        const res = await query(sql);
        return res.rows[0]
    },

    async update(id, usuario) {
        const { nome, nome_usuario, senha, tipo, } = usuario;
        const sql = ('UPDATE tb_usuario SET nome =  $1, nome_usuario = $2, senha = $3, tipo = $4 WHERE id_usuario = $5 RETURNING * ');
        const res = await query(sql, [nome, nome_usuario, senha, tipo, id, usuario]);
        return res.rows[0]
    },

    async delete(id) {
        const sql = ('DELETE FROM tb_usuario WHERE id_usuario = $1 RETURNING *');
        const res = await query(sql, [id]);
        return res.rows[0];
    },

}
