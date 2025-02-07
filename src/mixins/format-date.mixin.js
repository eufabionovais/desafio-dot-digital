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

      return `${day} de ${brazilianMonths[roundedMonth - 1]}, ${year}`;
    }    
  }
}