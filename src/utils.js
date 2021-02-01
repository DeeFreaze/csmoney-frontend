import { api } from '@/api';
import router from './router'
import { commitAddNotification, commitRemoveNotification } from '@/store/main/mutations';

export const getLocalToken = () => localStorage.getItem('token');

export const saveLocalToken = (token) => localStorage.setItem('token', token);

export const removeLocalToken = () => localStorage.removeItem('token');

export const checkApiError = async (context, payload) => {
  if (payload.response && payload.response.status) {
    await commitAddNotification(
      context, {
         content: router.app.$t('alert_request_processing_error'), color: 'red'
      });
  }
};

// User update
export const updateUser = async (context, id, payload) => {
  try {
    const token = getLocalToken();
    const loadingNotification = { content: router.app.$t('alert_updating'), showProgress: true };
    commitAddNotification(context, loadingNotification);
    const response = (await Promise.all([
      api.updateUser(token, id, payload),
      await new Promise((resolve, reject) => setTimeout(() => resolve(), 250)),
    ]))[0];
    commitAddNotification(context, { content: router.app.$t('alert_user_successfully_updated'), color: 'success' });
  } catch (error) {
    checkApiError(context, error);
  }
};

// CS Money api filters handler
export const getCSMoneyFilters = async (context) => {
  const token = getLocalToken();
  try {
    const response = await api.getFilters(token);
    if (response) {
      return response;
    }
  } catch (error) {
    checkApiError(context, error);
  }
};

export const getFiltersByUser = async (context, id) => {
  const token = getLocalToken();
  try {
    const response = await api.readFiltersByUser(token, id);
    if (response) {
      return response;
    }
  } catch (error) {
    checkApiError(context, error);
  }
};

export const createCSMoneyFilter = async (context, payload) => {
  try {
    const token = getLocalToken();
    const loadingNotification = { content: router.app.$t('alert_saving'), showProgress: true };
    commitAddNotification(context, loadingNotification);
    const response = (await Promise.all([
      api.createFilter(token, payload),
      await new Promise((resolve, reject) => setTimeout(() => resolve(), 250)),
    ]))[0];
    commitAddNotification(context, { content: router.app.$t('alert_filter_successfully_added'), color: 'success' });
  } catch (error) {
    checkApiError(context, error);
  }
};

export const updateCSMoneyFilter = async (context, id, payload) => {
  try {
    const token = getLocalToken();
    const loadingNotification = { content: router.app.$t('alert_updating'), showProgress: true };
    commitAddNotification(context, loadingNotification);
    const response = (await Promise.all([
      api.updateFilter(token, id, payload),
      await new Promise((resolve, reject) => setTimeout(() => resolve(), 250)),
    ]))[0];
    commitAddNotification(context, { content: router.app.$t('alert_filter_successfully_updated'), color: 'success' });
  } catch (error) {
    checkApiError(context, error);
  }
};

export const deleteCSMoneyFilter = async (context, id) => {
  try {
    const token = getLocalToken();
    const loadingNotification = { content: router.app.$t('alert_deleting'), showProgress: true };
    commitAddNotification(context, loadingNotification);
    const response = (await Promise.all([
      api.deleteFilter(token, id),
      await new Promise((resolve, reject) => setTimeout(() => resolve(), 250)),
    ]))[0];
    commitAddNotification(context, { content: router.app.$t('alert_filter_successfully_deleted'), color: 'success' });
  } catch (error) {
    checkApiError(context, error);
  }
};
