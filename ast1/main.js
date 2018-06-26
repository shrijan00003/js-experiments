/**
 * FIRST ASSIGNMENT GIVEN IN JS CLASS ON 25 JUNE
 * CREATING PATTERNS USING SETINTERVAL 
 */

// function pattern(n) {
//     console.log(n);
//     for (var i = 0; i < 5; i++) {
//         var str="";
//         for (var j = 0; j < i; j++) {
//             str+='*';
//         }
//         console.log(str);
//     }
//     for (var i = 5; i > 0; i--) {
//         var str="";
//             for (var j = i; j > 0; j--) {
//                 str+= '*';
//             }
//             console.log(str);
//         }
//     }
// function animate(n) {
//     for (var i = 0; i <= n; i++) {
//         setTimeout(function (n) {
//            return function(){
//                return pattern();
//            }
//         }(i), 1000);
//     }
// }

// animate(10)
function animate(n) {
    var str = "";
    var stop = n;
    var increment = true;
    var i = 0;
    setInterval(function () {
        if (increment) {
            str += "*";
            i += 1;
        } else {
            str = str.slice(0, -1);
            i -= 1;
        }

        if (i === stop) {
            increment = !increment;
            if (stop === n) {
                stop = 1;
            } else {
                stop = n;
            }
        }
        console.log(str);
    }, 100);
}

animate(10);

