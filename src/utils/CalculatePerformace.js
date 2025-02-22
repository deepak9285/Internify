const calculatePerformance = (userCommits) => {
    return Object.entries(userCommits).map(([user, commits]) => ({
        user,
        totalCommits: commits.length,
        latestCommit: commits[0]?.date || "N/A",
    }));
};
