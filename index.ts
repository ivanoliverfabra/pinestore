export interface ProjectDTO {
  id: number;
  date_added: number;
  date_updated: number;
  date_release: number;
  date_publish: number;
  owner_discord: string;
  owner_name: string;
  name: string;
  install_command: string;
  download_url: string | null;
  target_file: string;
  tags: string[];
  repository: string;
  description_short: string;
  description: string;
  description_markdown: string;
  has_thumbnail: boolean;
  hide_thumbnail: boolean;
  media_count: number;
  keywords: string[];
  downloads: number;
  downloads_recent: number;
  views: number;
  views_recent: number;
  likes: number;
  visible: boolean;
}

export interface CommentDTO {
  id: number;
  project_id: number;
  reply_id: number | null;
  user_discord: string;
  user_name: string;
  number: number;
  body: string;
}

export interface ChangelogDTO {
  project_id: number;
  number: number;
  body: string;
}

export interface UserConnectionDTO {
  id: string;
  display: string;
  link: string;
}

export interface UserDTO {
  discord_id: string;
  joined_on: number;
  name: string;
  about: string;
  about_markdown: string | null;
  connections: UserConnectionDTO[];
}

export class Project {
  public id: number;
  public dateAdded: number;
  public dateUpdated: number;
  public dateRelease: number;
  public datePublish: number;
  public ownerDiscord: string;
  public ownerName: string;
  public name: string;
  public installCommand: string;
  public downloadUrl: string | null;
  public targetFile: string;
  public tags: string[];
  public repository: string;
  public descriptionShort: string;
  public description: string;
  public descriptionMarkdown: string;
  public hasThumbnail: boolean;
  public hideThumbnail: boolean;
  public mediaCount: number;
  public keywords: string[];
  public downloads: number;
  public downloadsRecent: number;
  public views: number;
  public viewsRecent: number;
  public likes: number;
  public visible: boolean;

  constructor(dto: ProjectDTO) {
    this.id = dto.id;
    this.dateAdded = dto.date_added;
    this.dateUpdated = dto.date_updated;
    this.dateRelease = dto.date_release;
    this.datePublish = dto.date_publish;
    this.ownerDiscord = dto.owner_discord;
    this.ownerName = dto.owner_name;
    this.name = dto.name;
    this.installCommand = dto.install_command;
    this.downloadUrl = dto.download_url;
    this.targetFile = dto.target_file;
    this.tags = dto.tags;
    this.repository = dto.repository;
    this.descriptionShort = dto.description_short;
    this.description = dto.description;
    this.descriptionMarkdown = dto.description_markdown;
    this.hasThumbnail = dto.has_thumbnail;
    this.hideThumbnail = dto.hide_thumbnail;
    this.mediaCount = dto.media_count;
    this.keywords = dto.keywords;
    this.downloads = dto.downloads;
    this.downloadsRecent = dto.downloads_recent;
    this.views = dto.views;
    this.viewsRecent = dto.views_recent;
    this.likes = dto.likes;
    this.visible = dto.visible;
  }
}

export class Comment {
  public id: number;
  public projectId: number;
  public replyId: number | null;
  public userDiscord: string;
  public userName: string;
  public number: number;
  public body: string;

  constructor(dto: CommentDTO) {
    this.id = dto.id;
    this.projectId = dto.project_id;
    this.replyId = dto.reply_id;
    this.userDiscord = dto.user_discord;
    this.userName = dto.user_name;
    this.number = dto.number;
    this.body = dto.body;
  }
}

export class Changelog {
  public projectId: number;
  public number: number;
  public body: string;

  constructor(dto: ChangelogDTO) {
    this.projectId = dto.project_id;
    this.number = dto.number;
    this.body = dto.body;
  }
}

export class UserConnection {
  public id: string;
  public display: string;
  public link: string;

  constructor(dto: UserConnectionDTO) {
    this.id = dto.id;
    this.display = dto.display;
    this.link = dto.link;
  }
}

export class User {
  public discordId: string;
  public joinedOn: number;
  public name: string;
  public about: string;
  public aboutMarkdown: string | null;
  public connections: UserConnection[];

  constructor(dto: UserDTO) {
    this.discordId = dto.discord_id;
    this.joinedOn = dto.joined_on;
    this.name = dto.name;
    this.about = dto.about;
    this.aboutMarkdown = dto.about_markdown;
    this.connections = dto.connections.map((c) => new UserConnection(c));
  }
}

/**
 * Defines the structure for an API route configuration.
 * @template TResponseDTO The expected raw DTO response type from the API.
 * @template TArgs The types of arguments required by the URL function.
 */
interface ApiRouteConfig<TResponseDTO, TArgs extends any[] = []> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: (...args: TArgs) => string;
  _schema?: TResponseDTO;
  transform?: (dto: TResponseDTO) => any;
}

