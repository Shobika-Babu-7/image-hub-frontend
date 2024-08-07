import { gql } from "@apollo/client";

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($name: String!, $email: String!, $password: String!) {
    createAccount(createUserDto: { name: $name, email: $email, password: $password }) {
        name
        email
        accessToken
        _id,
        authEnabled
    }
  }
`;

export const LOGIN_ACCOUNT = gql`
  mutation login($email: String!, $password: String!) {
    login(loginDto: { email: $email, password: $password }) {
        name
        email
        accessToken
        _id,
        authEnabled
    }
  }
`;

export const GENERATE_QR = gql`
  mutation generateQrCode($userId: String!) {
    generateQrCode(userId: $userId) {
      qrCodeUrl
    }
  }
`;

export const VERIFY_ACCOUNT = gql`
  mutation verifyToken($code: String!, $userId: String!) {
    verifyToken(code: $code, userId: $userId) {
      tokenVerified,
      user {
        authEnabled
      }
    }
  }
`;

export const GET_ACCOUNT = gql`
  query myProfile($userId: String!) {
    myProfile(userId: $userId) {
        name
        email
        _id
    }
  }
`;

export const GET_IMAGES = gql`
  query GetAllMyUploadedPictures($user: String!) {
    getAllMyUploadedPictures(user: $user) {
        _id
        image
        mimeType
        createdAt
        updatedAt
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation UploadPicture($file: Upload!) {
    uploadPicture(file: $file){
      _id
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation DeletePicture($picId: String!) {
    deletePicture(picId: $picId)
  }
`;
