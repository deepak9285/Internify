const fetchCommits = async ({owner,repoName}) => {
    const response = await fetch(`/api/github-commits?repoOwner=${owner}&repoName=${repoName}`);
    const data = await response.json();
    return data;
};
