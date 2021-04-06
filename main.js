//task 2
function multi(num1, num2){
    var array = [[]];
    var subArray = [];
    for(var i = 1; i <= num1; i++){
        for(var j = 0; j <= num2; j++){
            subArray.push(i * j);
            // array[i][j] += [(i + 1) * (j + 1)];
        }
        array.push(subArray);
        subArray = [];

    }
    return array;
}

var array1 = multi(10, 10);
console.log('Task 2');
console.table(array1);

//task 3.(a)
function shape(type, perimete){
    this.getType = type;
    this.getPerimeter = perimeter(...perimete);
}
function perimeter(...edge){
    var sum = 0;
    for(var i = 0; i < edge.length; i++){
        sum += edge[i];
    }
    return sum;
}
var edges = [1, 2, 3];
var Triangle = new shape('Triangle', edges);

console.log('Task 3.a and b');
console.log(Triangle.getType, Triangle.getPerimeter);

//task 3.(d)
function shuffle(array) {
    var current = array.length;
    var temp;
    var random;

    while (current !== 0) {

        random = Math.floor(Math.random() * current);
        current -= 1;

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }

    return array;
}

var arrayTask3d = [1, 2, 3, 4, 5, 6, 7, 8, 9];
shuffle(arrayTask3d);
console.log('Task 3.d');
console.log(arrayTask3d);