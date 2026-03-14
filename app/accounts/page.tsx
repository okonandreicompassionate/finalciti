export default function AccountsPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Accounts</h1>

      <div className="grid gap-6 grid-cols-3">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-bold">Checking</h2>
          <p>$24,850</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-bold">Savings</h2>
          <p>$12,300</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-bold">Business</h2>
          <p>$8,420</p>
        </div>
      </div>
    </main>
  );
}