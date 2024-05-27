const initialState = {
    images: [],
    loading: false,
  };
  
  const imageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPLOAD_IMAGE_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'UPLOAD_IMAGE_SUCCESS':
        return {
          ...state,
          images: [...state.images, action.payload],
          loading: false,
        };
      case 'UPLOAD_IMAGE_FAILURE':
        return {
          ...state,
          loading: false,
        };
      case 'SEARCH_IMAGE_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'SEARCH_IMAGE_SUCCESS':
        return {
          ...state,
          images: action.payload,
          loading: false,
        };
      case 'SEARCH_IMAGE_FAILURE':
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default imageReducer;
  