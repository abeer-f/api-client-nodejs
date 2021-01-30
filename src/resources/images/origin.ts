export type Origin =
  | OriginBase<"docker-file">
  | OriginBase<"docker-hub">
  | OriginBase<"docker-registry">;
// | OriginBase<"git-repo">;

/** ### `interface ImageOriginBase`
 * This interface is only for non-stack related image origins. Stacks will
 * eventually move to this style of `type` and `details` to describe the
 * origin.
 *
 * ---
 *
 * ### Cycle Info
 * __Something doesn't look right or work as intended?__ \
 * Help us make a better TypeScript Platform Interface by submitting an issue on
 * [Cycles Github](https://github.com/cycleplatform/api-client-nodejs) or
 * forking our repo and submitting a
 * [Pull Request](https://github.com/cycleplatform/api-client-nodejs/pulls).
 *
 * [General Docs](https://docs.cycle.io) /
 * [Public API Docs](https://docs.cycle.io/api/introduction) /
 * [Internal API Docs](https://docs.cycle.io/internal-api/introduction) /
 * [Cycle's Website](https://cycle.io)
 *
 * ---
 *
 * Last Updated: 2021.01.28 — Grady S
 */
export interface OriginBase<T extends AllOriginsKeys> {
  /**
   * Key of the origin. Can be any of the following:
   * - `docker-hub`
   * - `docker-registry`
   * - `git-repo`
   * - `docker-file`
   */
  type: T;
  details: AllOrigins[T];
}

export interface AllOrigins {
  "docker-hub": DockerHub;
  "docker-registry": DockerRegistry;
  // "git-repo": Repo;
  "docker-file": DockerFile;
}

export type AllOriginsKeys = keyof AllOrigins;

/****************************** Sources ******************************/

/** Describes an image imported from the official Docker Hub registry */
export interface DockerHub {
  /** The image and tag, formatted like `image:tag` */
  target: string;
  /** Username for Docker Hub */
  username?: string;
  /** Auth token for Docker Hub. Cycle will remember this for the target specified */
  token?: string;
}

/** Describes an image imported from a private registry */
export interface DockerRegistry extends DockerHub {
  /** URL to the private registry */
  url: string;
  /** Password to the private registry */
  password?: string;
}

// NOTE: UNSURE ABOUT THIS
export interface Repo {
  url: string;
  protocol: RepoProtocol;
  private_key?: string;
  private_key_url?: string;
  // NOTE: UNSURE ABOUT THIS
  // tag?: string;
}
export type RepoProtocol = "http" | "https" | "ssh";

// NOTE: UNSURE ABOUT THIS

// export interface Repo {
//   url: string;
//   protocol: RepoProtocol;
//   private_key?: string;
//   private_key_url?: string;
// }

/** Describes an image to be built off local code (inside a repo) */
export interface DockerFile extends Repo {
  /** Path the Dockerfile is located in */
  dir?: string;
  /** Equivalent of docker-compose context. Use this Dockerfile to build the path. */
  build_file: string;
}
