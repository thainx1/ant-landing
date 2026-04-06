import { gql } from "apollo-angular";

export const GENERATE_FORM_KEY = gql`
query GenerateFormKey {
    generateFormKey {
        domain
        expiredAt
        key
    }
}
`;
export const SUBMIT_CONSULTATION_FORM = gql`
mutation SubmitConsultationForm($input: SubmitConsultationFormInput!) {
    submitConsultationForm(input: $input) {
        customerId
        message
        success
    }
}
`;