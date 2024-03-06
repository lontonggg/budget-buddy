
import { Header } from "@/components/Home/Header";
import {getServerSession} from "next-auth"
import { authOptions } from "@/utils/auth";
import { HomeApp } from "@/components/Home/HomeApp";
import { WelcomePage } from "@/components/Home/WelcomePage";

const Home = async () => {
    const session = await getServerSession(authOptions);
    if(session?.user){
      return (
        <div>
          <Header />
          <HomeApp userId={session.user.id}/>
        </div>
      );
    } else{
      return (
        <WelcomePage/>
      )
    }
}

export default Home;
