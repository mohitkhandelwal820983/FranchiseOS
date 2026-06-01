import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {recentLogins} from '../constants/profileData';
import {COLORS, styles} from '../styles';
import {Card} from './Card';

export const RecentLogins = () => {
  return (
    <Card title="Recent Logins">
      {recentLogins.map((login, index) => {
        const blocked = login.status === 'blocked';

        return (
          <View
            key={login.id}
            style={[
              styles.loginRow,
              index === recentLogins.length - 1 && styles.lastRow,
            ]}>
            <View
              style={[
                styles.loginDot,
                {backgroundColor: blocked ? COLORS.red : COLORS.green},
              ]}
            />

            <View style={styles.loginContent}>
              <Text
                style={[styles.loginDevice, blocked && styles.blocked]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {login.device}
              </Text>

              <Text
                style={[styles.loginLocation, blocked && styles.blocked]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {login.location}
              </Text>
            </View>

            <View style={styles.loginRight}>
              <Text
                style={[styles.loginTime, blocked && styles.blocked]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {login.time}
              </Text>

              {blocked && (
                <TouchableOpacity activeOpacity={0.85} style={styles.reviewBtn}>
                  <Text style={styles.reviewText}>Review</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}
    </Card>
  );
};
