const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

// const values = [{number:10} , {number:20} , {number:30} ]

//   const method = values.reduce((accumulator,proprieties)=>{
//   accumulator = accumulator + proprieties.number
//   return accumulator
// },0)


// transactionUl.prepend(method)

 
// let transactions = [

//     {id:1, name:'Bolo de brigadeiro' , amount:-20} ,
//     {id:2, name:'Salário' , amount:300} ,
//     {id:3, name:'Violão' , amount:150}

// ]

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = id => {
    transactions = transactions.filter(transaction => transaction.id !== id)
    init()
    updateLocalStorage()
}

const addTransactionIntoDom = transaction =>{

    const operator = transaction.amount < 0 ? '-' : '+'
    const cssClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(cssClass)
    li.innerHTML = 
    ` ${transaction.name} 
    <span>${operator}  R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
    x
    </button> `
   
    transactionUl.prepend(li)

}

const updateBalanceValues = () => {
    const transactionsAmounts = transactions
    .map(transaction => transaction.amount)
    
    console.log(transactionsAmounts)

    const total = transactionsAmounts
    .reduce((accumulator,transaction)=> accumulator + transaction,0)
    .toFixed(2)
    
    const income = transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator,value)=> accumulator + value ,0)
    .toFixed(2)

    
    const expense = Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator,value)=> accumulator + value ,0).toFixed(2))

    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`


}

const init = () => {
    transactionUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDom)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions' , JSON.stringify(transactions))
}

    const generateId = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', stop =>{
    stop.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if(transactionName === '' || transactionAmount === ''){
        alert('Insira um nome e um valor aos campos')
        return
    }

     const transaction = {
         id:generateId(),
         name:transactionName ,
         amount:Number(transactionAmount)
        }

    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})

    