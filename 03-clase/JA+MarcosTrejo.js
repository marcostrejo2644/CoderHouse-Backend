function test(words) {
  console.log('proceso terminado. Palabras totales: ', words);
}
function showText(text, fn, time = 1000) {
  const arrText = text.split(' ');
  let counter = 0;
  return new Promise((resolve, reject) => {
    const int = setInterval(() => {
      if (counter >= arrText.length) {
        clearInterval(int);
        fn(counter);
        resolve();
      } else {
        console.log(arrText[counter]);
        counter++;
      }
    }, time);
  });
}

showText('proceso de palabras 1', test, 200)
  .then(() => showText('lorem ipsum para el 2', test, 100))
  .then(() => showText('entrando al 3ro', test, 300));
