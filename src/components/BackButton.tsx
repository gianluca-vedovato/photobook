import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

export default function BackButton({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  return (
    <div className="mb-6">
      <Button variant="ghost" size="sm" asChild>
        <Link to={to}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          {label}
        </Link>
      </Button>
    </div>
  );
}
