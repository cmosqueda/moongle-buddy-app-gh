// auth exports

export { default as Login } from "./login";
export { default as Signup } from "./signup";

// --------------------
// auth entrypoint

import { Redirect } from "expo-router";
import React from "react";

export default function AuthIndex() {
  return (
    <>
      <Redirect href={"/(auth)/login"}></Redirect>
    </>
  );
}

// --------------------
