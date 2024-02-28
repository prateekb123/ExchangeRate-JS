const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropDownSelect = document.querySelectorAll(".dropdown select")
const fromCun = document.querySelector(".from select")
const toCun = document.querySelector(".to select")
const btn = document.querySelector(".btn")
const extRatetext = document.querySelector(".change-rate")

for(let select of dropDownSelect){
    for(let code in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = code;
        newOpt.value = code;
        if(select.name ==='from' && code==='USD'){
            newOpt.selected = "selected"
        }else if(select.name ==='to' && code==='INR'){
            newOpt.selected = "selected"
        }
        select.append(newOpt)


    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    })
}

const updateFlag = (ele) =>{
    const currCode = ele.value;
    const ctyCode= countryList[currCode];
    console.log(currCode, ctyCode)
    const newFlagUrl = `https://flagsapi.com/${ctyCode}/flat/64.png`
    ele.parentElement.querySelector('img').src = newFlagUrl
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const currUrl =    `${BASE_URL}/${fromCun.value.toLowerCase()}/${toCun.value.toLowerCase()}.json`;
    const rate = await fetch(currUrl);
    const rateData = await rate.json()
    const exrate = rateData[toCun.value.toLowerCase()]
    console.log(exrate)
    let amount = document.querySelector(".amount input").value
    let AntAfterExchange = amount*exrate
    console.log(AntAfterExchange)
    extRatetext.innerHTML = `${amount} ${fromCun.value} = ${AntAfterExchange} ${toCun.value}`
})

