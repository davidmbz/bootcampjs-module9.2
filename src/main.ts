import "./style.css";

import { validarClave } from "./motor";
import { commonPasswords } from "./model";

const nombreUsuario = "david";
const clave = "D@v1d@025";

const resultado = validarClave(nombreUsuario, clave, commonPasswords);

if (resultado.esValida) {
  console.log("Clave válida");
} else {
  console.log(`Error: ${resultado.error}`);
}
