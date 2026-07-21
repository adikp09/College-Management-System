function Placement() {
  const companies = [
    {
      name: "Google",
      logo: "https://logo.clearbit.com/google.com",
    },
    {
      name: "Microsoft",
      logo: "https://logo.clearbit.com/microsoft.com",
    },
    {
      name: "Amazon",
      logo: "https://logo.clearbit.com/amazon.com",
    },
    {
      name: "TCS",
      logo: "https://logo.clearbit.com/tcs.com",
    },
    {
      name: "Infosys",
      logo: "https://logo.clearbit.com/infosys.com",
    },
    {
      name: "Wipro",
      logo: "https://logo.clearbit.com/wipro.com",
    },
    {
      name: "IBM",
      logo: "https://logo.clearbit.com/ibm.com",
    },
    {
      name: "Accenture",
      logo: "https://logo.clearbit.com/accenture.com",
    },
  ];

  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-blue-700">
            Our Top Recruiters
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Our students are placed in leading companies worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="w-20 h-20 object-contain"
              />

              <h3 className="mt-5 text-xl font-bold">
                {company.name}
              </h3>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Placement;