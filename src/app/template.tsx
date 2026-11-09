import type { ReactNode } from "react";

/** A template re-mounts on every navigation, which replays this CSS-only page entrance. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
