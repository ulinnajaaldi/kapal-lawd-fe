import React from "react";

import { ProfileFeatureStore } from "./hook";
import Profile from "./page";

const ProfileFeature: React.FC = () => {
  return (
    <ProfileFeatureStore>
      <Profile />
    </ProfileFeatureStore>
  );
};

export default ProfileFeature;
