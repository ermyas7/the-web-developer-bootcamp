function average(grades){
    var sum = 0;
    for(var i = 0; i < grades.length; i++){
        sum += grades[i];
    }
    return Math.round(sum/grades.length);
}

var grade1 = [100, 91, 94, 98, 90];
var grade2 = [94, 92, 90, 89, 85];

console.log(average(grade1));
console.log(average(grade2));