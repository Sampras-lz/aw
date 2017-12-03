var average = function(array){
    //calculate the sum of all values in the array
    var sum = 0;
    array.forEach(function(value){
        sum += value;
    })
    //calculate the average
    var avg = sum/array.length;
    avg = Math.round(avg);
    return avg;
}

// //This data is for testing function
// var data = [48,6,1,56,2,65,68,98,65,12,41];
// console.log(average(data),data.length);
