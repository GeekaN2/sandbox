// maxTriSum ([3,2,6,8,2,3]) ==> return (17) // максимальную сумму дают числа 6, 8, 3
// maxTriSum ([2,1,8,0,6,4,8,6,2,4]) ==> return (18) // максимальную сумму дают числа 8, 6, 4 
// maxTriSum ([-7,12,-7,29,-5,0,-7,0,0,29]) ==> return (41) // максимальную сумму дают числа 12, 29, 0

function maxTriSum(numbers) {
    let arr = [...new Set(numbers)].sort((a, b) => b - a);
    
    return arr[0] + arr[1] + arr[2];
}

////

/*
Дана строка, состоящая из букв латинского алфавита, цифр и скобок  {([])}.
Необходимо проверить, что скобки в строке сбалансированы — на каждую
открывающую скобку приходится закрывающая, и скобочные группы не пересекаются.
Напишите функцию, которая принимает такую строку и возвращает true,
если скобки сбалансированы, и false, если не сбалансированы.
*/

function isValid(str) {
  let stack = [];
  let isOpen = (bracket) => '{(['.split('').includes(bracket);
  let brackets = {
      '{': '}',
      '[': ']',
      '(': ')'
  }
  
  str = str.replace(/[^\{\}\[\]\(\)]+/g, '');
  
  
  for (let i = 0; i < str.length; i++) {
      if (isOpen(str[i])) {
          stack.push(str[i]);
          
      } else {
          let lastBracket = stack.pop();
          
          if (str[i] != brackets[lastBracket]) {
              return false;
          }
      }
  }
  
  return stack.length == 0;
}

isValid("(foo)");      // true
isValid("(f[o]{o})");  // true
isValid("[(){}()()]"); // true
isValid("(foo");       // false — нет закрывающей
isValid("{f[o}o]");    // false — скобки пересекаются


/////////
// var list = [{w: 10, banner: {id: 1}}, {w: 130, banner: {id: 2}}, ..];
function getBanner(list) {
    let sum = list.reduce((total, banner) => {
        return total + banner.w;
    }, 0);
    
    let randomWeight = Math.floor(Math.random() * sum); // 0 <= random < sum
    let myBanners = JSON.parse(JSON.stringify(list));
    
    for (let i = 0, s = 0; i < myBanners.length; i++) {
        myBanners[i].w = myBanners[i].w + s;
        s += myBanners[i].w;
    }
    
    // myBanners: [{w: 10, banner: {id: 1}}, {w: 140, banner: {id: 2}}, ..];
    
    for (let i = 0; i < list.length; i++) {
        let banner = list[i];

        if (banner.w < randomWeight) {
            return banner.banner.id;
        }
    }
}

