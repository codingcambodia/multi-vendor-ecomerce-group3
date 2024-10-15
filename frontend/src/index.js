import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

ReactDOM.render(
  <HelmetProvider>
    <Helmet prioritizeSeoTags>
      <title>Group Three E-commerce platform</title>
      <meta
        name="description"
        content="This is an ecomerce website that allow sellers to sell 
        and manage their transaction online"
      />

      <link rel="notImportant" href="https://groupthree.shop" />
      <link rel="canonical" href="https://www.google.com" />
      <meta
        property="og:title"
        content="This project is made by group three assignment"
      />
    </Helmet>
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </HelmetProvider>,
  document.getElementById("root")
);

reportWebVitals();
