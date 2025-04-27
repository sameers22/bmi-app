import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('WorkoutProgress');
    }, 5000);

    return () => clearTimeout(timer); // Clear timer on unmount
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.header}>
          <Text style={styles.cookhouse}>Sculpture</Text>
        </Text>
        <Text style={styles.subText}>
          Track your workout progress and get personalized meal plans.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cookhouse: {
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  subText: {
    color: '#eee',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
