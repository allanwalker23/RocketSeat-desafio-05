import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title:string,
  value:number,
  type: "income" | "outcome";
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value,type}:Request): Transaction {
      const {total}= this.transactionsRepository.getBalance();

      if(type === "outcome" && total < value){
        throw new Error("You do not have enough balance.")
      }
      //INCLUDE
      /*

      if(!["income","outcome"].includes(type)){
        throw new Error('Transaction type is invalid')
      }
      */

     if(!["income","outcome"].includes(type)){
      throw new Error('Transaction type is invalid')
    }

      //Minha lógica
      /*if(type!="outcome" && type!="income"){
        throw new Error("Your type of balance is not outcome or income. Please make your requisition again...")
      }
      */
    
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })

    return transaction;
  }
}

export default CreateTransactionService;
