"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const operacion = (n1, n2, op) => {
    return new Promise((resolve, reject) => {
        if (op === 'suma') {
            Promise.resolve().then(() => __importStar(require('./suma'))).then(mod => resolve(new mod.Suma(n1, n2).resultado()));
        }
        else if (op === 'resta') {
            Promise.resolve().then(() => __importStar(require('./resta'))).then(mod => resolve(new mod.Resta(n1, n2).resultado()));
        }
        else {
            reject('Ingresa un numero');
        }
    });
};
const operaciones = () => __awaiter(void 0, void 0, void 0, function* () {
    const op1 = yield operacion(2, 2, 'suma');
    console.log(op1);
    const op2 = yield operacion(5, 5, 'resta');
    console.log(op2);
});
operaciones();
