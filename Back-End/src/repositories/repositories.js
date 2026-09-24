import { query } from "../config/db";

export const Repositories = {
    async findUsuarioPorNome (nomeUsuario) {
        const {rows} = await pool.query (
            'SELECT id_usuario, nome, nome_usuario, imagem_usuario, tipo FROM usuario WHERE nome_usuario = $1',
            [nomeUsuario]
        );
        return rows[0];
    },

    async login (email, senha) {
        const {rows} = await pool.query(
            'SELECT id_usuario, nome, nome_usuario, imagem_usuario, tipo FROM usuario WHERE email = $1 AND senha = $2',
            [email. senha]
        );
        return rows[0]
    },

    async login(email, senha) {
        const { rows } = await pool.query(
            'SELECT id_usuario, nome, nome_usuario, imagem_usuario, tipo FROM usuario WHERE email = $1 AND senha = $2',
            [email, senha]
        );
        return rows[0];
    },

    async getPerfil(idUsuario) {
        const { rows } = await pool.query(`
            SELECT 
                (SELECT COUNT(*) FROM receita WHERE id_usuario = $1) AS receitas,
                (SELECT COUNT(*) FROM favorito f JOIN receita r ON r.id_receita = f.id_receita WHERE r.id_usuario = $1) AS favoritos
        `, [idUsuario]);
        return rows[0];
    },

    async getMural(idLogado = 0, chef = null) {
        const { rows } = await pool.query(`
            SELECT r.id_receita, r.titulo, r.origem, r.imagem, u.nome_usuario AS chef,
                   COUNT(f.id_favorito) AS favoritos,
                   BOOL_OR(f.id_usuario = $1) AS favoritado
            FROM receita r
            JOIN usuario u ON u.id_usuario = r.id_usuario
            LEFT JOIN favorito f ON f.id_receita = r.id_receita
            WHERE ($2::text IS NULL OR u.nome_usuario = $2)
            GROUP BY r.id_receita, u.nome_usuario
            ORDER BY r.id_receita
        `, [idLogado, chef]);
        return rows;
    },

    async createReceita(titulo, origem, imagem, idUsuario) {
        await pool.query(
            'INSERT INTO receita (titulo, origem, imagem, id_usuario) VALUES ($1, $2, $3, $4)',
            [titulo, origem, imagem, idUsuario]
        );
    },

    async getMinhasReceitas(idUsuario) {
        const { rows } = await pool.query(
            'SELECT id_receita, titulo FROM receita WHERE id_usuario = $1 ORDER BY id_receita',
            [idUsuario]
        );
        return rows;
    },

    async deleteReceita(idReceita, idUsuario) {
        await pool.query(
            'DELETE FROM receita WHERE id_receita = $1 AND id_usuario = $2',
            [idReceita, idUsuario]
        );
    },

    
    async toggleFavorito(idUsuario, idReceita) {
        const existe = await pool.query(
            'SELECT 1 FROM favorito WHERE id_usuario = $1 AND id_receita = $2',
            [idUsuario, idReceita]
        );

        if (existe.rowCount > 0) {
            await pool.query('DELETE FROM favorito WHERE id_usuario = $1 AND id_receita = $2', [idUsuario, idReceita]);
        } else {
            await pool.query('INSERT INTO favorito (id_usuario, id_receita) VALUES ($1, $2)', [idUsuario, idReceita]);
        }

        const total = await pool.query('SELECT COUNT(*) AS favoritos FROM favorito WHERE id_receita = $1', [idReceita]);
        return {
            favoritado: existe.rowCount === 0,
            favoritos: Number(total.rows[0].favoritos)
        };
    }
};