import {
  Resource,
  ResourceId,
  IP,
  CollectionDoc,
  SingleDoc,
} from "../../../common/structs";
import { links, StandardParams } from "../../../common/api";
import * as Request from "../../../common/api/request";

export type Collection = CollectionDoc<Hook>;
export type Single = SingleDoc<Hook>;

export interface Hook extends Resource<HookMetas> {
  stack_id: ResourceId;
  name: string;
  active: boolean;
  secret: string;
  default_tag: string;
  ips: IP[];
}

export interface HookMetas {
  url?: string[];
}

export async function getCollection(
  params: StandardParams & {
    stackId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .stacks()
      .hooks(params.stackId)
      .collection(),
  });
}

export async function getSingle(
  params: StandardParams & {
    stackId: ResourceId;
    hookId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .stacks()
      .hooks(params.stackId)
      .single(params.hookId),
  });
}

export interface CreateParams {
  name: string;
  ips?: IP[];
  default_tag: string;
}

export async function create(
  params: StandardParams & {
    value: CreateParams;
    stackId: ResourceId;
  },
) {
  return Request.postRequest<Single>({
    ...params,
    target: links
      .stacks()
      .hooks(params.stackId)
      .collection(),
  });
}

export interface UpdateParams {
  name?: string;
  active?: boolean;
  default_tag?: string;
  ips?: IP[];
}

export async function update(
  params: StandardParams & {
    value: UpdateParams;
    stackId: ResourceId;
    hookId: ResourceId;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links
      .stacks()
      .hooks(params.stackId)
      .single(params.hookId),
  });
}
