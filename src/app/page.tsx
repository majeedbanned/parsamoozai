import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-muted-foreground">Total Users</div>
          <div className="text-2xl font-bold">1,234</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-muted-foreground">Total Revenue</div>
          <div className="text-2xl font-bold">$12,345</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-muted-foreground">Active Products</div>
          <div className="text-2xl font-bold">123</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-muted-foreground">Pending Orders</div>
          <div className="text-2xl font-bold">45</div>
        </div>
      </div>
    </div>
  );
}
