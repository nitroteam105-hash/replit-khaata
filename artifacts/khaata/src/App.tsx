import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";
import { AppProvider } from "@/context/AppContext";
import { BottomNav } from "@/components/BottomNav";

import Landing from "@/pages/Landing";
import BusinessSelect from "@/pages/BusinessSelect";
import Home from "@/pages/Home";
import People from "@/pages/People";
import Money from "@/pages/Money";
import Staff from "@/pages/Staff";
import Settings from "@/pages/Settings";
import AddTenantPG from "@/pages/AddTenantPG";
import AddMemberGym from "@/pages/AddMemberGym";
import AddSubscriberTiffin from "@/pages/AddSubscriberTiffin";
import BillGenerator from "@/pages/BillGenerator";
import Attendance from "@/pages/Attendance";
import BusinessSetup from "@/pages/BusinessSetup";

const queryClient = new QueryClient();

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/select" component={BusinessSelect} />
        <Route path="/home" component={Home} />
        <Route path="/people" component={People} />
        <Route path="/people/add/pg" component={AddTenantPG} />
        <Route path="/people/add/gym" component={AddMemberGym} />
        <Route path="/people/add/tiffin" component={AddSubscriberTiffin} />
        <Route path="/people/add/yoga" component={AddMemberGym} />
        <Route path="/business-setup" component={BusinessSetup} />
        <Route path="/money" component={Money} />
        <Route path="/money/bill" component={BillGenerator} />
        <Route path="/staff" component={Staff} />
        <Route path="/staff/attendance" component={Attendance} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <div className="font-sans text-foreground antialiased selection:bg-primary/30">
              <Router />
              <BottomNav />
            </div>
          </WouterRouter>
        </AppProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;