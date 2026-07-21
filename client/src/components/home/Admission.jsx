import {
  UserPlus,
  FileText,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";

function Admission() {
  const steps = [
    {
      id: 1,
      icon: <UserPlus size={45} />,
      title: "Apply Online",
      description: "Fill out the online admission application form.",
    },
    {
      id: 2,
      icon: <FileText size={45} />,
      title: "Upload Documents",
      description: "Upload your academic certificates and documents.",
    },
    {
      id: 3,
      icon: <GraduationCap size={45} />,
      title: "Entrance / Interview",
      description: "Appear for the entrance exam or interview process.",
    },
    {
      id: 4,
      icon: <BadgeCheck size={45} />,
      title: "Confirm Admission",
      description: "Pay the fees and confirm your admission.",
    },
  ];

  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-blue-700">
            Admission Process
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Complete your admission in four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="text-blue-700 flex justify-center mb-6">
                {step.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Admission;