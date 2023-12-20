import { CopyPlus, CreditCard, Settings, Truck } from "lucide-react";
import { SideBarItem } from ".";

const routes = [
  {
    icon: CopyPlus,
    label: "Add Shipment",
    to: "/dashboard/shipment/new",
  },
  {
    icon: Truck,
    label: "All Shipments",
    to: "/dashboard/shipment",
  },
  {
    icon: CreditCard,
    label: "Cards",
    to: "/dashboard/checkout-details",
  },
  {
    icon: Settings,
    label: "Settings",
    to: "/dashboard/profile",
  },
];

export const SideBarRoutes = () => {
  return (
    <div className="flex flex-col w-full border-t">
      {routes.map((route) => (
        <SideBarItem
          key={route.to}
          icon={route.icon}
          label={route.label}
          to={route.to}
        />
      ))}
    </div>
  );
};
