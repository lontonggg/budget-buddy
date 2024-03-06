
import { Header } from "@/components/Header";
import {getServerSession} from "next-auth"
import { authOptions } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { HomeApp } from "@/components/HomeApp";
import { WelcomePage } from "@/components/WelcomePage";

const Home = async () => {
    const session = await getServerSession(authOptions);
    console.log(session)
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
