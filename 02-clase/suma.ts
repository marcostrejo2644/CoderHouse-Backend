export class Suma {
  protected n1;
  protected n2;
  constructor(n1:number, n2:number){
    this.n1 = n1;
    this.n2 = n2
  }
  resultado(){
    return  this.n1 + this.n2
  }
}