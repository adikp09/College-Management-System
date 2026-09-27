import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Users,
  UserRoundCog,
  GraduationCap,
  Bell,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    pendingPayments: 0,
    totalNotices: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await axios.get(
          "http://127.0.0.1:5000/api/admin/dashboard-stats",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setStats(response.data);
      } catch (error) {
        console.log("Dashboard Stats Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  // ================= SIDEBAR =================

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      name: "Payment Requests",
      icon: CreditCard,
      path: "/admin/payment-requests",
    },
    {
      name: "Students",
      icon: Users,
      path: "/admin/students",
    },
    {
      name: "Faculty",
      icon: UserRoundCog,
      path: "/admin/faculty",
    },
    {
      name: "Courses",
      icon: GraduationCap,
      path: "/admin/courses",
    },
    {
      name: "Notices",
      icon: Bell,
      path: "/admin/notices",
    },
    {
      name: "Reports",
      icon: BarChart3,
      path: "/admin/reports",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= MOBILE HEADER ================= */}

      <div className="lg:hidden bg-gray-900 text-white p-4 flex items-center justify-between">

        <h1 className="text-xl font-bold">
          CampusHub Admin
        </h1>

        <button
          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
          className="p-2"
        >
          {sidebarOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>

      </div>

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-gray-900 text-white
          transform transition-transform duration-300
          lg:translate-x-0
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Logo */}

        <div className="h-20 flex items-center px-6 border-b border-gray-700">

          <div>
            <h1 className="text-2xl font-bold">
              CampusHub
            </h1>

            <p className="text-sm text-gray-400">
              Admin Panel
            </p>
          </div>

        </div>

        {/* Menu */}

        <nav className="p-4 space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
              >

                <Icon size={20} />

                <span className="font-medium">
                  {item.name}
                </span>

              </button>
            );
          })}

        </nav>

        {/* Logout */}

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
          >

            <LogOut size={20} />

            <span className="font-semibold">
              Logout
            </span>

          </button>

        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <main className="lg:ml-64 min-h-screen">

        {/* Topbar */}

        <header className="hidden lg:flex h-20 bg-white border-b items-center justify-between px-8">

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Admin Dashboard
            </h2>

            <p className="text-sm text-gray-500">
              Manage CampusHub
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="font-bold text-purple-700">
                A
              </span>
            </div>

            <div>
              <p className="font-semibold text-gray-800">
                CampusHub Admin
              </p>

              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>

          </div>

        </header>

        {/* Dashboard Content */}

        <div className="p-6 lg:p-8">

          {/* Welcome */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, Admin 👋
            </h1>

            <p className="text-gray-500 mt-1">
              Here's what's happening in CampusHub today.
            </p>

          </div>

          {/* ================= STAT CARDS ================= */}

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">

            {/* Students */}

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-500 text-sm">
                    Total Students
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {loading ? "..." : stats.totalStudents}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users
                    size={24}
                    className="text-blue-600"
                  />
                </div>

              </div>

            </div>
            

            {/* Faculty */}

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-500 text-sm">
                    Total Faculty
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {loading ? "..." : stats.totalFaculty}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <UserRoundCog
                    size={24}
                    className="text-green-600"
                  />
                </div>

              </div>

            </div>

            {/* Payment Requests */}

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-500 text-sm">
                    Payment Requests
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {loading ? "..." : stats.pendingPayments}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <CreditCard
                    size={24}
                    className="text-purple-600"
                  />
                </div>

              </div>

            </div>

            {/* Notices */}

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-500 text-sm">
                    Notices
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {loading ? "..." : stats.totalNotices}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Bell
                    size={24}
                    className="text-orange-600"
                  />
                </div>

              </div>

            </div>

          </div>

          {/* ================= QUICK ACTIONS ================= */}

          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

            <h2 className="text-xl font-bold text-gray-800">
              Quick Actions
            </h2>

            <p className="text-gray-500 mt-1">
              Quickly access important admin sections.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

              <button
                onClick={() =>
                  navigate("/admin/payment-requests")
                }
                className="border rounded-xl p-5 text-left hover:shadow-md hover:border-purple-300 transition"
              >
                <CreditCard
                  size={25}
                  className="text-purple-600"
                />

                <h3 className="font-bold mt-3">
                  Payment Requests
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Review student payments
                </p>
              </button>

              <button
                onClick={() =>
                  navigate("/admin/students")
                }
                className="border rounded-xl p-5 text-left hover:shadow-md hover:border-blue-300 transition"
              >
                <Users
                  size={25}
                  className="text-blue-600"
                />

                <h3 className="font-bold mt-3">
                  Students
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Manage students
                </p>
              </button>

              <button
                onClick={() =>
                  navigate("/admin/faculty")
                }
                className="border rounded-xl p-5 text-left hover:shadow-md hover:border-green-300 transition"
              >
                <UserRoundCog
                  size={25}
                  className="text-green-600"
                />

                <h3 className="font-bold mt-3">
                  Faculty
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Manage faculty
                </p>
              </button>

              <button
                onClick={() =>
                  navigate("/admin/reports")
                }
                className="border rounded-xl p-5 text-left hover:shadow-md hover:border-orange-300 transition"
              >
                <BarChart3
                  size={25}
                  className="text-orange-600"
                />

                <h3 className="font-bold mt-3">
                  Reports
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  View system reports
                </p>
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;