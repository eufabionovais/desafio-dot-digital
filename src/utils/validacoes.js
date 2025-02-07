import { required, email, minLength, helpers } from '@vuelidate/validators'
import { isValidCPF } from "../validators/custom-validators"; 

export default {
    nome: { 
      required: helpers.withMessage('O campo nome é obrigatório.', required),
      minLength: helpers.withMessage('O nome deve ter pelo menos 3 caracteres.', minLength(3)),
    }, 
    cpf: {
      required: helpers.withMessage('O campo CPF é obrigatório.', required),
      minLength: helpers.withMessage('O nome deve ter pelo menos 11 dígitos.', minLength(14)), //minLength considera caractéres de máscara
      isValidCPF: helpers.withMessage('CPF inválido.', isValidCPF) 
    }, 
    celular: {
      required: helpers.withMessage('O campo celular é obrigatório.', required),
      minLength: helpers.withMessage('O nome deve ter pelo menos 9 dígitos.', minLength(15)), //minLength considera caractéres de máscara
    }, 
    email: { 
      required: helpers.withMessage('O campo e-mail é obrigatório.', required), 
      email: helpers.withMessage('Insira um e-mail válido.', email)
    }, 
    cep: {
      required: helpers.withMessage('O campo CEP é obrigatório.', required),
      minLength: helpers.withMessage('O nome deve ter pelo menos 5 dígitos.', minLength(6)),//minLength considera caractéres de máscara
    }, 
    endereco: {
      required: helpers.withMessage('O campo Endereço é obrigatório.', required)
    }, 
    cidade: {
      required: helpers.withMessage('O campo Cidade é obrigatório.', required)
    }, 
    estado: {
      required: helpers.withMessage('O campo Estado é obrigatório.', required)
    }, 
}