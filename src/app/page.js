import { HomeApp } from "@/components/HomeApp";
import { TransactionsLayout } from "@/components/TransactionsContainer";

const Home = async () => {
    const getUser = async () => {
      try{
        const res = await fetch(`http://localhost:3000/api/users/847f4959-cdab-419a-ae00-e7bcb675eee1`, {
          cache: "no-store"
        })
        return res.json();
      }catch (error){
        console.log("Failed to get user", error)
      }
    }

    const getTransactionsOfUser = async () => {
      try{
        const res = await fetch(`http://localhost:3000/api/transactions?id=847f4959-cdab-419a-ae00-e7bcb675eee1`, {
          cache: "no-store"
        })
        return res.json();
      }catch (error){
        console.log("Failed to get transactions", error)
      }
    }
    
    const userData = await getUser();
    const user = userData.data;

    const transactionData = await getTransactionsOfUser();
    const transactions = transactionData.data;
    
    
    return (
        <div>
          <HomeApp user={user} transactions={transactions}/>
        </div>
    );
}

export default Home;
