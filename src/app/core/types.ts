export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string; }
    String: { input: string; output: string; }
    Boolean: { input: boolean; output: boolean; }
    Int: { input: number; output: number; }
    Float: { input: number; output: number; }
    /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
    DateTime: { input: any; output: any; }
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: { input: any; output: any; }
    /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSONObject: { input: any; output: any; }
    /** The `Upload` scalar type represents a file upload. */
    Upload: { input: any; output: any; }
};

export enum BannerType {
    HOME = 'HOME',
    CONTACT = 'CONTACT',
    ABOUT = 'ABOUT',
    PRODUCT = 'PRODUCT',
    TRACEABILITY = 'TRACEABILITY',
}

/** Loại lời chúc */
export enum GroupPostCategory {
    /** Kỷ niệm */
    ANNIVERSARY = 'ANNIVERSARY',
    /** Sinh nhật */
    BIRTHDAY = 'BIRTHDAY',
    /** Doanh nghiệp */
    CORPORATE = 'CORPORATE',
    /** Dịp lễ */
    HOLIDAY = 'HOLIDAY',
    /** Khác */
    OTHER = 'OTHER',
    /** Cá nhân */
    PERSONAL = 'PERSONAL'
}

/** Trạng thái lời chúc */
export enum GroupPostStatus {
    /** Bản nháp */
    DRAFT = 'DRAFT',
    /** Đã xuất bản */
    PUBLISHED = 'PUBLISHED'
}

/** The different types of website banner page */
export enum WebsiteBannerPageEnum {
    ABOUT = 'ABOUT',
    CONTACT = 'CONTACT',
    HOME = 'HOME',
    NEWS = 'NEWS'
}

/** Trạng thái bài viết */
export enum PostStatus {
    /** Bản nháp */
    DRAFT = 'DRAFT',
    /** Đã xuất bản */
    PUBLISHED = 'PUBLISHED'
}

/** Loại bài viết: Giới thiệu, Chia sẻ, Chiến dịch */
export enum PostType {
    /** Chiến dịch */
    CAMPAIGN = 'CAMPAIGN',
    /** Giới thiệu */
    INTRODUCTION = 'INTRODUCTION',
    NEWS = 'NEWS',
    /** Bài chia sẻ */
    POST = 'POST'
}
export type PaginationInput = {
    keyword?: InputMaybe<Scalars['String']['input']>;
    page?: Scalars['Int']['input'];
    size?: Scalars['Int']['input'];
};

