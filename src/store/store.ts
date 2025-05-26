import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
// import productSlice from "../features/products/productSlice";


// * в store хранятся данные из всего react приложения
// они изменяются с помощью функции reducer, в которую передается action

export const store = configureStore({
  reducer: {
    // подключаем функции reducer для обработки данных из файлов slice
    // products: productSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
