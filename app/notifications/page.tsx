export default function NotificationsPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded shadow">
          Salary received
        </div>

        <div className="bg-white p-4 rounded shadow">
          Netflix subscription renewal
        </div>

        <div className="bg-white p-4 rounded shadow">
          Transfer sent
        </div>
      </div>
    </main>
  );
}