export type PaginationResponse = {
    page?: Maybe<Scalars['Int']['output']>;
    size?: Maybe<Scalars['Int']['output']>;
    total?: Maybe<Scalars['Int']['output']>;
    totalPages?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedWebsiteBannerResponse = {
    data: Array<WebsiteBanner>;
    pagination: PaginationResponse;
};

export type PaginatedWebsiteCategoryResponse = {
    data: Array<WebsiteCategory>;
    pagination: PaginationResponse;
};

export type PaginatedWebsiteGroupPostResponse = {
    data: Array<WebsiteGroupPost>;
    pagination: PaginationResponse;
};

export type PaginatedWebsiteGroupResponse = {
    data: Array<WebsiteGroup>;
    pagination: PaginationResponse;
};

export type PaginatedWebsiteOrderResponse = {
    data: Array<WebsiteOrder>;
    pagination: PaginationResponse;
};

export type PaginatedWebsitePostResponse = {
    data: Array<WebsitePost>;
    pagination: PaginationResponse;
};

export type PaginatedWebsiteProductResponse = {
    data: Array<WebsiteProduct>;
    pagination: PaginationResponse;
};

export type Query = {
    getAllBannerActivePublic: Array<WebsiteBanner>;
    websiteBanner: WebsiteBanner;
    websiteBanners: PaginatedWebsiteBannerResponse;
    websiteCategories: PaginatedWebsiteCategoryResponse;
    websiteCategory: WebsiteCategory;
    websiteGroup: WebsiteGroup;
    websiteGroupHistories: Array<WebsiteGroupHistory>;
    websiteGroupPost: WebsiteGroupPost;
    websiteGroupPosts: PaginatedWebsiteGroupPostResponse;
    websiteGroups: PaginatedWebsiteGroupResponse;
    websiteOrder: WebsiteOrder;
    websiteOrders: PaginatedWebsiteOrderResponse;
    websitePost: WebsitePost;
    websitePosts: PaginatedWebsitePostResponse;
    websiteProduct: WebsiteProduct;
    websiteProducts: PaginatedWebsiteProductResponse;
}

export type Organization = {
    address?: Maybe<Scalars['String']['output']>;
    code?: Maybe<Scalars['String']['output']>;
    createdAt: Scalars['DateTime']['output'];
    deletedAt?: Maybe<Scalars['DateTime']['output']>;
    description?: Maybe<Scalars['String']['output']>;
    email?: Maybe<Scalars['String']['output']>;
    favicon?: Maybe<Scalars['String']['output']>;
    faviconPath?: Maybe<Scalars['String']['output']>;
    id?: Maybe<Scalars['ID']['output']>;
    isActive: Scalars['Boolean']['output'];
    logo?: Maybe<Scalars['String']['output']>;
    logoPath?: Maybe<Scalars['String']['output']>;
    name: Scalars['String']['output'];
};

export type WebsiteBanner = {
    createdAt: Scalars['DateTime']['output'];
    deletedAt?: Maybe<Scalars['DateTime']['output']>;
    description?: Maybe<Scalars['String']['output']>;
    id?: Maybe<Scalars['ID']['output']>;
    imageUrl: Scalars['String']['output'];
    imageUrlCallback?: Maybe<Scalars['String']['output']>;
    isActive: Scalars['Boolean']['output'];
    order: Scalars['Int']['output'];
    organization?: Maybe<Organization>;
    organizationId?: Maybe<Scalars['String']['output']>;
    page?: Maybe<WebsiteBannerPageEnum>;
    redirectUrl?: Maybe<Scalars['String']['output']>;
    title: Scalars['String']['output'];
    updatedAt: Scalars['DateTime']['output'];
};

export type WebsiteCategory = {
    code: Scalars['String']['output'];
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    deletedAt?: Maybe<Scalars['DateTime']['output']>;
    description?: Maybe<Scalars['String']['output']>;
    groups?: Maybe<Array<WebsiteGroup>>;
    id?: Maybe<Scalars['ID']['output']>;
    isActive: Scalars['Boolean']['output'];
    name: Scalars['String']['output'];
    organization?: Maybe<Organization>;
    organizationId?: Maybe<Scalars['String']['output']>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WebsiteGroup = {
    category?: Maybe<WebsiteCategory>;
    categoryId?: Maybe<Scalars['String']['output']>;
    code: Scalars['String']['output'];
    createdAt: Scalars['DateTime']['output'];
    deletedAt?: Maybe<Scalars['DateTime']['output']>;
    description?: Maybe<Scalars['String']['output']>;
    id?: Maybe<Scalars['ID']['output']>;
    isActive: Scalars['Boolean']['output'];
    name: Scalars['String']['output'];
    organization: Organization;
    organizationId: Scalars['String']['output'];
    updatedAt: Scalars['DateTime']['output'];
};

export type WebsiteGroupHistory = {
    content?: Maybe<Scalars['String']['output']>;
    createdAt: Scalars['DateTime']['output'];
    deletedAt?: Maybe<Scalars['DateTime']['output']>;
    group?: Maybe<WebsiteGroup>;
    groupId?: Maybe<Scalars['String']['output']>;
    id?: Maybe<Scalars['ID']['output']>;
    imageUrlsCallback?: Maybe<Array<Scalars['String']['output']>>;
    images?: Maybe<Array<Scalars['String']['output']>>;
    order?: Maybe<Scalars['Int']['output']>;
    organizationId?: Maybe<Scalars['String']['output']>;
    timestamp?: Maybe<Scalars['DateTime']['output']>;
    title?: Maybe<Scalars['String']['output']>;
    updatedAt: Scalars['DateTime']['output'];
};

export type WebsiteGroupPost = {
    category: GroupPostCategory;
    content: Scalars['String']['output'];
    createdAt: Scalars['DateTime']['output'];
    deletedAt?: Maybe<Scalars['DateTime']['output']>;
    groups?: Maybe<Array<WebsiteGroup>>;
    id?: Maybe<Scalars['ID']['output']>;
    organization: Organization;
    organizationId: Scalars['String']['output'];
    products?: Maybe<Array<WebsiteProduct>>;
    publishedAt?: Maybe<Scalars['DateTime']['output']>;
    status: GroupPostStatus;
    thumbnail?: Maybe<Scalars['String']['output']>;
    title: Scalars['String']['output'];
    updatedAt: Scalars['DateTime']['output'];
    videoLink?: Maybe<Scalars['String']['output']>;
};

export type OrderProductItem = {
    name: Scalars['String']['output'];
    price: Scalars['Float']['output'];
    productId: Scalars['String']['output'];
    quantity: Scalars['Int']['output'];
    sku: Scalars['String']['output'];
};

export type WebsiteOrder = {
    createdAt: Scalars['DateTime']['output'];
    customerAddress: Scalars['String']['output'];
    customerEmail?: Maybe<Scalars['String']['output']>;
    customerName: Scalars['String']['output'];
    customerPhone: Scalars['String']['output'];
    deletedAt?: Maybe<Scalars['DateTime']['output']>;
    id?: Maybe<Scalars['ID']['output']>;
    note?: Maybe<Scalars['String']['output']>;
    orderCode: Scalars['String']['output'];
    organization: Organization;
    organizationId: Scalars['String']['output'];
    paymentMethod?: Maybe<Scalars['String']['output']>;
    paymentQrUrl?: Maybe<Scalars['String']['output']>;
    products: Array<OrderProductItem>;
    status: WebsiteOrderStatus;
    totalAmount: Scalars['Float']['output'];
    updatedAt: Scalars['DateTime']['output'];
};

/** The status of the website order */
export enum WebsiteOrderStatus {
    CANCELLED = 'CANCELLED',
    NEW = 'NEW',
    PAID = 'PAID',
    PENDING_PAYMENT = 'PENDING_PAYMENT'
}

export type WebsitePost = {
    content?: Maybe<Scalars['String']['output']>;
    createdAt: Scalars['DateTime']['output'];
    deletedAt?: Maybe<Scalars['DateTime']['output']>;
    id?: Maybe<Scalars['ID']['output']>;
    order?: Maybe<Scalars['Float']['output']>;
    organization?: Maybe<Organization>;
    organizationId: Scalars['String']['output'];
    picked?: Maybe<Scalars['Boolean']['output']>;
    publishedAt?: Maybe<Scalars['DateTime']['output']>;
    slug?: Maybe<Scalars['String']['output']>;
    status?: Maybe<PostStatus>;
    summary?: Maybe<Scalars['String']['output']>;
    thumbnail?: Maybe<Scalars['String']['output']>;
    title: Scalars['String']['output'];
    category?: Maybe<Scalars['String']['output']>;
    type?: Maybe<PostType>;
    updatedAt: Scalars['DateTime']['output'];
};

export type WebsiteProduct = {
    attributes?: Maybe<Scalars['JSON']['output']>;
    category?: Maybe<WebsiteCategory>;
    categoryId?: Maybe<Scalars['String']['output']>;
    createdAt: Scalars['DateTime']['output'];
    deletedAt?: Maybe<Scalars['DateTime']['output']>;
    description?: Maybe<Scalars['String']['output']>;
    content?: Maybe<Scalars['String']['output']>;
    group?: Maybe<WebsiteGroup>;
    groupId?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    imageUrlsCallback?: Maybe<Array<Scalars['String']['output']>>;
    images?: Maybe<Array<Scalars['String']['output']>>;
    isActive: Scalars['Boolean']['output'];
    listedPrice: Scalars['Float']['output'];
    name: Scalars['String']['output'];
    organization: Organization;
    organizationId: Scalars['String']['output'];
    qrCodePath?: Maybe<Scalars['String']['output']>;
    qrCodeUrl?: Maybe<Scalars['String']['output']>;
    salePrice: Scalars['Float']['output'];
    sku: Scalars['String']['output'];
    soldCount: Scalars['Int']['output'];
    stockQuantity: Scalars['Int']['output'];
    updatedAt: Scalars['DateTime']['output'];
};

export type GenerateFormKeyResponse = {
    key?: Maybe<Scalars['String']['output']>;
    expiredAt?: Maybe<Scalars['Float']['output']>;
    domain?: Maybe<Scalars['String']['output']>;
}

export type CreateOrderItemInput = {
    productId: string;
    quantity: number;
}

export type SubmitOrderAsGuestInput = {
    items: CreateOrderItemInput[];
    paymentMethodCode?: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    customerAddress: string;
    formKey: string;
}

export type SubmitOrderAsGuestResponse = {
    success: boolean,
    orderCode: string,
    status: WebsiteOrderStatus,
    totalAmount: number,
    paymentQrUrl: string | null,
    message: string,
}

export type SubmitConsultationFormInput = {
    formKey: string,
    fullName: string,
    email?: string,
    phone?: string,
    description?: string,
    metadata?: object,
}

export type SubmitConsultationFormResponse = {
    success: boolean,
    message: string,
    customerId: string,
}