/*
Дан массив ссылок: ['url1', 'url2', ...] и лимит одновременных запросов (limit)
Необходимо реализовать функцию, которая опросит урлы и вызовет callback c массивом ответов
['url1_answer', 'url2_answer', ...] так, чтобы в любой момент времени выполнялось не более limit
запросов (как только любой из них завершился, сразу же отправляется следующий)
Т.е. нужно реализовать шину с шириной равной limit.

Требования:
- Порядок в массиве ответов должен совпадать с порядком в массиве ссылок

Для опроса можно использовать fetch или $.get
Ошибки обрабатывать не нужно
*/

// async fetch(url: string): Promise<string>;
// fetch(url: string, callback: (string) -> void): void;

function parallelLimit(urls, limit, callback) {
    let ans = [];
    let urlCounter = 0;
    let finishedRequests = 0;
    
    let getData = () => {
        const urlToDownload = urlCounter;
        urlCounter++;
        
        fetch(url, ((str) => {
            ans[urlToDownload] = str;
            finishedRequests++;
            
            if (!urls[urlCounter]) {
                if (finishedRequests == urls.length) {
                    callback(ans);
                }
                
                return;
            }
            
            getData(urls[urlCounter], urlCounter);
        }));
    }
    
    for (let i = 0; i < Math.min(limit, urls.length); i++) {
        getData();
    }
}

/*
Группировка анаграмм
Дан массив строк, необходимо сгруппировать анаграммы.
Слово X является анаграммой слова Y если одно может быть получено из другого перестановкой букв.
В итоговом массиве каждый массив анаграмм должен быть отсортирован в лексикографическом порядке.
Все слова в исходном массиве состоят только из строчных латинских букв

Sample Input
["eat", "tea", "tan", "ate", "nat", "bat"]

Sample Output
[
  ["ate", "eat","tea"],
  ["nat","tan"],
  ["bat"]
]
*/
function groupAnagrams(input) {
    let grouped = {};
    
    input.forEach(word => {
        let sortedWord = word.split('').sort().join('');
    
        if (!grouped[sortedWord]) {
            grouped[sortedWord] = [];
        }

        grouped[sortedWord].push(word);
    });
    
    for (let key in grouped) {
        grouped[key] = grouped[key].sort();
    }

    return Object.values(grouped);
}




