"use client";

import { logout } from "./action";

export default function LogoutButton() {
  return <span onClick={() => logout()}>Logout</span>;
}
