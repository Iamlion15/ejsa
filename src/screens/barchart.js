import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`,
};

const BarChartExample = ({data}) => {
  return (
    <View>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={350}
          height={300}
          chartConfig={chartConfig}
          verticalLabelRotation={25}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 1,
    margin: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    alignSelf: 'center', // Center the chart horizontally
  },
});

export default BarChartExample;
