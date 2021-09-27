// mainnet
// export const web3 = new Web3('https://bsc-dataseed1.binance.org:443');


export const Truncate = (str_temp, len=10)=> {
    if ( !str_temp ) return "0";
    var str = str_temp.toString();
    if (str_temp === null || str_temp.length == 0) str="0";
    if ( len == -1 ){
        return str?.length > 11 ? str.substring(0, 4) + "..." + str.substring( str.length-4): "";
    } else if (len == -2){
        let count = str.split(",").length;
        if (count<3) return str;
        else if ( count < 4 ) return str.substring(0, str.length - 9) ;
        else if ( count < 5 ) return str.substring(0, str.length - 13) ;
        else return str.substring(0, str.length - 17) ;
    } else if (len == -18) {
        return str.substring(0, str.length-18); 
    }
    return str?.length > len ? str.substring(0, len-3) + "..." : str;
}

export const sortTime = (time) => {
    if (time < 10) {
        time = '0' + time;
    }
    return time;
}

export const getDateTime = (endTime) => {
    const timeNow = new Date().getTime();
    let d = endTime - timeNow;
    const month = Math.floor(d % (1000 * 60 * 60 * 24 * 30 * 12) / (1000 * 60 * 60 * 24 * 30));
    let day = Math.floor(d % (1000 * 60 * 60 * 24 * 30) / (1000 * 60 * 60 * 24));
    const hour = Math.floor(d % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    const minute = Math.floor(d % (1000 * 60 * 60) / (1000 * 60));
    const second = Math.floor(d % (1000 * 60) / (1000));
    return { timeNow, d, month, day, hour, minute, second}
}
