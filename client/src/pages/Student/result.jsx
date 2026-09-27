import { useEffect, useState } from "react";
import axios from "axios";

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://127.0.0.1:5000/api/results",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setResults(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch results:", error);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Results
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">
          My Results
        </h2>

        {loading ? (
          <p className="text-gray-600">
            Loading results...
          </p>
        ) : results.length === 0 ? (
          <p className="text-gray-600">
            No results found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {results.map((item) => {
              const percentage =
                item.max_marks > 0
                  ? (
                      (item.marks / item.max_marks) *
                      100
                    ).toFixed(1)
                  : 0;

              return (
                <div
                  key={item.id}
                  className="border rounded-xl p-5 hover:shadow-md transition"
                >
                  <h3 className="text-xl font-bold mb-3">
                    {item.subject}
                  </h3>

                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">
                      Subject Code:
                    </span>{" "}
                    {item.subject_code || "N/A"}
                  </p>

                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">
                      Exam Type:
                    </span>{" "}
                    {item.exam_type || "N/A"}
                  </p>

                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">
                      Marks:
                    </span>{" "}
                    {item.marks} / {item.max_marks}
                  </p>

                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">
                      Percentage:
                    </span>{" "}
                    {percentage}%
                  </p>

                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">
                      Exam Date:
                    </span>{" "}
                    {item.exam_date
  ? String(item.exam_date).slice(0, 10).split("-").reverse().join("/")
  : "N/A"}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      Grade
                    </span>

                    <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-bold">
                      {item.grade || "N/A"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;