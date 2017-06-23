// 获取数字 num 二进制形式第 bit 位的值。注意：
// 1、bit 从 1 开始
// 2、返回 0 或 1
// 3、举例：2 的二进制为 10，第 1 位为 0，第 2 位为 1
function valueAtBit(num, bit) {
    var s = num.toString(2);
    return s[s.length - bit];
}

// 给定二进制字符串，将其换算成对应的十进制数字
function base10(str) {
    return parseInt(str, 2);
}

// 将给定数字转换成二进制字符串。如果字符串长度不足 8 位，则在前面补 0 到满8位。 
function convertToBinary(num) {
    var s = num.toString(2);
    var l = s.length;
    if (l < 8) {
        var s1 = "0000000";        
        var s2 = s1.slice(0, 8 - l);        
        s = s2 + s;     
    }    
    return s; 
}

// 求 a 和 b 相乘的值，a 和 b 可能是小数，需要注意结果的精度问题 
function multiply(a, b) {    
    a = a.toString();    
    b = b.toString();    
    var aLen = a.substring(a.indexOf(".") + 1).length;    
    var bLen = a.substring(a.indexOf(".") + 1).length;    
    return (a * Math.pow(10, aLen)) * (b * Math.pow(10, bLen)) / Math.pow(10, aLen + bLen);
}