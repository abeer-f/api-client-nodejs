import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import { CollectionDoc } from "../../common/structs";
import * as Memberships from "../clouds/membership";

export async function getMemberships({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<
    CollectionDoc<Memberships.Membership, {}, Memberships.MembershipIncludes>
  >({
    query,
    token,
    settings,
    target: links.account().memberships(),
  });
}
