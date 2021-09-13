import AssymetricClass from './typings/Asymmetric' 
import SymmetricClass from './typings/Symmetric'
import HashClass from './typings/Hash'

declare module "squirrel_crypto" {
  export class Asymmetric extends AssymetricClass {}
  export class Symmetric extends SymmetricClass {}
  export class Hash extends HashClass {}
}