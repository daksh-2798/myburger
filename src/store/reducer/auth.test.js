import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('suth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined,{})).toEqual({
            token : null,
            userId : null,
            loading: false,
            error : null,
            authRedirectPath : '/'
        });
    });

    it('should store token upon login',()=>{
        expect(reducer({
            token : null,
            userId : null,
            loading: false,
            error : null,
            authRedirectPath : '/'},
            {
                type : actionTypes.AUTH_SUCCESS,
                idToken : 'some-token',
                userId : 'some-id'})).toEqual({token : 'some-token',
                userId : 'some-id',
                loading: false,
                error : null,
                authRedirectPath : '/'})
    });
});