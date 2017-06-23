// 在数组 arr 末尾添加元素 item。不要直接修改数组 arr，结果返回新的数组 
var append = function (arr, item) {
    return arr.concat(item);
};

// 删除数组 arr 最后一个元素。不要直接修改数组 arr，结果返回新的数组 
function truncate(arr) {
    return arr.slice(0, -1);
}

// 移除数组 arr 中的所有值与 item 相等的元素。不要直接修改数组 arr，结果返回新的数组
function remove(arr, item) {    
    var a = [];    
    for (var i = 0; i < arr.length; i++) {        
        if (arr[i] != item) {           
            a.push(arr[i]);
        }
    }
    return a;
}

// 移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回 
function removeWithoutCopy(arr, item) {    
    for (var i = 0; i < arr.length; i++)     {        
        if (item == arr[i])         {            
            arr.splice(i, 1);            
            i--;        
        }    
    }    
    return arr;
}

// 找出元素 item 在给定数组 arr 中的位置 
function indexOf(arr, item) {  
    if (Array.prototype.indexOf) {    
        return arr.indexOf(item);  
    } else {    
        for (var i = 0; i < arr.length; i++) {      
            if (arr[i] === item) {        
                return i;      
            }    
        }  
    }     
    return -1;
}

// 计算给定数组 arr 中所有元素的总和 
function sum(arr) {    
    var s = 0;    
    for (var i = arr.length - 1; i >= 0; i--) {        
        s += arr[i];    
    }    
    return s;
}

// 为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组 
function square(arr) {    
    return arr.map(function (item, index, array) {        
        return item * item;    
    });
}

// 在数组 arr 中，查找值与 item 相等的元素出现的所有位置 
function findAllOccurrences(arr, target) {

    var temp = [];  
    arr.forEach(function (val, index) {    
        val !== target ||  temp.push(index);  
    });  
    return temp;
}

// 统计数组 arr 中值等于 item 的元素出现的次数 
function count(arr, item) {    
    var count = 0;    
    arr.forEach(function (e) {        
        e == item ? count++ : 0;    
    });    
    return count; 
}

// 找出数组 arr 中重复出现过的元素 
function duplicates(arr) {    
    var a = [],
        b = [];    
    for (var i = 0; i < arr.length; i++) {        
        if (!b[arr[i]]) {            
            b[arr[i]] = 1;            
            continue;        
        }        
        b[arr[i]]++;    
    }    
    for (var i = 0; i < b.length; i++) {        
        if (b[i] > 1) {            
            a.push(i);        
        }    
    }    
    return a; 
}

// 合并数组 arr1 和数组 arr2。不要直接修改数组 arr，结果返回新的数组 
function concat(arr1, arr2) {
    return arr1.concat(arr2);
}

// 在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组 
function insert(arr, item, index) {    
    var a = arr.slice(0);    
    a.splice(index, 0, item);    
    return a; 
}


// 在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组 
function prepend(arr, item) {
    return [item].concat(arr);
}

// 删除数组 arr 第一个元素。不要直接修改数组 arr，结果返回新的数组 
function curtail(arr) {
    return arr.slice(1);
}