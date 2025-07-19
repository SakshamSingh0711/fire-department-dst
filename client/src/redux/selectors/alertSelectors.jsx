import { createSelector } from 'reselect';

const alertState = (state) => state.alert;

export const selectAlerts = createSelector(
  [alertState],
  (alert) => alert.alerts
);