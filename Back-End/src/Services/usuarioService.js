import { usuarioRepository } from "../repositories/usuarioRepository";

export const usuarioService = {

    async getByLogin(email, senha) {
        const usuarioExiste = await usuarioRepository.getByLogin(email, senha);
        if (!usuarioExiste) {
            throw new Error(' Usuário existente');
        }
        return await usuarioRepository.getByLogin(email, senha);
    },

    async findById(id) {
        const usuarioExiste = await usuarioRepository.findById(id);
        if (!usuarioExiste) {
            throw new Error(' Usuário não encontrado');
        }
        return usuarioExiste;
    },


    async findAll() {
        return await usuarioRepository.findAll()
    },

    async update(id, reqUsuario) {
        const reqUsuario = await usuarioRepository.findById(id);
        if (!reqUsuario) {
            throw new Error(' Usuário não encontrado. ');
        }
        return await usuarioRepository.update(id, reqUsuario);
    },

    async delete(id) {
        const reqUsuario = await usuarioRepository.findById(id);
        if (!reqUsuario) {
            throw new Error(' Usuário não encontrado. ')
        }
        return await usuarioRepository.delete(id, reqUsuario)
    },
}