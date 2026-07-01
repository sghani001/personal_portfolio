import { configureStore } from "@reduxjs/toolkit";
import { portfolioApi } from "./portfolioApi";

export const store = configureStore({
  reducer: {
    [portfolioApi.reducerPath]: portfolioApi.reducer,
  },
  middleware: (gDM) => gDM().concat(portfolioApi.middleware),
});
