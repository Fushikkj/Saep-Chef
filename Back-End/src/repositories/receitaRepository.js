import { query } from "../config/db.js";

export const receitaRepository = {

    async create(receita) {
        const { titulo_receita, origem_receita, id_usuario, url_imagem } = receita;
        const sql = `INSERT INTO tb_receita(titulo_receita, origem_receita, id_usuario, url_imagem)
        VALUES($1, $2, $3, $4) RETURNING *`;
        const res = await query(sql, [titulo_receita, origem_receita, id_usuario, url_imagem]);
        return res.rows[0];
    },

    async findById(id) {
        const sql = ('SELECT * FROM tb_receita WHERE id_receita = $1 ;');
        const res = await query(sql, [id]);
        return res.rows[0]
    },

    async findAll() {
        const sql = ('SELECT * FROM tb_receita;');
        const res = await query(sql);
        return res.rows
    },

    async update(id, receita) {
        const { titulo_receita, origem_receita, id_usuario, url_imagem } = receita;
        const sql = ('UPDATE tb_receita SET titulo_receita = $1, origem_receita = $2, id_usuario = $3, url_imagem = $4 WHERE id_receita = $5 RETURNING * ');
        const res = await query(sql, [titulo_receita, origem_receita, id_usuario, url_imagem, id]);
        return res.rows[0]
    },

    async delete(id) {
        const sql = ('DELETE FROM tb_receita WHERE id_receita = $1 RETURNING *');
        const res = await query(sql, [id]);
        return res.rows[0];
    },

}