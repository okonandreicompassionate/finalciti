export default function SavingsPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Savings</h1>

      <div className="bg-white p-6 rounded shadow w-[350px]">
        <p>Vacation Fund</p>
        <p className="text-xl font-bold">$8400 / $12000</p>

        <div className="bg-gray-200 h-3 rounded mt-4">
          <div className="bg-blue-700 h-3 w-[70%] rounded"></div>
        </div>
      </div>
    </main>
  );
}