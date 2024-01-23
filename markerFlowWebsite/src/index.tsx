import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { CommonProvider } from "./contexts/CommonContext";
import { EventProvider } from "./contexts/EventContext";
import { AuthProvider } from "./contexts/AuthContext";
import "./app.css";

import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import AxiosErrorHandler from "./contexts/AxiosErrorHandlerContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#42dcc8",
      },
    }}
  >
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CommonProvider>
          <AxiosErrorHandler>
            <EventProvider>
              <MemoryRouter>
                <App />
              </MemoryRouter>
            </EventProvider>
          </AxiosErrorHandler>
        </CommonProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ConfigProvider>
);