const defineApiRoute = <TResponseDTO, TArgs extends any[] = []>(
  config: ApiRouteConfig<TResponseDTO, TArgs>,
) => config;

export const ApiRoutes = {
  FetchProject: defineApiRoute<ProjectDTO, [number]>({
    method: 'GET',
    url: (projectId) => `/api/projects/${projectId}`,
    transform: (dto) => new Project(dto),
  }),
  FetchComments: defineApiRoute<CommentDTO[], [number]>({
    method: 'GET',
    url: (projectId) => `/api/projects/${projectId}/comments`,
    transform: (dtos) => dtos.map((dto) => new Comment(dto)),
  }),
  FetchChangelog: defineApiRoute<ChangelogDTO, [number]>({
    method: 'GET',
    url: (projectId) => `/api/projects/${projectId}/changelog`,
    transform: (dto) => new Changelog(dto),
  }),
  FetchChangelogs: defineApiRoute<ChangelogDTO[], [number]>({
    method: 'GET',
    url: (projectId) => `/api/projects/${projectId}/changelogs`,
    transform: (dtos) => dtos.map((dto) => new Changelog(dto)),
  }),
  FetchProjects: defineApiRoute<ProjectDTO[]>({
    method: 'GET',
    url: () => `/api/projects`,
    transform: (dtos) => dtos.map((dto) => new Project(dto)),
  }),
  SearchProjects: defineApiRoute<ProjectDTO[], [string]>({
    method: 'GET',
    url: (query) => `/api/projects/search?q=${encodeURIComponent(query)}`,
    transform: (dtos) => dtos.map((dto) => new Project(dto)),
  }),
  FetchProjectByName: defineApiRoute<ProjectDTO, [string]>({
    method: 'GET',
    url: (name) => `/api/projects/named/?name=${encodeURIComponent(name)}`,
    transform: (dto) => new Project(dto),
  }),
  FetchUser: defineApiRoute<UserDTO, [string]>({
    method: 'GET',
    url: (id) => `/api/users/${id}`,
    transform: (dto) => new User(dto),
  }),
  FetchUserProjects: defineApiRoute<ProjectDTO[], [string]>({
    method: 'GET',
    url: (userId) => `/api/users/${userId}/projects`,
    transform: (dtos) => dtos.map((dto) => new Project(dto)),
  }),
} as const;

/**
 * A static client class for interacting with the Pinestore API.
 * Provides type-safe methods for fetching and transforming API resources.
 */
export class Pinestore {
  static ApiRoutes = ApiRoutes;
  static BaseUrl = 'https://pinestore.cc';

  /**
   * Internal helper for making API requests, including DTO transformation.
   * @template TResponseDTO The expected raw DTO response type from the API.
   * @template TArgs The types of arguments for the route's URL function.
   * @template TResult The final desired class instance type after transformation.
   * @param route The API route configuration, optionally including a 'transform' function.
   * @param args Arguments to be passed to the route's URL function.
   * @returns A promise that resolves to the transformed class instance(s).
   * @throws An Error if the API request fails.
   */
  private static async request<
    TResponseDTO,
    TArgs extends any[],
    TResult = TResponseDTO,
  >(
    route: ApiRouteConfig<TResponseDTO, TArgs>,
    ...args: TArgs
  ): Promise<TResult> {
    const url = this.BaseUrl + route.url(...args);
    const response = await fetch(url, {
      method: route.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Pinestore API request to ${url} failed with status ${response.status}: ${errorBody}`,
      );
    }
    const data: TResponseDTO = (await response.json()) as TResponseDTO;

    if (route.transform) {
      return route.transform(data) as TResult;
    }
    return data as unknown as TResult;
  }

  static fetchProject(projectId: number): Promise<Project> {
    return this.request(this.ApiRoutes.FetchProject, projectId);
  }

  static fetchComments(projectId: number): Promise<Comment[]> {
    return this.request(this.ApiRoutes.FetchComments, projectId);
  }

  static fetchChangelog(projectId: number): Promise<Changelog> {
    return this.request(this.ApiRoutes.FetchChangelog, projectId);
  }

  static fetchChangelogs(projectId: number): Promise<Changelog[]> {
    return this.request(this.ApiRoutes.FetchChangelogs, projectId);
  }

  static fetchProjects(): Promise<Project[]> {
    return this.request(this.ApiRoutes.FetchProjects);
  }

  static searchProjects(query: string): Promise<Project[]> {
    return this.request(this.ApiRoutes.SearchProjects, query);
  }

  static fetchProjectByName(name: string): Promise<Project> {
    return this.request(this.ApiRoutes.FetchProjectByName, name);
  }

  static fetchUser(id: string): Promise<User> {
    return this.request(this.ApiRoutes.FetchUser, id);
  }

  static fetchUserProjects(userId: string): Promise<Project[]> {
    return this.request(this.ApiRoutes.FetchUserProjects, userId);
  }
}