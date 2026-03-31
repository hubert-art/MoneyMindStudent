import { BalanceCard } from "../components/dashboard/BalanceCard";
import { ExpenseChart } from "../components/dashboard/ExpenseChart";
import { StatsSection } from "../components/dashboard/StatsSection";
import { TransactionsList } from "../components/dashboard/TransactionsList";

// const Dashboard = () => {
//   return (
//     <div className="w-screen max-w-full px-4 sm:px-4 md:px-8 space-y-6">

    //   {/* Balance */}
    //   <BalanceCard />

    //   {/* Stats */}
    //   <StatsSection />

    //   {/* Transactions */}
    //   <TransactionsList />

    //   {/* Pie Chart */}
    //   <ExpenseChart />

//     </div>
//   );
// };

// export default Dashboard;
const Dashboard = () => {
  return (
    <div className="w-full min-h-screen">

      <div className="w-full max-w-full overflow-hidden space-y-6">

        <BalanceCard />
        <StatsSection />
        <TransactionsList />

        {/* IMPORTANT: charts often overflow */}
        <div className="w-full overflow-hidden">
          <ExpenseChart />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;