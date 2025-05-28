
import { ReactNode} from "react";
import Template from "./template";
import { ReduxProvider } from "@/store/Providers";
import { CustomThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>
         <CustomThemeProvider>
        <ReduxProvider>
          <Template>{children}</Template>
        </ReduxProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
