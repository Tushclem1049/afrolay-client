export type TAuth = {
  auth: {
    user: string;
    email: string;
    imgUrl?: string;
    accessToken: string;
  };

  state: {
    loading: boolean;
    error: boolean;
    errorMessage: string | null;
    success: boolean;
  };
};
