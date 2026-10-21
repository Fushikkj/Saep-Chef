import { Router } from "express";
import { usuarioRepository } from "../repositories/usuarioRepository.js";

const router = Router();

router.get("/usuario", usuarioRepository.getByLogin);
router.get("/usuario", usuarioRepository.findAll);
router.get("/:id", usuarioRepository.findById);

export default router;
