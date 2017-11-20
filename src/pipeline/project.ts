import { Token } from "../auth";
import * as Request from "../common/api/request";
import { links, ProjectRequiredSettings } from "../common/api";
import { connectToSocket } from "../common/api/websocket";
import { PipelineEvent } from "./event";

export type ProjectPipelineEventHeader =
    | BillingHeader
    | OrderHeader
    | ProjectHeader
    | ImageHeader
    | ApiKeyHeader
    | JobHeader
    | EnvironmentHeader
    | ServerHeader
    | StackHeader;

export type BillingHeader =
    | "billing.service.activate"
    | "billing.service.deactivate"
    | "billing.method.create";
export type OrderHeader = "order.confirm";
export type ProjectHeader = "project.update";
export type ImageHeader = "image.import";
export type ApiKeyHeader = "api_key.create" | "api_key.update";
export type JobHeader =
    | "job.new"
    | "job.scheduled"
    | "job.queued"
    | "job.scheduled"
    | "job.running"
    | "job.error"
    | "job.completed"
    | "job.expired";
export type EnvironmentHeader =
    | "environment.create"
    | "environment.start"
    | "environment.stop"
    | "environment.delete"
    | "environment.update";
export type ServerHeader = "server.provision" | "server.delete";
export type StackHeader =
    | "stack.create"
    | "stack.update"
    | "stack.delete"
    | "stack.build"
    | "stack.build.deploy"
    | "stack.build.delete";

export type ProjectPipelineEvent = PipelineEvent<ProjectPipelineEventHeader>;

export interface ProjectPipelineParams {
    token: Token;
    settings: ProjectRequiredSettings;
    onMessage?: (v: ProjectPipelineEvent) => void;
}

export interface ProjectSecretResponse {
    data: {
        token: string;
    };
}

export async function connectToProjectPipeline(params: ProjectPipelineParams) {
    const target = links.projects().pipeline();

    const secretResp = await Request.getRequest<ProjectSecretResponse>({
        target,
        token: params.token,
        settings: params.settings,
    });

    if (!secretResp.ok) {
        return secretResp;
    }

    return connectToSocket<ProjectPipelineEvent>({
        target,
        token: secretResp.value.data.token,
        settings: params.settings,
        onMessage: params.onMessage,
    });
}
