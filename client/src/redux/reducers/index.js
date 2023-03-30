

const initialState = {
  dogs: [],
  temperaments: [],
  error: {},
  dogDetail: {},
  currentPage: 1,
  allDogs: [],
  filteredDogs: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };

    case "GET_DETAIL":
      return {
        ...state,
        dogDetail: action.payload,
      };

    case "GET_BY_NAME":
      return {
        ...state,
        dogs: action.payload,
      };

      case 'FILTER_BY':
        const alldogs = state.allDogs;
        /*  console.log(action.payload); */
        const filter2 =
          action.payload === "Created"
            ? alldogs.filter((ele) => ele.createdInDb)
            : alldogs.filter((ele) => !ele.createdInDb);
        return {
          ...state,
          dogs:
            action.payload === "All"
              ? alldogs
              : filter2.length
              ? filter2
              : [],
        }; 

    case "FILTER_TEMPERAMENT":
      console.log("payload:", action.payload);
      const allDogs = state.allDogs;
      console.log("allDogs:", allDogs);
      const temperamentsFiltered = allDogs.filter((dog) =>
        // dog.temperament &&
        dog.temperaments.map((temp) => temp).includes(action.payload)
      );

      console.log("filteredDogs:", temperamentsFiltered);
      return {
        ...state,
        dogs: temperamentsFiltered,
      };

      case "ORDER_BY":
        let sortedDogs = [...state.dogs]; // Copia del array de perros
        switch (action.payload) {
          case "mayor":
            sortedDogs.sort(function (a, b) {
              if (a.weight > b.weight) {
                return -1;
              }
              if (b.weight > a.weight) {
                return 1;
              }
              return 0;
            });
      
            break;
          case "menor":
            sortedDogs.sort(function (a, b) {
              if (a.weight > b.weight) {
                return 1;
              }
              if (b.weight > a.weight) {
                return -1;
              }
              return 0;
            });
      
            break;
      
          case "ascendente":
            sortedDogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            });
      
            break;
          case "descendente":
            sortedDogs.sort(function (a, b) {
              if (a.name < b.name) {
                return 1;
              }
              if (b.name < a.name) {
                return -1;
              }
              return 0;
            });
            break;
          default:
            break;
        }
        return {
          ...state,
          dogs: sortedDogs,
        };
      
      case "POST_DOG":
        return {
          ...state,
        };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CLEAN":
      return {
        ...state,
        dogDetail: [],
      };

    default:
      return state;
  }
}
console.log(initialState);

export default rootReducer;
