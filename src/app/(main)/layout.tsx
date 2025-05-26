
import { ReactNode} from "react";
import Template from "./template";
import { ReduxProvider } from "@/store/Providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <ReduxProvider>
          <Template>{children}</Template>
        </ReduxProvider>
      </body>
    </html>
  );
}
