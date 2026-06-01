import React from 'react';
import {Text, View} from 'react-native';
import {styles, COLORS} from '../styles';

export const TrendChart = () => {
  return (
    <View style={styles.halfCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Subscription Collection Trend</Text>
      </View>
      <View style={styles.chartLegend}>
        <View style={styles.legendItem}><View style={[styles.legendLine, {backgroundColor: COLORS.blue}]} /><Text style={styles.legendText}>Collected Fees</Text></View>
        <View style={styles.legendItem}><View style={[styles.dashedLine, {borderColor: COLORS.orange}]} /><Text style={styles.legendText}>Expected Fees</Text></View>
      </View>
      <View style={styles.chartBox}>
        <Text style={[styles.yLabel, {top: 2}]}>₹2L</Text>
        <Text style={[styles.yLabel, {top: 37}]}>₹1.5L</Text>
        <Text style={[styles.yLabel, {top: 72}]}>₹1L</Text>
        <Text style={[styles.yLabel, {top: 106}]}>₹0</Text>
        {[16, 49, 83, 117].map(top => <View key={top} style={[styles.gridLine, {top}]} />)}
        <View style={styles.trendArea} />
        <View style={[styles.chartLine, {left: 54, top: 101, width: 58, transform: [{rotate: '-22deg'}]}]} />
        <View style={[styles.chartLine, {left: 108, top: 79, width: 58, transform: [{rotate: '-22deg'}]}]} />
        <View style={[styles.chartLine, {left: 162, top: 54, width: 58, transform: [{rotate: '-22deg'}]}]} />
        <View style={[styles.expectedLine, {left: 53, top: 111, width: 58, transform: [{rotate: '-20deg'}]}]} />
        <View style={[styles.expectedLine, {left: 108, top: 91, width: 58, transform: [{rotate: '-20deg'}]}]} />
        <View style={[styles.expectedLine, {left: 163, top: 70, width: 58, transform: [{rotate: '-20deg'}]}]} />
        {[{left: 53, top: 101}, {left: 107, top: 79}, {left: 161, top: 54}, {left: 214, top: 29}].map((dot, i) => <View key={i} style={[styles.chartDot, dot]} />)}
        <Text style={[styles.xLabel, {left: 44}]}>Week 1</Text>
        <Text style={[styles.xLabel, {left: 96}]}>Week 2</Text>
        <Text style={[styles.xLabel, {left: 149}]}>Week 3</Text>
        <Text style={[styles.xLabel, {left: 202}]}>Week 4</Text>
        <View style={styles.callout}><Text style={styles.calloutText}>₹2.4L{`\n`}Collected</Text></View>
      </View>
    </View>
  );
};
