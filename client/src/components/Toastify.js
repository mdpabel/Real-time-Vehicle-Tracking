import {View} from 'react-native';
import React from 'react';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

const Toastify = () => {
  return (
    <View>
      <AlertNotificationRoot>
        {Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Congrats! this is toast notification success',
        })}
      </AlertNotificationRoot>
    </View>
  );
};

export default Toastify;
