export default function IssueList({ issues }) {
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Existing Issues</h3>
  
        {issues.length === 0 ? (
          <p className="text-gray-500">No issues reported.</p>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div key={issue._id} className="p-4 border rounded-lg shadow">
                <h4 className="text-lg font-bold">{issue.title}</h4>
                <p className="text-gray-700">{issue.description}</p>
                <p className="text-sm text-gray-500">Assigned to: {issue.assignedRole}</p>
                <span className={`px-2 py-1 text-xs rounded ${issue.priority === "High" ? "bg-red-600 text-white" : issue.priority === "Medium" ? "bg-yellow-500 text-white" : "bg-green-500 text-white"}`}>
                  {issue.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  