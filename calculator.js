function quartile(numQuartile,data){
    let percentage = (numQuartile * 25)/100;
    let result = percentage*data.length;
    if(!Number.isInteger(result)){
        return data[Math.ceil(result)-1];
    }
    return (data[result-1] + data[result])/2;
}

function iqr(data){
    return quartile(3,data) - quartile(1,data);
}

function arreteGauche(data){
    let valIqr = iqr(data);
    return Math.max(Math.min.apply(Math,data),quartile(1,data)-1.5*valIqr);
}
function arreteDroite(data){
    let valIqr = iqr(data);
    return Math.min(Math.max.apply(Math,data),quartile(3,data)+1.5*valIqr);
}
function donneesExtravagantes(data){
    let resultat = [];
    let valArreteGauche = arreteGauche(data);
    let valArreteDroite = arreteDroite(data);
    let i = 0;
    while(data[i] < valArreteGauche){
        resultat.push(data[i]);
        i++;
    }

    i = data.length-1
    while(data[i]>valArreteDroite){
        resultat.push(data[i]);
        i--;
    }

    return resultat;
}

function isValidData(data){
    for(let i = 0;i<data.length;i++){
        if(isNaN(data[i])){
            return false;
        }
    }
    return true;
}

function variance(data,average){
    let sum = 0;
    data.forEach(d => {
        sum += Math.pow(d-average,2);
    });
    return sum/(data.length-1);
}

function calculerMoustache(data){
    let result = {};
    if(isValidData(data)){
        result.sortedData = Array.from(data,x=>parseFloat(x)).sort(function(a,b){
            return a-b;
        });
        //https://codeburst.io/javascript-arrays-finding-the-minimum-maximum-sum-average-values-f02f1b0ce332
        result.average = result.sortedData.reduce((a,b) => a+b,0)/result.sortedData.length;
        result.variance = variance(result.sortedData,result.average);
        result.standardError = Math.sqrt(result.variance);
        result.valid = true;
        result.max = Math.max.apply(Math,result.sortedData);
        result.min = Math.min.apply(Math,result.sortedData);
        result.q1 = quartile(1,result.sortedData);
        result.q2 = quartile(2,result.sortedData);
        result.q3 = quartile(3,result.sortedData);
        result.iqr = iqr(result.sortedData);
        result.leftLimit = arreteGauche(result.sortedData);
        result.rigthLimit = arreteDroite(result.sortedData);
        result.extravData = donneesExtravagantes(result.sortedData);
    }else{
        result.valid = false;
    }
    return result;
}