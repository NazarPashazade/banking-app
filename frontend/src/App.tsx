import { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import Purchase from "./components/purchase/Purchase";
import Refund from "./components/refund/Refund";
import Register from "./components/register/Register";
import TopUp from "./components/top-up/TopUp";
import Transfer from "./components/transfer/Transfer";
import { getCustomerData, getCustomerId } from "./api/register-customer";

function App() {
  const customerId = getCustomerId();
  let customer: any = getCustomerData();

  useEffect(() => {
    console.log({ customerId, customer });

    if (customerId) {
      customer = getCustomerData();
    }
  }, [customerId]);

  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  const handleMenuItemClick = (itemName: string) => {
    setSelectedMenuItem(itemName);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "Register":
        return <Register />;
      case "Top up Balance":
        return <TopUp />;
      case "Purchase":
        return <Purchase />;
      case "Refund":
        return <Refund />;
      case "Transfer":
        return <Transfer />;
      default:
        return <Register />;
    }
  };

  return (
    <div className="flex items-center justify-center bg-slate-400 pt-6 h-screen">
      <div className="flex h-4/5 w-9/12 bg-slate-800">
        <div className="bg-blue-200"style={{ width: "25%" }}>
          <Sidebar className="h-full" style={{ width: "100%" }}>
            {customer && (
              <b>
                <div className="flex-row flex p-2 m-4">
                  <span>
                    Hey, {`${customer?.firstName} ${customer?.lastName}`}
                  </span>
                </div>

                <div className="flex-row flex p-2 m-4">
                  <span>{`Balance: ${customer?.balance} AZN`}</span>
                </div>

                <div className="flex-row flex p-2 m-4">
                  <span>{`GSM Number: ${customer?.gsmNumber}`}</span>
                </div>
              </b>
            )}
            <Menu className="m-4">
              <MenuItem
                className="mb-4 py-2 text-xl font-bold border-2 border-gray-300"
                onClick={() => handleMenuItemClick("Register")}
              >
                Register
              </MenuItem>
              <MenuItem
                className="mb-4 py-2 text-xl font-bold border-2 border-gray-300"
                onClick={() => handleMenuItemClick("Top up Balance")}
              >
                Top up Balance
              </MenuItem>
              <MenuItem
                className="mb-4 py-2 text-xl font-bold border-2 border-gray-300"
                onClick={() => handleMenuItemClick("Purchase")}
              >
                Purchase
              </MenuItem>
              <MenuItem
                className="mb-4 py-2 text-xl font-bold border-2 border-gray-300"
                onClick={() => handleMenuItemClick("Refund")}
              >
                Refund
              </MenuItem>
              <MenuItem
                className="mb-4 py-2 text-xl font-bold border-2 border-gray-300"
                onClick={() => handleMenuItemClick("Transfer")}
              >
                Transfer
              </MenuItem>
            </Menu>
          </Sidebar>
        </div>
        <div className="flex-1 h-full items-center justify-center flex">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
