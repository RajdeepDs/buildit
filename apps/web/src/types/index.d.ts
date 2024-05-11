export type TUser = {
  id: string;
  name: string;
  username: string | null;
  email: string;
  emailVerified: string | null;
  image: string;
  password: string | null;
  onboarding: boolean;
  role: string;
  isTwoFactorEnabled: boolean;
};

export type TWorkspace = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};
