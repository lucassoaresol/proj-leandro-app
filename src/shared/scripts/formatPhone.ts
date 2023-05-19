export const formatPhone = (str: string) => {
  return str
    .replace(/\D/g, "")
    .replace(
      /(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/,
      (fullMatch, country, ddd, dddWithZero, prefixTel, suffixTel) => {
        if (country) {
          fullMatch = `${country} (${
            ddd || dddWithZero
          }) ${prefixTel}-${suffixTel}`;
          return fullMatch;
        }
        if (ddd || dddWithZero)
          return `(${ddd || dddWithZero}) ${prefixTel}-${suffixTel}`;
        if (prefixTel && suffixTel) return `${prefixTel}-${suffixTel}`;
        return str;
      }
    );
};
