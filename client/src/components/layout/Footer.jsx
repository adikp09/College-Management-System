import { GraduationCap } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3">
          <GraduationCap size={40} className="text-blue-500" />

          <h2 className="text-3xl font-bold">
            CampusHub
          </h2>
        </div>

        <p className="text-gray-400 mt-5 max-w-md leading-7">
          CampusHub is a modern college management platform connecting
          students, faculty and administrators in one place.
        </p>
      </div>
    </footer>
  );
}

export default Footer;