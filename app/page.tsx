import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import MessageList from "@/components/MessageList";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />
      <Form />
      <MessageList />
      <Footer />
    </div>
  );
}
