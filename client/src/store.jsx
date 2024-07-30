import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./slices/cardSlice";
import editCardSlice from "./slices/editCardSlice";

const rootReducer = {
  card: cardSlice,
  editCard: editCardSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
