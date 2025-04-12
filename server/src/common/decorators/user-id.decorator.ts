import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Types } from "mongoose";

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Types.ObjectId => {
    const request = ctx.switchToHttp().getRequest();
    // Assuming the user ID is set in the request object by the auth middleware
    const userId = request.user.sub;

    if (!userId) {
      throw new Error("User ID not found in request");
    }

    return userId;
  }
); 