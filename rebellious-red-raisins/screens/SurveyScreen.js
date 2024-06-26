import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const SurveyScreen = () => {
  const [responses, setResponses] = useState({
    'Govardhan': 0,
    'Niranjan': 0,
    'karunakar': 0,
    'Ayush Soni': 0,
  });

  const handleResponse = (neighbor) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [neighbor]: prevResponses[neighbor] + 1,
    }));
  };

  const data = {
    labels: Object.keys(responses),
    datasets: [
      {
        data: Object.values(responses),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Who makes more noise?</Text>
      {Object.keys(responses).map((neighbor) => (
        <TouchableOpacity
          key={neighbor}
          style={styles.optionButton}
          onPress={() => handleResponse(neighbor)}
        >
          <Text style={styles.optionText}>{neighbor}</Text>
        </TouchableOpacity>
      ))}
      <BarChart
        style={styles.chart}
        data={data}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        verticalLabelRotation={30}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#e91e63',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chart: {
    marginTop: 20,
    borderRadius: 16,
  },
});

export default SurveyScreen;
