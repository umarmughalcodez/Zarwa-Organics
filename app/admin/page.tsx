// app/admin/page.tsx
import { DashboardStats } from "@/components/Admin/DashboardStats";
import { RecentOrders } from "@/components/Admin/RecentOrders";

export default function AdminDashboard() {
  return (
    <div className="space-y-6 mt-32 p-4 py-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Zarwa Organics Admin Panel</p>
      </div>

      <DashboardStats />
      <RecentOrders />
    </div>
  );
}
