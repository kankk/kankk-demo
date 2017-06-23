// 给定字符串 str，检查其是否包含数字，包含返回 true，否则返回 false
function containsNumber(str) {
    var b = /\d/;
    return b.test(str);
}

// 给定字符串 str，检查其是否包含连续重复的字母（a-zA-Z），包含返回 true，否则返回 false 
function containsRepeatingLetter(str) {
    return /([a-zA-Z])\1/.test(str);
}

// 给定字符串 str，检查其是否以元音字母结尾
// 1、元音字母包括 a，e，i，o，u，以及对应的大写
// 2、包含返回 true，否则返回 false 
function endsWithVowel(str) {
    return /[a,e,i,o,u]$/i.test(str);
}

// 给定字符串 str，检查其是否包含 连续3个数字 
// 1、如果包含，返回最新出现的 3 个数字的字符串
// 2、如果不包含，返回 false 
function captureThreeNumbers(str) {  
    var reg;  
    if (reg = str.match(/(\d{3})/)) {    
        return reg[0];  
    } else {    
        return false;  
    }
}

// 给定字符串 str，检查其是否符合如下格式
// 1、XXX-XXX-XXXX
// 2、其中 X 为 Number 类型 
function matchesPattern(str) {
    return /^(\d{3}-){2}\d{4}$/.test(str);
}

// 给定字符串 str，检查其是否符合美元书写格式
// 1、以 $ 开始
// 2、整数部分，从个位起，满 3 个数字用 , 分隔
// 3、如果为小数，则小数部分长度为 2
// 4、正确的格式如：$1,023,032.03 或者 $2.03，错误的格式如：$3,432,12.12 或者 $34,344.3 
function isUSD(str) {
    return /^\$\d{1,3}(,\d{3})*(\.\d{2})?$/.test(str);
}