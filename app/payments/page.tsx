export default function PaymentsPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Payments</h1>

      <input
        placeholder="Recipient"
        className="border p-3 rounded w-[300px] mb-4"
      />

      <input
        placeholder="Amount"
        className="border p-3 rounded w-[300px] mb-4"
      />

      <button className="bg-blue-700 text-white px-6 py-3 rounded">
        Send Payment
      </button>
    </main>
  );
}