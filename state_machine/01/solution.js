const solution = str => {
	const result = [];
	let newStr = '';
	let state = 'befor'; 
	for (let i = 0; i < str.length; i++) {
		switch(state) {
			case 'befor':
				if (str[i] !== ' ' && str[i] !== '\n') {
					newStr += str[i];
					state = 'inside'
				}
				break;
			case 'inside':
				if (str[i] === '\n') {
					result.push(newStr);
					newStr = '';
					state = 'befor';
				}
				else if (str[i] === ' ') {
					result.push(newStr);
					newStr = '';
					state = 'after';
				}
				else {
					newStr += str[i];
				}
				break;
			default:
				if (str[i] === '\n') state = 'befor';
				break;
		}
	}

	return result;
};

export default solution;

/*
	befor - старт с новой строки после знака \n
	inside  - сохранение первого слова в новой строке 
	after - пушим готовое слово и сбрасываем все данные
*/
/*
	Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход текст и 
	возвращает массив состоящий из первых слов каждой строки текста. Пустые строчки должны игнорироваться.

	Строки разделяются переводом строки
	В любом месте строки может быть сколько угодно пробелов
	Текст должен перебираться посимвольно (мы пишем лексер)
	const text = '  what who   \nhellomy\n hello who are you\n';
	const result = solution(text);
	// [
	//   'what',
	//   'hellomy',
	//   'hello',
	// ];
	Решение должно быть автоматным

*/