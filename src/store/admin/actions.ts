import { api } from '@/api';
import { ActionContext } from 'vuex';
import { State } from '../state';
import { AdminState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { commitSetUsers } from './mutations';
import { dispatchCheckApiError } from '../main/actions';

type MainContext = ActionContext<AdminState, State>;

export const actions = {
    async actionGetUsers(context: MainContext) {
        try {
            const response = await api.getUsers(context.rootState.main.token);
            if (response) {
                commitSetUsers(context, response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    }
};

const { dispatch } = getStoreAccessors<AdminState, State>('');

export const dispatchGetUsers = dispatch(actions.actionGetUsers);
