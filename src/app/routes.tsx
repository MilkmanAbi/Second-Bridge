import { createHashRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { ServiceDetail } from "./pages/ServiceDetail";
import { Tracker } from "./pages/Tracker";
import { Community } from "./pages/Community";
import { ThreadDetail } from "./pages/ThreadDetail";
import { Contribute } from "./pages/Contribute";
import { Tools } from "./pages/Tools";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "services/:id", Component: ServiceDetail },
      { path: "contribute", Component: Contribute },
      { path: "tools", Component: Tools },
      { path: "tracker", Component: Tracker },
      { path: "community", Component: Community },
      { path: "community/:id", Component: ThreadDetail },
      { path: "about", Component: About },
      { path: "*", Component: NotFound },
    ],
  },
]);
