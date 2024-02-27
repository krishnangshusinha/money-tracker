import React, { useEffect, useState } from "react";
import './App.css';

const App = () => {

    const [name , setName] = useState("");
    const [datetime , setDatetime] = useState("");
    const [description , setDescription] = useState("");
    const [transactions , setTransactions] = useState([]);
    const REACT_APP_API_URL = "https://money-tracker-3bwy.onrender.com/api";
    
    useEffect(()=> {
        getTransactions().then(transactions=> {     // obtaining the list of transactions as a reponse
            setTransactions(transactions);
        })
    }, [transactions]);     // onchanging of this dependecy this useEffect hook executes

    const getTransactions = async () => {
        const url = REACT_APP_API_URL + '/transaction';

        const response = await fetch(url);      // fetching the response from the given url

        return response.json();     // return the response in json  format
    }

    const addNewTransaction = (event) => {

        event.preventDefault();     // preventing default refresh in page on submit of the form
        
        const url = REACT_APP_API_URL + '/transaction';     // getting the url defined by us in the ".env" file and adding this extra part to it
        const price = name.split(' ')[0];       // extracting the price value from name feild itself (seperated by space, 1st word of name feild is price and second word is the name of device)
        
        fetch(url , {           // this method fetches the url , with these properties as mention.The fetch() method returns a promise which gives us the entire response object with the JSON data, response headers, status code, etc.
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({name: name.substring(price.length+1) , price , description , datetime})     // we are price feild after the name
            }
        ).then(response => {    // recieves the response from backend as a promise
            response.json().then(json => {

                // once a data is entered and new transaction is added set all feild empty
                setName('');
                setDescription('');
                setDatetime('');

                console.log("result", json );   // printing the response
            })
        })
    }

    let balance = 0;
    for(let i=0; i<transactions.length; i++){
        balance += transactions[i].price;
    }

    return (
        <>  
            <main>
                <h1> ₹ {balance}</h1>

                <form onSubmit={addNewTransaction}>
                    <div className="basic">
                        <input type="text" value={name} onChange={event => setName(event.target.value)} placeholder="20000 mobile"/>
                        <input type="datetime-local" value={datetime} onChange={event => setDatetime(event.target.value)}/>
                    </div>

                    <div className="description">
                        <input type="text" placeholder="description" value={description} onChange={event => setDescription(event.target.value)}/>
                    </div>

                    <button>Add new Transaction</button>
                </form>

                <div className="transactions">
                    {transactions.length > 0 ? transactions.map((transaction,index)=> (
                        <div className="transaction" key={index}>
                            <div className="left">
                                <div className="name">{transaction.name}</div>
                                <div className="description">{transaction.description}</div>
                            </div>
                            <div className="right">
                                <div className={"price " + (transaction.price<0 ? "red" : "green")}>{transaction.price}</div>
                                <div className="datetime">{transaction.datetime}</div>
                            </div>
                        </div>
                    )) : null}
                    

                </div>

            </main>
        </>
    );
}
export default App;
