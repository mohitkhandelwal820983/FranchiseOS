import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = colors.primary,
  fullScreen = false,
}) => {
  const containerStyle = fullScreen ? styles.fullScreen : styles.container;

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default Loader;
