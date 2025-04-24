import { ValidacionClave } from "./model";

//Validación mayúsculas y minúsculas
export const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
  let tieneMayus = false;
  let tieneMinus = false;

  for (const c of clave) {
    if (c >= "A" && c <= "Z") tieneMayus = true;
    if (c >= "a" && c <= "z") tieneMinus = true;
  }

  return tieneMayus && tieneMinus
    ? { esValida: true }
    : {
        esValida: false,
        error: "La clave debe de tener mayúsculas y minúsculas",
      };
};

// Validación números
export const tieneNumeros = (clave: string): ValidacionClave => {
  for (const c of clave) {
    if (c >= "0" && c <= "9") return { esValida: true };
  }
  return { esValida: false, error: "La clave debe de tener números" };
};

// Validación caracteres especiales
export const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
  for (const c of clave) {
    const esLetra = (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
    const esNumero = c >= "0" && c <= "9";
    if (!esLetra && !esNumero) return { esValida: true };
  }
  return {
    esValida: false,
    error: "La clave debe de tener caracteres especiales",
  };
};

// Validación longitud mínima de 8 caracteres
export const tieneLongitudMinima = (clave: string): ValidacionClave =>
  clave.length >= 8
    ? { esValida: true }
    : {
        esValida: false,
        error: "La clave debe de tener una longitud mínima de 8 caracteres",
      };

// Validación nombre usuario
export const tieneNombreUsuario = (
  nombreUsuario: string,
  clave: string
): ValidacionClave =>
  clave.toLowerCase().includes(nombreUsuario.toLowerCase())
    ? { esValida: false, error: "La clave no debe tener el nombre del usuario" }
    : { esValida: true };

// Validación palabras comunes
export const tienePalabrasComunes = (
  clave: string,
  comunes: string[]
): ValidacionClave => {
  const claveLower = clave.toLowerCase();
  for (const palabra of comunes) {
    if (claveLower.includes(palabra.toLowerCase())) {
      return {
        esValida: false,
        error: "La clave no debe de contener palabras comunes",
      };
    }
  }
  return { esValida: true };
};

// Validación clave
export const validarClave = (
  nombreUsuario: string,
  clave: string,
  commonPasswords: string[]
): ValidacionClave => {
  const pasos: ValidacionClave[] = [
    tieneMayusculasYMinusculas(clave),
    tieneNumeros(clave),
    tieneCaracteresEspeciales(clave),
    tieneLongitudMinima(clave),
    tieneNombreUsuario(nombreUsuario, clave),
    tienePalabrasComunes(clave, commonPasswords),
  ];

  for (const validacion of pasos) {
    if (!validacion.esValida) {
      return validacion;
    }
  }

  return { esValida: true };
};
