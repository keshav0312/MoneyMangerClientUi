import { LayoutDashboard, List, Wallet, Coins, FunnelPlus } from "lucide-react";

export const SIDE_NAV_DATA = [
    {
        id: "01",
        label: "Dashboard", 
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02", 
        label: "/category",
        icon: List,
        path: "/category"
    },
    {
        id: "03",
        label: "Income",
        icon: Wallet,
        path: "/income",
    },
    {
        id: "04",
        label: "Expense", 
        icon: Coins,
        path: "/expense",
    },
    {
        id: "05",
        label: "filtered",
        icon: FunnelPlus,
        path: "/filter",
    }
]