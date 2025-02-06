import {brazilianMonths} from "@/utils/meses-pt-br";

export const formatDate = {
  methods: {
    formatDate(date) {
      if(!date) {
        return
      }
      const splittedDate = date.split("-");
      const [year, month, day] = splittedDate;
      const roundedMonth = Math.round(month);

      // const brazilianMonths = {
      //   0: "Janeiro",
      //   1: "Fevereiro",
      //   2: "Março",
      //   3: "Abril",
      //   4: "Maio",
      //   5: "Junho",
      //   6: "Julho",
      //   7: "Agosto",
      //   8: "Setembro",
      //   9: "Outubro",
      //   10: "Novembro",
      //   11: "Dezembro",
      // }
      
      return `${day} de ${brazilianMonths[roundedMonth - 1]}, ${year}`;
    }    
  }
}