import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateTestArgs } from "./CreateTestArgs";
import { UpdateTestArgs } from "./UpdateTestArgs";
import { DeleteTestArgs } from "./DeleteTestArgs";
import { TestFindManyArgs } from "./TestFindManyArgs";
import { TestFindUniqueArgs } from "./TestFindUniqueArgs";
import { Test } from "./Test";
import { TestService } from "../test.service";

@graphql.Resolver(() => Test)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class TestResolverBase {
  constructor(
    protected readonly service: TestService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Test",
    action: "read",
    possession: "any",
  })
  async _testsMeta(
    @graphql.Args() args: TestFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Test])
  @nestAccessControl.UseRoles({
    resource: "Test",
    action: "read",
    possession: "any",
  })
  async tests(
    @graphql.Args() args: TestFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Test[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Test",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Test, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Test",
    action: "read",
    possession: "own",
  })
  async test(
    @graphql.Args() args: TestFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Test | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Test",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Test)
  @nestAccessControl.UseRoles({
    resource: "Test",
    action: "create",
    possession: "any",
  })
  async createTest(
    @graphql.Args() args: CreateTestArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Test> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Test",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Test"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Test)
  @nestAccessControl.UseRoles({
    resource: "Test",
    action: "update",
    possession: "any",
  })
  async updateTest(
    @graphql.Args() args: UpdateTestArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Test | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Test",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Test"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Test)
  @nestAccessControl.UseRoles({
    resource: "Test",
    action: "delete",
    possession: "any",
  })
  async deleteTest(@graphql.Args() args: DeleteTestArgs): Promise<Test | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
