
import React, { useState } from "react";
import { useAddTransactions } from "../components/hooks/useAddTransactions"
/*
import { useDeleteTransaction } from "../components/hooks/useDeleteTransactions";
import { useUpdateTransaction } from "../components/hooks/useUpdateTransactions";
import { useGetTransactions } from "../components/hooks/useGetTransactions";
*/
import { useGetUserInfo } from "../components/hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from  "../config/Firebase"
import { useNavigate } from 'react-router-dom';
import './styles/newproject.css'

const NewProject = () => {
    const [pname, setPName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState("notCompleted");
    const[techused,setTechUsed]=useState('')
    const navigate = useNavigate();
    const { name, profilePhoto } = useGetUserInfo();
    // Hooks for adding, deleting, and retrieving transactions
    const { addTransactions } = useAddTransactions();
   /* const { deleteTransaction } = useDeleteTransaction();
    const {updateTransaction} = useUpdateTransaction();
    const { transactions, transactionTotal } = useGetTransactions();
    
    const { balance, income, expense } = transactionTotal;

    //For updation of Transactions

const [updatedDescription, setUpdatedDescription] = useState('');
const [updatedTransactionAmount, setUpdatedTransactionAmount] = useState(0);
const [updatedTransactionType, setUpdatedTransactionType] = useState('');
const [isUpdating, setIsUpdating] = useState(false);
*/
    // Function to add a transaction
    const onSubmit = (e) => {
        e.preventDefault();
        addTransactions({
           pname,
           startDate,
           endDate,
           status,
           techused
        });
        setPName("");
        setStartDate("");
        setEndDate("");
        setStatus(null);
        setTechUsed("")
        
        alert(`New project added!`);
        navigate('/orders')
    
    }

    // Function to sign out user
    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    // Function to delete a transaction
  /*  const onDelete = (transactionId) => {
        deleteTransaction(transactionId);
    }
//Function to Update a transaction
const onUpdate = (e, transactionId) => {
    e.preventDefault();
    updateTransaction(transactionId, {
        description: updatedDescription,
        transactionAmount: updatedTransactionAmount,
        transactionType: updatedTransactionType
    });
    // Reset the form after submission
    setUpdatedDescription('');
    setUpdatedTransactionAmount(0);
    setUpdatedTransactionType('');
}
*/
    return (
        <>
              <div className="Project Manager">
        <div className="container">
            <h1>{name}'s Project Manager</h1>
            <div className="balance">
<h3>Create your projects</h3>

            </div>
           
            <form className="add-projects"onSubmit={onSubmit}>
                <input type="text" placeholder="Project Name" value={pname} required onChange={(e)=>setPName(e.target.value)}/>
                <input type="date" placeholder="starting date"value={startDate} required onChange={(e)=>setStartDate(e.target.value)}/>
                <input type="date" placeholder="Ending-date"value={endDate} required onChange={(e)=>setEndDate(e.target.value)}/>
                <input type="radio" id="notCompleted" checked={status==="notCompleted"} value="notCompleted"onChange={(e)=>setStatus(e.target.value)}/>
                <label htmlFor="expense">Not completed</label>
                <input type="radio" id="income" checked={status==="completed"}  value="completed"onChange={(e)=>setStatus(e.target.value)}/>
                <label htmlFor="income">Completed</label><br />
                <input type="text" placeholder="Technologies Used" value={techused} required onChange={(e)=>setTechUsed(e.target.value)}/>
                <button type="submit">Add Project</button>
            </form>
        </div>
     </div>
     

          {/*  <div className="transactions">
                <h3>Transactions</h3>
                <ul>
                    {transactions.map((transaction, index) => {
                        const { id, description, transactionAmount, transactionType } = transaction;
                        return (
                            <li key={index}>
                                <h4>{description}</h4>
                                <p>
                                    Rupees {transactionAmount} /- <label>{transactionType}</label>
                                    <span>
                                        <button onClick={() => onDelete(id)}>Delete Transaction</button>
                                        <button onClick={() => setIsUpdating(true)}>Update or Edit</button>
                                    </span>
                                </p>
                                {isUpdating && (
                                    <form onSubmit={(e) => onUpdate(e, id)}>
                                        <input type="text" placeholder="Description" value={updatedDescription} required onChange={(e) => setUpdatedDescription(e.target.value)} />
                                        <input type="number" placeholder="Amount" value={updatedTransactionAmount} required onChange={(e) => setUpdatedTransactionAmount(e.target.value)} />
                                        <input type="radio" id="updatedExpense" checked={updatedTransactionType === "expense"} value="expense" onChange={(e) => setUpdatedTransactionType(e.target.value)} />
                                        <label htmlFor="updatedExpense">Expense</label>
                                        <input type="radio" id="updatedIncome" checked={updatedTransactionType === "income"} value="income" onChange={(e) => setUpdatedTransactionType(e.target.value)} />
                                        <label htmlFor="updatedIncome">Income</label>
                                        <button type="submit">Update</button>
                                    </form>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
                  */}
        </>
    );
}
export default NewProject;