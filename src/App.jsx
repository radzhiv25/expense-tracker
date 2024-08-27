import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TransactionForm from "./components/TransactionForm";

function App({amount}) {

    return (
        <div className="h-screen flex flex-col md:w-3/4 w-5/6 mx-auto">
            <Navbar />
            <TransactionForm />
            <Footer />
        </div>
    );
}

export default App;