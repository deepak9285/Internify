import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET method is allowed" });
  }

  const { owner, repo } = req.query;
  if (!owner || !repo) {
    return res.status(400).json({ error: "Owner and repo parameters are required" });
  }

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`,
      {
        headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
      }
    );

    const commits = response.data.map(commit => ({
      author: commit.commit.author.name,
      message: commit.commit.message,
      date: commit.commit.author.date,
      url: commit.html_url,
    }));

    res.status(200).json(commits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
