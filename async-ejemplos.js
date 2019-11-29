// setTimeout(function() {
//   console.log("Primera instrucción");
// }, 5000);

// console.log("Segunda instrucción");

// consultaABaseDeDatos('SELECT ....', function(response) {
//   // Aqui va el código a ejecutarse
// })

// function ejemplo(funcionCallback) {
//   setTimeout(function() {
//     funcionCallback(3);
//   }, 3000);
// }

//Sintaxis de flecha (parametros) => {}

// ejemplo((resultado) => {
//   console.log(resultado);
// });

function ejemplo(val) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      if (val === "error") reject("ha habido un error");
      else resolve(val);
    }, 3000);
  });
}

// ejemplo(15)
//   .then(resultado => {
//     console.log(`Primera promesa resultado: ${resultado}`);
//     return ejemplo("Hola");
//   })
//   .then(resultado => {
//     console.log(`Segunda promesa resultado: ${resultado}`);
//     return ejemplo("error");
//   })
//   .catch(error => {
//     console.error(`Error: ${error}`);
//   });

// async function async_await() {
//   const resultado1 = await ejemplo("Estoy usando async await");
//   console.log(resultado1);
//   const resultado2 = await ejemplo(200);
//   console.log(resultado2);
//   // const estoCrearaUnEror = await ejemplo("error");
//   try {
//     const estoCrearaUnEror = await ejemplo("error");
//   } catch (error) {
//     console.error(error);
//   }
// }

// async_await();
