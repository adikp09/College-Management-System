import { Bell, Search, UserCircle } from "lucide-react";

function Topbar({ name = "Aditya Kumar", role = "Student" }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between">

      {/* Search */}
      <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 w-[350px]">
        <Search size={20} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-3 w-full"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        <Bell
          size={24}
          className="cursor-pointer hover:text-blue-700"
        />

        <div className="flex items-center gap-3">

          <UserCircle
            size={42}
            className="text-blue-700"
          />

          <div>
            <h3 className="font-bold">
  {name}
</h3>

<p className="text-sm text-gray-500">
  {role}
</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Topbar;