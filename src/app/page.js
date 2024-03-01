import { HomeApp } from "@/components/HomeApp";
import { TransactionsLayout } from "@/components/TransactionsContainer";

const Home = async () => {
    const getUser = async () => {
      try{
        const res = await fetch(`http://localhost:3000/api/users`, {
          cache: "no-store"
        })
        return res.json();
      }catch (error){
        console.log("Failed to get user", error)
      }
    }
    
    const { users } = await getUser();

    return (
        <div>
          <HomeApp user={users[0]}/>
        </div>
    );
}

export default Home;
