"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responsablesControllers = void 0;
const database_1 = __importDefault(require("../database"));
class ResponsablesControllers {
    index(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const responsables = yield database_1.default.query('SELECT * FROM responsable INNER JOIN rol ON rol.idRoles = responsable.idRoles');
            resp.json(responsables);
        });
    }
    getResponsable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idResp } = req.params;
            try {
                const result = yield database_1.default.query('SELECT * FROM responsable WHERE idResp = ?', [idResp]);
                if (result.length > 0) {
                    res.json(result[0]);
                }
                else {
                    res.status(404).json({ message: 'Responsable no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener el responsable', error });
            }
        });
    }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO responsable set ?', [req.body]);
            resp.json({ message: 'Responsable guardado' });
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idResp } = req.params;
            yield database_1.default.query('DELETE FROM responsable WHERE idResp = ?', [idResp]);
            resp.json({ message: 'Responsable eliminado' });
        });
    }
    updateResponsable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idResp } = req.params;
            const updateData = req.body;
            try {
                const result = yield database_1.default.query('UPDATE responsable SET ? WHERE idResp = ?', [updateData, idResp]);
                if (result.affectedRows > 0) {
                    res.json({ message: 'Responsable actualizado' });
                }
                else {
                    res.status(404).json({ message: 'Responsable no encontrado para actualizar' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar el responsable', error });
            }
        });
    }
}
exports.responsablesControllers = new ResponsablesControllers();
