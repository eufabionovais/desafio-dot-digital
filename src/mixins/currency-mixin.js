export const currencies = {
  methods: {
    brCurrency(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || '';
    }
  }
}