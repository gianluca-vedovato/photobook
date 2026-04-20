import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import OrderSummary from "./OrderSummary";

export default function OrderSummaryDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-full">Apri riepilogo ordine</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Riepilogo ordine</DrawerTitle>
          </DrawerHeader>
          <OrderSummary />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
