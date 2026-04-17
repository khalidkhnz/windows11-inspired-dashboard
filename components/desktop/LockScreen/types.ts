export type LockVariantProps = {
  stage: "lock" | "signin";
  signingIn: boolean;
  now: Date;
  onSignIn: () => void;
};
