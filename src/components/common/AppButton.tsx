import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const AppButton = ({
  title,
  onPress,
  disabled = false,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      <LinearGradient
        colors={['#0E3A9B', '#2563EB']}
        style={[styles.button, disabled && styles.disabledButton]}>
        <Text style={styles.text}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    height: 58,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.65,
  },

  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});