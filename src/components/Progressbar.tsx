import React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
  percentage: number;
  color: string;
}

const ProgressBar = ({ percentage, color }: ProgressBarProps) => {
  const validPercentage = Math.min(Math.max(percentage, 0), 100);
  
  return (
    <View
      style={{
        width: '100%',
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 999,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          width: `${validPercentage}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: 999,
        }}
      />
    </View>
  );
};

export default ProgressBar;