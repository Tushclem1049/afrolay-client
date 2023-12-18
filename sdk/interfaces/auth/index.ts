interface Profile {
  username: string;
  email: string;
  avatar?: string;

  [key: string]: any;
}

export type TAuth = {
  authProfile: Profile;
  accessToken: string;

  state: {
    loading: boolean;
    error: boolean;
    errorMessage?: string | null;
    success: boolean;
  };
};
