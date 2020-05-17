function quartile(numQuartile,data){
    let percentage = (numQuartile * 25)/100;
    data.sort(function(a,b){
        return a-b;
    });
    let result = percentage*data.length;
    if(!Number.isInteger(result)){
        return data[Math.ceil(result)-1];
    }
    return (+data[result-1] + +data[result])/2;
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
    data.sort(function(a,b){
        return a-b;
    });
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

function calculerMoustache(data){
    let result = {};
    if(isValidData(data)){
        result.valid = true;
        result.max = Math.max.apply(Math,data);
        result.min = Math.min.apply(Math,data);
        result.q1 = quartile(1,data);
        result.q2 = quartile(2,data);
        result.q3 = quartile(3,data);
        result.iqr = iqr(data);
        result.leftLimit = arreteGauche(data);
        result.rigthLimit = arreteDroite(data);
        result.extravData = donneesExtravagantes(data);
    }else{
        result.valid = false;
    }
    return result;
}