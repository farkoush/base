import { getting, putting, posting, setCookie } from "../../helpers";
import routes from '../routes';

export const getBusinesses = () => {
    return (dispatch) => {
        getting(routes('api.businesses.index'))
            .then(response => dispatch({
                    type: 'GET-BUSINESSES',
                    payload: response.data
            }))
            .catch( error => { console.log(error.response) } );
    }
}; 

export const setBusiness = (id, attributes) => {
    return (dispatch) => {
        dispatch({ type: 'SET-BUSINESS', id, attributes })
    }
}; 
export const storeBusiness = (business) => {
    return (dispatch) => {
        posting(routes('api.businesses.store'), business.attributes)
            .then(response => {
                dispatch({
                    type: 'STORE-BUSINESS',
                    payload: response.data
                });
            })
            .catch( error => { console.log(error.response) } );
    }
};
export const updateBusiness = (Business) => {
    return (dispatch) => {
        putting(routes('api.businesses.update',[Business.id]), Business.attributes)
            .then(response => dispatch({
                type: 'UPDATE-BUSINESS',
                payload: response.data
            }))
            .catch( error => { console.log(error.response) } );
    }
};
