import axios from "axios";
export const A_Z = 'A_Z';
export const Z_A = 'Z_A';
export const WEIGHT_MAX = 'WEIGHT_MAX';
export const WEIGHT_MIN = 'WEIGHT_MIN';

export function getDogs() {
  return async (dispatch) => {
    try {
        var dog = await axios('/dogs');
        return dispatch({
            type: 'GET_DOGS',
            payload: dog.data
           
        })
    } catch (error) {
        console.log(error);
    }

}
}


export function getTemperaments() {
  return async function (dispatch) {
    try {
      var res = await axios.get("/temperaments");
      return dispatch({
        type: 'GET_TEMPERAMENTS',
        payload: res.data
      });
    } catch (error) {
      alert(error);
    }
  };
}

export const getByName = (name)=> async dispatch => {
  try{
    await axios.get('/dogs?name='+ name)
    .then((response) => {
        dispatch({
            type: 'GET_BY_NAME',
            payload: response.data
        })
    })
 } catch (error) { 
    return alert("Raza no encontrada")
 }
}

export const getDetail = (id) => {
  return async function (dispatch) {
    try {
      const dogDetail = await axios.get(`/dogs/${id}`);
      dispatch({
        type: "GET_DETAIL",
        payload: dogDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};



export function orderBy(order) {
  return function (dispatch) {
    dispatch({ type: 'ORDER_BY', payload: order });
    };
}

export function filterTemperament(payload) {
  return function (dispatch) {
    dispatch({ type: 'FILTER_TEMPERAMENT', payload });
  };
}

export function filterBy(payload) {
  return function (dispatch) {
    dispatch({ type: 'FILTER_BY', payload });
  };
}

export function postDog(payload) {
  return async function(dispatch){
    const post = await axios.post("/dogs", payload)
    return dispatch({
      type: 'POST_DOG',
      payload: post 
    })
  }
}

export function clean(){
  return function(dispatch){
    dispatch({type:'CLEAN'})
  }
}

