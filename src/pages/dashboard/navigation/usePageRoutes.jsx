import { useCallback, useEffect, useMemo, useState } from "react";
import DashboardIcon from "../../../assets/svgs/DashboardIcon";
import GeofenceIcon from "../../../assets/svgs/geofence/GeofenceIcon";
import HomeIcon from "../../../assets/svgs/HomeIcon";
import PlanIcon from "../../../assets/svgs/plans/PlanIcon";
import PricingIcon from "../../../assets/svgs/plans/PricingIcon";
import ReceiptIcon from "../../../assets/svgs/plans/ReceiptIcon";
import RealTimeMapIcon from "../../../assets/svgs/RealTimeMapIcon";
import ReportNestedIcon from "../../../assets/svgs/ReportNestedIcon";
import ReportsIcon from "../../../assets/svgs/ReportsIcon";
import SettingIcon from "../../../assets/svgs/SettingIcon";
import SettingNestedIcon from "../../../assets/svgs/SettingNestedIcon";

const usePageRoutes = (initialIsActive, initialUser) => {
  const [isActivePage, setIsActivePage] = useState(initialIsActive);
  const [user, setUser] = useState(initialUser);
  const [routes, setRoutes] = useState([]);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const userRoutes = useMemo(() => {
    return [
      {
        icon: <HomeIcon isActivePage={isActivePage} />,
        title: "Home",
        route: "/dashboard/home",
        page: "home",
      },
      {
        icon: <DashboardIcon isActivePage={isActivePage} />,
        title: "Dashboard",
        page: "dashboard",
        subPages: [
          {
            icon: <RealTimeMapIcon isActivePage={isActivePage} />,
            title: "Real Time Map",
            route: "/dashboard/real-time-map",
            page: "real-time-map",
          },
          {
            icon: <GeofenceIcon isActivePage={isActivePage} />,
            title: "Geofence",
            route: "/dashboard/geofence",
            page: "geofence",
          },
        ],
      },
      {
        icon: <ReportsIcon isActivePage={isActivePage} />,
        title: "Reports",
        page: "reports",
        subPages: [
          {
            icon: <ReportNestedIcon />,
            title: "Truck Report",
            route: "/dashboard/reports/truck-report",
            page: "truck-report",
          },
        ],
      },
      {
        icon: <SettingIcon isActivePage={isActivePage} />,
        title: "Settings",
        page: "settings",
        subPages: [
          {
            icon: <SettingNestedIcon />,
            title: "Alerts Type",
            route: "/dashboard/setting/alert",
            page: "alerts-type",
          },
          {
            icon: <SettingNestedIcon />,
            title: "Drivers",
            route: "/dashboard/setting/drivers",
            page: "drivers",
          },
          {
            icon: <SettingNestedIcon />,
            title: "Trucks",
            route: "/dashboard/setting/trucks",
            page: "trucks",
          },
          {
            icon: <SettingNestedIcon />,
            title: "Devices",
            route: "/dashboard/setting/devices",
            page: "devices",
          },
          {
            icon: <SettingNestedIcon />,
            title: "Employees",
            route: "/dashboard/setting/employees",
            page: "employees",
          },
          {
            icon: <SettingNestedIcon />,
            title: "Configuration",
            route: "/dashboard/settings/configuration-settings",
            page: "configuration-settings",
          },
        ],
      },
      {
        icon: <PricingIcon isActivePage={isActivePage} />,
        title: "Pricing Plan",
        page: "plans",
        subPages: [
          {
            icon: <PlanIcon />,
            title: "Plans",
            route: "/dashboard/plans/subscription-plan",
            page: "subscription-plan",
          },
          {
            icon: <ReceiptIcon />,
            title: "Receipt",
            route: "/dashboard/plans/subscription-history",
            page: "subscription-history",
          },
        ],
      },
    ];
  }, [isActivePage]);

  const siteManagerRoutes = useMemo(() => {
    return [
      {
        icon: <HomeIcon isActivePage={isActivePage} />,
        title: "Home",
        route: "/dashboard/home",
        page: "home",
      },
      {
        icon: <DashboardIcon isActivePage={isActivePage} />,
        title: "Dashboard",
        page: "dashboard",
        subPages: [
          {
            icon: <RealTimeMapIcon isActivePage={isActivePage} />,
            title: "Real Time Map",
            route: "/dashboard/real-time-map",
            page: "real-time-map",
          },
          {
            icon: <GeofenceIcon isActivePage={isActivePage} />,
            title: "Geofence",
            route: "/dashboard/geofence",
            page: "geofence",
          },
        ],
      },
      {
        icon: <SettingIcon isActivePage={isActivePage} />,
        title: "Settings",
        page: "settings",
        subPages: [
          {
            icon: <SettingNestedIcon />,
            title: "Alerts Type",
            route: "/dashboard/setting/alert",
            page: "alerts-type",
          },
          {
            icon: <SettingNestedIcon />,
            title: "Drivers",
            route: "/dashboard/setting/drivers",
            page: "drivers",
          },
          {
            icon: <SettingNestedIcon />,
            title: "Trucks",
            route: "/dashboard/setting/trucks",
            page: "trucks",
          },
          {
            icon: <SettingNestedIcon />,
            title: "Devices",
            route: "/dashboard/setting/devices",
            page: "devices",
          },
          {
            icon: <SettingNestedIcon />,
            title: "Employees",
            route: "/dashboard/setting/employees",
            page: "employees",
          },
        ],
      },
    ];
  }, [isActivePage]);

  const paymentManagerRoutes = useMemo(() => {
    return [
      {
        icon: <HomeIcon isActivePage={isActivePage} />,
        title: "Home",
        route: "/dashboard/home",
        page: "home",
      },
      {
        icon: <PricingIcon isActivePage={isActivePage} />,
        title: "Pricing Plan",
        page: "plans",
        subPages: [
          {
            icon: <PlanIcon />,
            title: "Plans",
            route: "/dashboard/plans/subscription-plan",
            page: "subscription-plan",
          },
          {
            icon: <ReceiptIcon />,
            title: "Receipt",
            route: "/dashboard/plans/subscription-history",
            page: "subscription-history",
          },
        ],
      },
    ];
  }, [isActivePage]);

  const reportsManagerRoutes = useMemo(() => {
    return [
      {
        icon: <HomeIcon isActivePage={isActivePage} />,
        title: "Home",
        route: "/dashboard/home",
        page: "home",
      },
      {
        icon: <ReportsIcon isActivePage={isActivePage} />,
        title: "Reports",
        page: "reports",
        subPages: [
          {
            icon: <ReportNestedIcon />,
            title: "Truck Report",
            route: "/dashboard/reports/truck-report",
            page: "truck-report",
          },
        ],
      },
    ];
  }, [isActivePage]);

  const refetch = useCallback(
    (newIsActive, newUser) => {
      if (user?.role) setUser(newUser);
      setIsActivePage(newIsActive);
      setRefetchTrigger((prev) => !prev);
    },
    [user.role]
  );

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "site-manager":
          setRoutes(siteManagerRoutes);
          break;
        case "report-manager":
          setRoutes(reportsManagerRoutes);
          break;
        case "payment-manager":
          setRoutes(paymentManagerRoutes);
          break;
        case "user":
          setRoutes(userRoutes);
          break;
        default:
          setRoutes([]);
      }
    }
  }, [
    user,
    isActivePage,
    refetchTrigger,
    siteManagerRoutes,
    reportsManagerRoutes,
    paymentManagerRoutes,
    userRoutes,
  ]);

  return [routes, refetch];
};

export default usePageRoutes;
