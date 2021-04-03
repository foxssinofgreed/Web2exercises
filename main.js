



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
console.table(array1);

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

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
shuffle(array);
console.log(array);