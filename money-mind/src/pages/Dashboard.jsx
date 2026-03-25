import { BalanceCard } from "../components/dashboard/BalanceCard";
import { ExpenseChart } from "../components/dashboard/ExpenseChart";
import { StatsSection } from "../components/dashboard/StatsSection";
import { TransactionsList } from "../components/dashboard/TransactionsList";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      
      {/* Balance */}
      <BalanceCard />

      {/* Stats */}
      <StatsSection />

      {/* Transactions */}
      <TransactionsList />

      {/* Pie Chart */}
      <ExpenseChart />

    </div>
  );
};

export default Dashboard;