import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  CalendarDays,
  BookOpen,
  BarChart3,
  CreditCard,
  Bell,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const menus = [
  { icon: LayoutDashboard, title: "Dashboard", path: "/student-dashboard" },
  { icon: User, title: "Profile", path: "/profile" },
  { icon: CalendarDays, title: "Attendance", path: "/attendance" },
  { icon: BookOpen, title: "Subjects", path: "/subjects" },
  { icon: BarChart3, title: "Results", path: "/results" },
  { icon: CreditCard, title: "Fees", path: "/fees" },
  { icon: Bell, title: "Notices", path: "/notices" },
  { icon: LogOut, title: "Logout", path: "/logout" },
];

  return (
    <div className="w-64 min-h-screen bg-blue-700 text-white">

      <div className="p-6 text-3xl font-bold border-b border-blue-500">
        CampusHub
      </div>

      <div className="mt-6">

        {menus.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
  key={index}
  onClick={() => {
    if (item.title === "Logout") {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      navigate(item.path);
    }
  }}
  className="flex items-center gap-4 px-6 py-4 hover:bg-blue-800 cursor-pointer transition"
>
              <Icon size={22} />

              <span>{item.title}</span>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default Sidebar;