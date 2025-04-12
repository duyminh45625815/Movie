import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Types } from "mongoose";

export const OrganizationId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Types.ObjectId => {
    const request = ctx.switchToHttp().getRequest();
    // Get organizationId from headers instead of request object
    const organizationId = request.headers["x-organization-id"];

    if (!organizationId) {
      throw new Error("Organization ID not found in request headers");
    }

    return new Types.ObjectId(organizationId);
  }
); 