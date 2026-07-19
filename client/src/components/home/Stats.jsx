function Stats() {
  const stats = [
    { number: "3000+", title: "Students" },
    { number: "150+", title: "Faculty" },
    { number: "30+", title: "Departments" },
    { number: "95%", title: "Placement" },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((item, index) => (
            <div
              key={index}
              className="rounded-xl shadow-lg p-8 hover:scale-105 transition duration-300"
            >
              <h2 className="text-5xl font-bold text-blue-700">
                {item.number}
              </h2>

              <p className="mt-3 text-gray-600 text-lg">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;