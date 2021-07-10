const operacion = (n1:number, n2:number, op:string) => {
  return new Promise((resolve, reject) => {
    if(op === 'suma'){
      import('./suma').then(mod => resolve(new mod.Suma(n1, n2).resultado()))
    }else if(op === 'resta'){
      import('./resta').then(mod=> resolve(new mod.Resta(n1,n2).resultado()))
    }else{
      reject('Ingresa un numero')
    }
  })
};

const operaciones = async () => {
  const op1 = await operacion(2,2, 'suma')
  console.log(op1)
  const op2 = await operacion(5,5, 'resta')
  console.log(op2)
}

operaciones()