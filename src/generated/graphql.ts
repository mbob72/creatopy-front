export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type CreateItemInput = {
    title: Scalars['String'];
};

export type CreateTokenInput = {
    login: Scalars['String'];
    password: Scalars['String'];
};

export type CreateUserInput = {
    fullName: Scalars['String'];
    login: Scalars['String'];
    password: Scalars['String'];
};

export type ItemType = {
    __typename?: 'ItemType';
    createdAt: Scalars['String'];
    title: Scalars['String'];
    user: UserType;
};

export type Mutation = {
    __typename?: 'Mutation';
    createItem: ItemType;
    createToken: TokenType;
    createUser: UserType;
    removeItem: ItemType;
    removeUser: UserType;
    updateItem: ItemType;
    updateUser: UserType;
};


export type MutationCreateItemArgs = {
    createItemInput: CreateItemInput;
};


export type MutationCreateTokenArgs = {
    createTokenInput: CreateTokenInput;
};


export type MutationCreateUserArgs = {
    createUserInput: CreateUserInput;
};


export type MutationRemoveItemArgs = {
    id: Scalars['Int'];
};


export type MutationUpdateItemArgs = {
    updateItemInput: UpdateItemInput;
};


export type MutationUpdateUserArgs = {
    updateUserInput: UpdateUserInput;
};

export type Query = {
    __typename?: 'Query';
    items: Array<ItemType>;
    user: UserType;
};

export type TokenType = {
    __typename?: 'TokenType';
    token: Scalars['String'];
    user: UserType;
};

export type UpdateItemInput = {
    id: Scalars['Int'];
    title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
    fullName?: InputMaybe<Scalars['String']>;
    login?: InputMaybe<Scalars['String']>;
    password?: InputMaybe<Scalars['String']>;
};

export type UserType = {
    __typename?: 'UserType';
    fullName: Scalars['String'];
    id: Scalars['Int'];
    login: Scalars['String'];
};

export type CreateUserMutationVariables = Exact<{
    login: Scalars['String'];
    password: Scalars['String'];
    fullName: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserType', id: number, login: string, fullName: string } };

export type CreateTokenMutationVariables = Exact<{
    login: Scalars['String'];
    password: Scalars['String'];
}>;


export type CreateTokenMutation = { __typename?: 'Mutation', createToken: { __typename?: 'TokenType', token: string, user: { __typename?: 'UserType', id: number, fullName: string } } };

export type GetItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'ItemType', title: string, createdAt: string, user: { __typename?: 'UserType', id: number, fullName: string } }> };

export type AddItemMutationVariables = Exact<{
    createItemInput: CreateItemInput;
}>;


export type AddItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'ItemType', createdAt: string } };


export interface PossibleTypesResultData {
    possibleTypes: {
        [key: string]: string[]
    }
}
const result: PossibleTypesResultData = {
    "possibleTypes": {}
};
export default result;
