export default function TransactionsPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>

      <div className="bg-white p-6 rounded shadow">
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span>Salary</span>
            <span className="text-green-600">+$4200</span>
          </li>

          <li className="flex justify-between">
            <span>Netflix</span>
            <span>-$15.99</span>
          </li>

          <li className="flex justify-between">
            <span>Transfer</span>
            <span>-$250</span>
          </li>
        </ul>
      </div>
    </main>
  );
}