import { BalanceCard } from "../components/dashboard/BalanceCard";
import { ExpenseChart } from "../components/dashboard/ExpenseChart";
import { StatsSection } from "../components/dashboard/StatsSection";
import { TransactionsList } from "../components/dashboard/TransactionsList";
import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
const Dashboard = () => {
  const { transactions } = useContext(FinanceContext);
  return (
    <div className="w-full min-h-screen">

      <div className="w-full max-w-full overflow-hidden space-y-6">

        <BalanceCard />
        <StatsSection transactions={transactions}/>
        <TransactionsList />
        <div className="w-full overflow-hidden">
          <ExpenseChart />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;