function Features() {
  const features = [
    {
      title: "Smart Learning",
      description: "Interactive learning platform with modern technology.",
      icon: "🎓",
    },
    {
      title: "Digital Library",
      description: "Access thousands of books and research papers.",
      icon: "📚",
    },
    {
      title: "Experienced Faculty",
      description: "Highly qualified teachers and mentors.",
      icon: "👨‍🏫",
    },
    {
      title: "Modern Labs",
      description: "Well-equipped computer and science laboratories.",
      icon: "🧪",
    },
    {
      title: "Online Attendance",
      description: "Real-time attendance tracking system.",
      icon: "📊",
    },
    {
      title: "Placement Support",
      description: "Career guidance and campus placement assistance.",
      icon: "💼",
    },
  ];

  return (
    <section className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-blue-700 mb-4">
          Why Choose CampusHub?
        </h2>

        <p className="text-center text-gray-600 mb-14">
          Everything you need for a smart and modern college experience.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-5">{feature.icon}</div>

              <h3 className="text-2xl font-bold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;