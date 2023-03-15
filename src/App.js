import './App.css';
import {useState} from 'react';


const ShowRemainingBudget = (props) => {
  
  if(props.remainingBudget>0){
    return(
      <div>
        <p>You still have {props.remainingBudget} left over after expenses.</p>
      </div>
    )
  }
  if(props.remainingBudget<0){
    return(
      <div>
        <p>You're over budget by {-props.remainingBudget}.</p>
      </div>
    )
  }
  if(props.remainingBudget===0){
    return(
      <div>
        <p>You are exactly within your budget.</p>
      </div>
    )
  }
}

const AddExpenseForm = (props) => {
  const [expenseValue, setExpenseValue] = useState("");
  const [costValue, setCostValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addExpense(expenseValue, parseInt(costValue));
    setExpenseValue("");
    setCostValue("");
  }
  return(
    <div className='extra-bottom-margin'>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          value = {expenseValue}
          placeholder="Expense"
          onChange ={(event) => setExpenseValue(event.target.value)}
        />
        <input
          type="number"
          value = {costValue}
          placeholder="Cost"
          onChange ={(event) => setCostValue(event.target.value)}
        />
        <input
          type="submit"
          value="Add Expense"
        />
      </form>
    </div>
  )
}

const ShowExpense = (props) => {
  return(

    <div className='item'>
      <p>{props.name}</p>
      <p>Cost: {props.cost}</p>
      <button className="but" onClick={() => props.remove(props.id)}>Remove Item</button>
    </div>
  )
}


const ShowBudget = (props) => {
  return(<p>Your budget is {props.amount}</p>)
}


const SetBudget = (props) => {
  const [value, setValue] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    props.budget(parseInt(value));
    setValue("");
  }

  return(
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
        
          type="number"
          value = {value}
          placeholder="Add to your budget"
          onChange ={(event) => setValue(event.target.value)}
        />
        <input
          type="submit"
          value="Add to Budget"
        />
      </form>
    </div>
  )
}

function App() {

  const [budget, setBudget] = useState(0)

  const [expenses, setExpenses] = useState([
  ])

  const handleRemoveExpense = (id) => {
    setExpenses(prevExpenses => prevExpenses.filter(p => p.id !== id));
  } 

  const [nextExpenseId, setNextExpenseId] = useState(1)


  const handleBudget = (amount) => {
    if(!isNaN(amount)){
      setBudget( prevBudget => prevBudget + amount )
    }
  }

  const handleAddExpense = (nameIn, costIn) =>{
    if(!isNaN(costIn) && nameIn!==""){
      setExpenses(prevExpenses => [
        ...prevExpenses,
          {
            name: nameIn,
            cost: costIn,
            id: nextExpenseId
          }
        ]
        
      )
      setNextExpenseId(prevId => prevId + 1)
      }
  }

  const calculateRemainingBudget = expenses.reduce((total, expense) =>{return total - expense.cost}, budget)

  
  

  return (
    <div className="App">

      <h1>Budget Calculator</h1>
      <SetBudget budget={handleBudget}/>
      <ShowBudget amount={budget}/>
      
      <AddExpenseForm
        addExpense={handleAddExpense}
      />
      <div className='container'>
      {expenses.map(expense => 
        <ShowExpense 
          className = "showExpense"
          name={expense.name}
          cost={expense.cost} 
          key = {expense.id}
          id= {expense.id}
          remove = {handleRemoveExpense}
      />
      )}
      </div>
      <ShowRemainingBudget remainingBudget={calculateRemainingBudget} />
    </div>
  );
}

export default App;
