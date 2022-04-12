const commaSeperateNumber = (number) => {
  if (number === 0 || !number) {
    return number;
  }

  let numberArray = number
    .toString()
    .split("")
    .reverse()
    .map((el, i) => ((i + 1) % 3 === 0 ? `,${el}` : el))
    .reverse()
    .join("")
    .split("");

  if (numberArray[0] === ",") {
    numberArray.shift();
  }

  return numberArray.join("");
};

export default commaSeperateNumber;
