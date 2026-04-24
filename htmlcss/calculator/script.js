let calculation = "";

const updateCalculation = (value) => {
  calculation += value;
  console.log(calculation);
}

const equal = () => {
  calculation = eval(calculation);
  console.log(calculation);
}

const clearCalculation = () => {
  calculation = "";
  console.log(calculation);
}