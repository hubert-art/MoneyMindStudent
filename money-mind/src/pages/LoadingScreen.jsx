const LoadingScreen = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-[#F9FAFB]">

      {/* Logo */}
      <div className="text-2xl font-bold">
        <img
          src="../../public/moneyMind.png"
          alt="MoneyMind Logo"
          className="h-50 object-contain"
        />
      </div>

    </div>
  );
};

export default LoadingScreen;