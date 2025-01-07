async function collectData(){
    t1= document.getElementById("t1").value;
    t2= document.getElementById("t2").value;
    amt= document.getElementById("amt").value;
    key=document.getElementById("inputapikey").value;
    await convert(t1,t2,amt,key);
}
async function bestways(){
    t1= document.getElementById("t1").value;
    t2= document.getElementById("t2").value;
    amt= document.getElementById("amt").value;
    key=document.getElementById("inputapikey").value;
    await earn(t1,t2,amt,key);
}
async function convert(a,b,c,k){
    try{ 
        const url = `https://v6.exchangerate-api.com/v6/${k}/latest/${a}`;
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.conversion_rates[b];
        const final = c * rate;
        document.getElementById("result").innerText = `${c} ${a} is equal to ${final.toFixed(4)} ${b}!`;
        }catch (error) {
            document.getElementById("result").innerText = `Please input valid currency type above`;
        }
}
async function earn(x,y,z,k){
 try{
    response = await fetch(`https://v6.exchangerate-api.com/v6/${k}/latest/${x}`)
    data = await response.json();
    allrates = data.conversion_rates;
    starttoend = data.conversion_rates[y];
    amount = starttoend*z;
    max=0; max2=0; max3=0;
    currency=""; currency2=""; currency3 ="";
    for([middle,starttomid] of Object.entries(allrates)){
        response2 = await fetch(`https://v6.exchangerate-api.com/v6/${k}/latest/${middle}`)
        data2 = await response2.json();
        midtoend = data2.conversion_rates[y];
        amountnow = z*starttomid*midtoend;
        profit = amountnow-amount;
        if(profit>max){
            max = profit;
            currency =`${middle}`;
        }
        if(profit!=max){
            if(profit>max2){
                max2=profit;
                currency2=`${middle}`;
            }
        }
        if(profit!=max && profit!=max2){
            if(profit>max3){
                max3=profit;
                currency3=`${middle}`;
            }
        }
       }
       document.getElementById("bestway1").innerText = `Profit of ${max.toFixed(7)}${y} by ${x}-${currency}-${y}`; 
       document.getElementById("bestway2").innerText = `Profit of ${max2.toFixed(7)}${y} by ${x}-${currency2}-${y}`; 
       document.getElementById("bestway3").innerText = `Profit of ${max3.toFixed(7)}${y} by ${x}-${currency3}-${y}`; 
    }catch(error){
        document.getElementById("bestway1").innerText = `New API-key required`;
 }
}
