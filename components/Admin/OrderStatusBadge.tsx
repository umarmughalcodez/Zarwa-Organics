// components/admin/OrderStatusBadge.tsx
interface OrderStatusBadgeProps {
  status: string;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    const configs = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Pending",
      },
      verified: {
        color: "bg-blue-100 text-blue-800",
        label: "Verified",
      },
      shipped: {
        color: "bg-purple-100 text-purple-800",
        label: "Shipped",
      },
      delivered: {
        color: "bg-green-100 text-green-800",
        label: "Delivered",
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        label: "Cancelled",
      },
    };

    return (
      configs[status as keyof typeof configs] || {
        color: "bg-gray-100 text-gray-800",
        label: status,
      }
    );
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}
