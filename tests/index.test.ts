import { describe, expect, it } from "bun:test";
import PineStore from "../index";

describe("PineStore", async () => {
  it("should have static properties", () => {
    expect(PineStore.ApiRoutes).toBeDefined();
    expect(PineStore.BaseUrl).toBe("https://pinestore.cc");
  });

  it("should have static methods", () => {
    expect(typeof PineStore.fetchProject).toBe("function");
    expect(typeof PineStore.fetchComments).toBe("function");
    expect(typeof PineStore.fetchChangelog).toBe("function");
    expect(typeof PineStore.fetchChangelogs).toBe("function");
    expect(typeof PineStore.fetchProjects).toBe("function");
    expect(typeof PineStore.searchProjects).toBe("function");
    expect(typeof PineStore.fetchProjectByName).toBe("function");
    expect(typeof PineStore.fetchUser).toBe("function");
    expect(typeof PineStore.fetchUserProjects).toBe("function");
  });

  const isInternetAvailable = async () => {
    try {
      const response = await fetch("https://www.google.com", { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  };
  const internetAvailable = await isInternetAvailable();

  (internetAvailable ? it : it.skip)("should fetch a project by ID", async () => {
    const projectId = 135;
    const project = await PineStore.fetchProject(projectId);
    expect(project).toBeDefined();
    expect(project.id).toBe(projectId);
  });
  (internetAvailable ? it : it.skip)("should fetch comments for a project", async () => {
    const projectId = 135;
    const comments = await PineStore.fetchComments(projectId);
    expect(Array.isArray(comments)).toBe(true);
  });
  (internetAvailable ? it : it.skip)("should fetch changelog for a project", async () => {
    const projectId = 135;
    const changelog = await PineStore.fetchChangelog(projectId);
    expect(changelog).toBeDefined();
    expect(changelog.projectId).toBe(projectId);
  });
  (internetAvailable ? it : it.skip)("should fetch all changelogs for a project", async () => {
    const projectId = 135;
    const changelogs = await PineStore.fetchChangelogs(projectId);
    expect(Array.isArray(changelogs)).toBe(true);
  });
  (internetAvailable ? it : it.skip)("should fetch all projects", async () => {
    const projects = await PineStore.fetchProjects();
    expect(Array.isArray(projects)).toBe(true);
  });
  (internetAvailable ? it : it.skip)("should search projects", async () => {
    const query = "zood";
    const projects = await PineStore.searchProjects(query);
    expect(Array.isArray(projects)).toBe(true);
  });
  (internetAvailable ? it : it.skip)("should fetch a project by name", async () => {
    const projectName = "Zood";
    const project = await PineStore.fetchProjectByName(projectName);
    expect(project).toBeDefined();
    expect(project.name).toBe(projectName);
  });
  (internetAvailable ? it : it.skip)("should fetch a user by ID", async () => {
    const userId = "258711360236421131";
    const user = await PineStore.fetchUser(userId);
    expect(user).toBeDefined();
    expect(user.discordId).toBe(userId);
  });
  (internetAvailable ? it : it.skip)("should fetch projects for a user", async () => {
    const userId = "258711360236421131";
    const projects = await PineStore.fetchUserProjects(userId);
    expect(Array.isArray(projects)).toBe(true);
  });
});