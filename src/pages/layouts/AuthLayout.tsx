import {Link, Outlet} from "react-router-dom";
import { ChartBarBig } from "lucide-react";
import manageMoneyImg from "@/assets/manage-money.svg";

export default function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ChartBarBig className="size-4" />
            </div>
            Financial Control
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="flex relative hidden bg-muted lg:block">
        <img
          src={ manageMoneyImg }
          alt="Image"
          className="absolute h-full w-full align-center inset-0 object-cover"
        />
      </div>
    </div>
  );
}
