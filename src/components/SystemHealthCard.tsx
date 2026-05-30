import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from './Progressbar';

interface HealthMetric {
  label: string;
  value: number;
  color: string;
}

const metrics: HealthMetric[] = [
  {
    label: 'Uptime',
    value: 99.9,
    color: '#16A34A',
  },
  {
    label: 'Active Users',
    value: 92,
    color: '#2563EB',
  },
  {
    label: 'Order Success',
    value: 96,
    color: '#16A34A',
  },
  {
    label: 'Tenant Isolation',
    value: 100,
    color: '#16A34A',
  },
];

const SystemHealthCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>System Health</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Healthy</Text>
        </View>
      </View>

      {metrics.map((item, index) => (
        <View key={index} style={styles.metricRow}>
          <Text
            style={styles.label}
            numberOfLines={1}
          >
            {item.label}
          </Text>

          <View style={styles.progressWrapper}>
            <ProgressBar
              percentage={item.value}
              color={item.color}
            />
          </View>

          <Text
            numberOfLines={1}
            style={[
              styles.value,
              { color: item.color },
            ]}
          >
            {item.value}%
          </Text>
        </View>
      ))}
    </View>
  );
};

export default SystemHealthCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  badge: {
    backgroundColor: '#16A34A',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },

  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  label: {
    width: 80, // fixed width
    fontSize: 11,
    color: '#6B7280',
  },

  progressWrapper: {
    flex: 1, // takes remaining space
    marginHorizontal: 8,
  },

  value: {
    width: 45, // fixed width
    textAlign: 'right',
    fontSize: 11,
    fontWeight: '600',
  },
});