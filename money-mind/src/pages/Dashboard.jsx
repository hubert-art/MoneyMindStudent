import { BalanceCard } from "../components/dashboard/BalanceCard";
import { ExpenseChart } from "../components/dashboard/ExpenseChart";
import { StatsSection } from "../components/dashboard/StatsSection";
import { TransactionsList } from "../components/dashboard/TransactionsList";

const Dashboard = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8">

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Balance */}
        <BalanceCard />

        {/* Stats */}
        <StatsSection />

        {/* Transactions */}
        <TransactionsList />

        {/* Pie Chart */}
        <ExpenseChart />

      </div>

    </div>
  );
};

export default Dashboard;