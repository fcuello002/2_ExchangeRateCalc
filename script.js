const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

//Fetch Exchange Rates & Update DOM
const calculate = () => {
  const firstCurrency = currencyOne.value;
  const secondCurrency = currencyTwo.value;
  fetch(
    `https://api.exchangerate-api.com/v4/latest/${firstCurrency}`
  )
    .then((res) => res.json())
    .then((data) => {
      const calculatedRate = data.rates[secondCurrency];
      rate.innerText = `1 ${firstCurrency} = ${calculatedRate} ${secondCurrency}`;
      amountTwo.value = (amountOne.value * calculatedRate).toFixed(2);
    });
};

const swapCurrencies = () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
}

//Event Listeners
currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

swap.addEventListener('click', swapCurrencies);

calculate();
