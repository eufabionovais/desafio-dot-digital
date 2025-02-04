import { helpers } from "@vuelidate/validators";

export const isValidCPF = helpers.withMessage("CPF inválido", (value) => {
  if (!value) return false; // CPF não pode estar vazio

  // Remove caracteres não numéricos
  const cpf = value.replace(/\D/g, "");

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) return false;

  // Rejeita CPFs com todos os números iguais (ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // Função para validar os dígitos verificadores
  const calcCheckDigit = (cpf, factor) => {
    let total = 0;
    for (let i = 0; i < factor - 1; i++) {
      total += parseInt(cpf[i]) * (factor - i);
    }
    const remainder = (total * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  // Valida o primeiro e o segundo dígito verificador
  const firstDigit = calcCheckDigit(cpf, 10);
  const secondDigit = calcCheckDigit(cpf, 11);

  return firstDigit === parseInt(cpf[9]) && secondDigit === parseInt(cpf[10]);
});
