import { gql } from "apollo-angular";

export const GET_BANNERS = gql`
query GetAllBannerActivePublic {
    getAllBannerActivePublic {
        createdAt
        deletedAt
        id
        imageUrl
        imageUrlCallback
        isActive
        order
        organizationId
        page
        redirectUrl
        title
        updatedAt
    }
}
`;