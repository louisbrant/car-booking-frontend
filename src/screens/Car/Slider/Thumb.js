import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLOR } from "../../../constants";

const THUMB_RADIUS_LOW = 14;

const Thumb = ({ name }) => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS_LOW,
    height: THUMB_RADIUS_LOW,
    borderRadius: THUMB_RADIUS_LOW,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: COLOR.IBase,
  }
});

export default memo(Thumb);
