import {InputBox} from "./components";
import { useState, useMemo } from "react";
import  useCurrencyInfo  from "./hooks/useCurrencyInfo";
function App() {
console.log("App rendered");
const [from, setFrom] = useState("usd");
const [to, setTo] = useState("inr");
const [amount, setAmount] = useState(0);
const [convertedAmount, setConvertedAmount] = useState(0);


const { data: currencyInfo, loading, error } = useCurrencyInfo(from);


const options = useMemo(() => {
  return currencyInfo ? Object.keys(currencyInfo) : [];
}, [currencyInfo]);


const swap = () => {
  setFrom(to)
  setTo(from)
  setConvertedAmount(amount)
  setAmount(convertedAmount)
}


  return (
      <div
          className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/001/966/624/original/money-transfer-global-currency-stock-exchange-stock-illustration-vector.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",          
          }}
      >
          <div className="w-full">
            <h1 className="text-white text-3xl font-bold text-center my-3 py-5 mb-8 font-mono">Currency Converter</h1>
              <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                  <form  onSubmit={  (e) => {  e.preventDefault();  setConvertedAmount(amount * currencyInfo[to])}}>
                      <div className="w-full mb-1">
                          <InputBox  
                            label="From"
                            value={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            selectCurrency={from}
                            onAmountChange={(amount) => amount>=0 ? setAmount(amount) : setAmount(0)} 
                          />
                      </div>
                      <div className="relative w-full h-0.5">
                          <button
                              type="button"
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md font-mono bg-black text-white px-2 py-0.5"
                              onClick={swap}
                          >
                              swap
                          </button>
                      </div>
                      <div className="w-full mt-1 mb-4">
                          <InputBox
                              label="To"
                              value={convertedAmount}
                              onAmountChange={(amount) => setConvertedAmount(amount)}
                              onCurrencyChange={(currency) => setTo(currency)}
                              currencyOptions={options}
                              selectCurrency={to}
                              dis={true}
                              
                          />
                      </div>
                      <button type="submit" className="w-full bg-black text-white px-4 py-3 rounded-lg font-mono">
                          Convert {from.toUpperCase()} to {to.toUpperCase()}
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default App;