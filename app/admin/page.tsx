// app/admin/page.tsx
import { DashboardStats } from "@/components/Admin/DashboardStats";
import { RecentOrders } from "@/components/Admin/RecentOrders";

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-6 mt-40 p-4 px-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">Welcome to Zarwa Organics Admin Panel</p>
      </div>

      <DashboardStats />
      <RecentOrders />
    </div>
  );
}
