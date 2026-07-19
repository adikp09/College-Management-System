import departments from "../../data/departments";

function Departments() {
  return (
    <section className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-blue-700">
          Our Departments
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-14">
          Explore our academic departments and professional programs.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {departments.map((dept) => {
            const Icon = dept.icon;

            return (
              <div
                key={dept.id}
                className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
              >
                <Icon className="w-14 h-14 text-blue-700 mb-5" />

                <h3 className="text-2xl font-bold">
                  {dept.name}
                </h3>

                <p className="mt-4 text-gray-600">
                  {dept.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Departments;