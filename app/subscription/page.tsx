import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar"
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
    const authResponse = await auth();

    const userID = authResponse.userId;

    if (!userID) {
        redirect("/login");
    }
    
    return <Navbar />;
}

export default SubscriptionPage;