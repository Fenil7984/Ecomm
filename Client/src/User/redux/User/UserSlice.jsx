/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit"
import { LoginUser, LogoutFecthApi, UserValidation, categoryByFieldsFetchApi,
 getAllCategories2, getAllProductsFecthApi, getAllUsersFetchApi,
filterProductsByCategory,  filterProductsByRange, searchProducts,
getCartByUserId,
fetchPlaceOrderApi,
getAllOrdersByUserId,
getAllOrdersShowByAdmin,
fetchAllCountries,
fetchAllStatesByCountry,
fetchAllCitiesByStateAndCountry,
getContactsFetchApi,
} from "./UserThunk"

const initialState = {
  userData: null,
  loading: false,
  error: null,
  categoryFields: [],
  usersCategoryFields: [],
  allProducts: [],
  allUsers: [],
  filteredProducts: [],
  usersFilteredProducts: [],
  filteredProducts1: [],
  usersFilteredProducts1: [],
  searchResults: [],
  addCart: [],
  userCart: [],
  items: [],
  totalAmount: 0,
  shippingCost: 0,
  relatedProducts: [],
  country: [],
  states: [],
  allCity: [],
  order: null,
  UserOrders: [],
  AllOrders: [],
  notifications: [],
  UsersCategory: [],
  getAllContacts:[]

}



const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(UserValidation.pending, (state) => {
        state.loading = true;
      })

      .addCase(UserValidation.fulfilled, (state, action) => {
        const { message, process, userData } = action.payload;
        state.loading = false;
        state.message = message;
        state.process = process;
        if (process) state.userData = userData;
      })

      .addCase(UserValidation.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.process = false;
      })

      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(LoginUser.fulfilled, (state, action) => {
        const { message, process, data } = action.payload;  // Ensure payload contains these properties

        state.loading = false;
        state.message = message;
        state.userData = data;  // Store the user data
        state.process = process;
      })



      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.process = false;
      })


      .addCase(LogoutFecthApi.pending, (state) => {
        state.loading = true
      })


      .addCase(LogoutFecthApi.fulfilled, (state) => {
        state.loading = false,
          state.userData = null
      })

      .addCase(categoryByFieldsFetchApi.pending, (state) => {
        state.loading = true;
      })

      .addCase(categoryByFieldsFetchApi.fulfilled, (state, action) => {
        state.categoryFields = action.payload;
        state.loading = false;
      })

      .addCase(categoryByFieldsFetchApi.rejected, (state, action) => {
        state.loading = false;
        state.action = action.payload;
      })


      .addCase(getAllCategories2.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllCategories2.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesData = action.payload;
      })

      .addCase(getAllCategories2.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })

      .addCase(getAllProductsFecthApi.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllProductsFecthApi.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.allProducts = action.payload;
      })

      .addCase(getAllUsersFetchApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsersFetchApi.fulfilled, (state, action) => {
        console.log("Action Payload (all users):", action.payload); // Check Data
        state.loading = false;
        state.allUsers = action.payload; // Update State
      })
      .addCase(getAllUsersFetchApi.rejected, (state, action) => {
        console.log("Action Error:", action.error.message); // Error Logging
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(filterProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(filterProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(filterProductsByRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterProductsByRange.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.filteredProducts1 = action.payload; // <-- Store filtered products
      })
      .addCase(filterProductsByRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.searchResults = action.payload; // <-- Store filtered products
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(getCartByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartByUserId.fulfilled, (state, action) => {
        console.log("Fetched cart data:", action.payload);
        state.loading = false;
        state.userCart = action.payload;
      })

      .addCase(getCartByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPlaceOrderApi.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchPlaceOrderApi.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.order = action.payload;
      })
      .addCase(fetchPlaceOrderApi.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
    
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.loading = true
      })
    
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.loading = false,
          state.UserOrders = action.payload
      })
      .addCase(getAllOrdersByUserId.rejected, (state, action) => {
        state.loading = "failled",
          state.UserOrders=action.payload
      })
      .addCase(getAllOrdersShowByAdmin.pending, (state) => {
        state.loading = true
      })
    
      .addCase(getAllOrdersShowByAdmin.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false,
          state.AllOrders = action.payload
      })
      .addCase(getAllOrdersShowByAdmin.rejected, (state, action) => {
        state.loading = "failled",
          state.AllOrders=action.payload
      })


      
      .addCase(fetchAllCountries.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAllCountries.fulfilled, (state, action) => {
        state.country = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllStatesByCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllStatesByCountry.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(fetchAllStatesByCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllCitiesByStateAndCountry.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAllCitiesByStateAndCountry.fulfilled, (state, action) => {
        console.log("Action Payload (allCity):", action.payload); // Undefined batavse jo API call fail thai
        state.loading = false;
        state.allCity = action.payload; // Undefined store thai jase
      })

      .addCase(fetchAllCitiesByStateAndCountry.rejected, (state, action) => {
        console.log("API call failed:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getContactsFetchApi.pending, (state) => {
        state.loading=true
  
        })
        .addCase(getContactsFetchApi.fulfilled, (state, action) => {
          state.loading = false,
          state.getAllContacts=action.payload
  
        })
        .addCase(getContactsFetchApi.rejected, (state, action) => {
          state.loading = false,
          state.getAllContacts=action.payload
      })

    }

})

export default UserSlice.reducer