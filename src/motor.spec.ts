import {
  tieneMayusculasYMinusculas,
  tieneNumeros,
  tieneCaracteresEspeciales,
  tieneLongitudMinima,
  tieneNombreUsuario,
  tienePalabrasComunes,
  validarClave,
} from "./motor"; // Importando las funciones correctas
import { ValidacionClave } from "./model";

describe("Validaciones de contraseña", () => {
  // Validación de mayúsculas y minúsculas
  it("debería devolver false si la clave no tiene mayúsculas y minúsculas", () => {
    // Arrange
    const clave = "12345678";

    // Act
    const resultado: ValidacionClave = tieneMayusculasYMinusculas(clave);

    // Assert
    expect(resultado.esValida).toBe(false);
    expect(resultado.error).toBe(
      "La clave debe de tener mayúsculas y minúsculas"
    );
  });

  it("debería devolver true si la clave tiene mayúsculas y minúsculas", () => {
    // Arrange
    const clave = "Abc12345";

    // Act
    const resultado: ValidacionClave = tieneMayusculasYMinusculas(clave);

    // Assert
    expect(resultado.esValida).toBe(true);
  });

  // Validación de números
  it("debería devolver false si la clave no tiene números", () => {
    // Arrange
    const clave = "Abcdefgh";

    // Act
    const resultado: ValidacionClave = tieneNumeros(clave);

    // Assert
    expect(resultado.esValida).toBe(false);
    expect(resultado.error).toBe("La clave debe de tener números");
  });

  it("debería devolver true si la clave tiene números", () => {
    // Arrange
    const clave = "Abc12345";

    // Act
    const resultado: ValidacionClave = tieneNumeros(clave);

    // Assert
    expect(resultado.esValida).toBe(true);
  });

  // Validación de caracteres especiales
  it("debería devolver false si la clave no tiene caracteres especiales", () => {
    // Arrange
    const clave = "Abc12345";

    // Act
    const resultado: ValidacionClave = tieneCaracteresEspeciales(clave);

    // Assert
    expect(resultado.esValida).toBe(false);
    expect(resultado.error).toBe(
      "La clave debe de tener caracteres especiales"
    );
  });

  it("debería devolver true si la clave tiene caracteres especiales", () => {
    // Arrange
    const clave = "Abc123!@";

    // Act
    const resultado: ValidacionClave = tieneCaracteresEspeciales(clave);

    // Assert
    expect(resultado.esValida).toBe(true);
  });

  // Validación de longitud mínima
  it("debería devolver false si la clave tiene menos de 8 caracteres", () => {
    // Arrange
    const clave = "Abc123";

    // Act
    const resultado: ValidacionClave = tieneLongitudMinima(clave);

    // Assert
    expect(resultado.esValida).toBe(false);
    expect(resultado.error).toBe(
      "La clave debe de tener una longitud mínima de 8 caracteres"
    );
  });

  it("debería devolver true si la clave tiene 8 o más caracteres", () => {
    // Arrange
    const clave = "Abc12345";

    // Act
    const resultado: ValidacionClave = tieneLongitudMinima(clave);

    // Assert
    expect(resultado.esValida).toBe(true);
  });

  // Validación del nombre de usuario
  it("debería devolver false si la clave contiene el nombre de usuario", () => {
    // Arrange
    const nombreUsuario = "Juan";
    const clave = "juan12345";

    // Act
    const resultado: ValidacionClave = tieneNombreUsuario(nombreUsuario, clave);

    // Assert
    expect(resultado.esValida).toBe(false);
    expect(resultado.error).toBe(
      "La clave no debe tener el nombre del usuario"
    );
  });

  it("debería devolver true si la clave no contiene el nombre de usuario", () => {
    // Arrange
    const nombreUsuario = "Juan";
    const clave = "12345abc";

    // Act
    const resultado: ValidacionClave = tieneNombreUsuario(nombreUsuario, clave);

    // Assert
    expect(resultado.esValida).toBe(true);
  });

  // Validación de palabras comunes
  it("debería devolver false si la clave contiene palabras comunes", () => {
    // Arrange
    const clave = "password123";
    const comunes = ["password", "12345"];

    // Act
    const resultado: ValidacionClave = tienePalabrasComunes(clave, comunes);

    // Assert
    expect(resultado.esValida).toBe(false);
    expect(resultado.error).toBe(
      "La clave no debe de contener palabras comunes"
    );
  });

  it("debería devolver true si la clave no contiene palabras comunes", () => {
    // Arrange
    const clave = "MiClaveSegura!1";
    const comunes = ["password", "12345"];

    // Act
    const resultado: ValidacionClave = tienePalabrasComunes(clave, comunes);

    // Assert
    expect(resultado.esValida).toBe(true);
  });

  // Validación final de la clave
  it("debería devolver false si alguna validación falla", () => {
    // Arrange
    const nombreUsuario = "Juan";
    const clave = "juan123";

    // Act
    const resultado: ValidacionClave = validarClave(nombreUsuario, clave, [
      "password",
      "12345",
    ]);

    // Assert
    expect(resultado.esValida).toBe(false);
  });

  it("debería devolver true si todas las validaciones pasan", () => {
    // Arrange
    const nombreUsuario = "usuario123";
    const clave = "Abc123!@#";
    const comunes = ["123456", "password", "admin"];

    // Act
    const resultado = validarClave(nombreUsuario, clave, comunes);

    // Assert
    expect(resultado.esValida).toBe(true);
  });
});
