import OrderSummary from "@/components/order-summary/OrderSummary";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import OrderSummaryDrawer from "@/components/order-summary/OrderSummaryDrawer";

export const Route = createFileRoute("/_order")({ component: OrderLayout });

function OrderLayout() {
  return (
    <div className="pb-8 pt-10 page-wrap mx-auto flex flex-row lg:flex-row items-start items-between gap-8">
      <main className="flex-1">
        <Outlet />
      </main>
      <aside className="hidden lg:block lg:sticky lg:top-20 w-sm">
        <OrderSummary />
      </aside>
      <div className="block lg:hidden fixed bottom-[env(safe-area-inset-bottom)] left-0 w-full z-20 p-4 border-t border-border bg-card">
        <OrderSummaryDrawer />
      </div>
    </div>
  );
}
