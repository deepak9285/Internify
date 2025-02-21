export async function createProject(projectData) {
    const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
    });

    return await res.json();
}
export async function getProjects() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/getAllProjects`);
    return res.json();
}

export async function getProjectById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`);
    return res.json();
}