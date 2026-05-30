import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: () => void;
  rightActionLabel?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  onBack,
  rightAction,
  rightActionLabel,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        )}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightAction && (
        <TouchableOpacity onPress={rightAction}>
          <Text style={styles.rightAction}>{rightActionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 12,
  },
  backText: {
    fontSize: 24,
    color: colors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textGray,
    marginTop: 2,
  },
  rightAction: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default AppHeader;
