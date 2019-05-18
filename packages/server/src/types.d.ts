
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};


export type AuthInput = {
  accessToken: Scalars['String'],
};

export type AuthResponse = {
  token: Scalars['String'],
  user: User,
};

export type Mutation = {
  authenticate: AuthResponse,
  changeRole: User,
};


export type MutationAuthenticateArgs = {
  input: AuthInput
};


export type MutationChangeRoleArgs = {
  role: Role
};

export type Query = {
  me: User,
  getAgents: Array<User>,
  getLeaders: Array<User>,
  getCoordinators: Array<User>,
};

export enum Role {
  Agent = 'Agent',
  Coodinator = 'Coodinator',
  Leader = 'Leader'
}

export type User = {
  firstName: Scalars['String'],
  surname: Scalars['String'],
  emailAddress: Scalars['String'],
  googleToken?: Maybe<Scalars['String']>,
  role: Role,
};

import { GraphQLResolveInfo } from 'graphql';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>



export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {},
  User: User,
  String: Scalars['String'],
  Role: Role,
  Mutation: {},
  AuthInput: AuthInput,
  AuthResponse: AuthResponse,
  Boolean: Scalars['Boolean'],
};

export type IsAuthenticatedDirectiveResolver<Result, Parent, ContextType = any, Args = {  }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthResponseResolvers<ContextType = any, ParentType = ResolversTypes['AuthResponse']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType = ResolversTypes['Mutation']> = {
  authenticate?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, MutationAuthenticateArgs>,
  changeRole?: Resolver<ResolversTypes['User'], ParentType, ContextType, MutationChangeRoleArgs>,
};

export type QueryResolvers<ContextType = any, ParentType = ResolversTypes['Query']> = {
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  getAgents?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  getLeaders?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  getCoordinators?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType = ResolversTypes['User']> = {
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  surname?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  emailAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  googleToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  AuthResponse?: AuthResponseResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  isAuthenticated?: IsAuthenticatedDirectiveResolver<any, any, ContextType>,
};


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;