import { useState, useEffect } from "react";

export default function GitHubCommits() {
  const [commits, setCommits] = useState({});
  
  useEffect(() => {
    fetch("/api/github-commits?repoOwner=crucie&repoName=Scrumlord")
      .then(response => response.json())
      .then(data => setCommits(data))
      .catch(error => console.error("Error fetching commits:", error));
  }, []);

  return (
    <section className="py-10 px-6 text-center">
      <h2 className="text-3xl font-bold mb-6">GitHub Commit Tracker</h2>

      {Object.entries(commits).map(([user, userCommits]) => (
        <div key={user} className="mb-6 p-4 border rounded-lg shadow">
          <h3 className="text-xl font-semibold">{user}</h3>
          <ul className="list-disc pl-6">
            {userCommits.map(commit => (
              <li key={commit.sha}>
                <strong>{commit.message}</strong> - <small>{commit.date}</small>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
