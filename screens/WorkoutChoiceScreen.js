import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const workoutPlans = {
  stomach: {
    Beginner: ['Crunches', 'Easy Planks'],
    Intermediate: ['Planks', 'Mountain Climbers'],
    Advanced: ['Weighted Situps', 'Hanging Leg Raises']
  },
  legs: {
    Beginner: ['Bodyweight Squats', 'Lunges'],
    Intermediate: ['Weighted Lunges', 'Bulgarian Split Squats'],
    Advanced: ['Barbell Squats', 'Jump Squats']
  },
  arms: {
    Beginner: ['Wall Pushups', 'Dumbbell Curls'],
    Intermediate: ['Dips', 'Chin-ups'],
    Advanced: ['Weighted Dips', 'Pull-ups']
  },
  chest: {
    Beginner: ['Knee Pushups', 'Incline Pushups'],
    Intermediate: ['Pushups', 'Dumbbell Bench Press'],
    Advanced: ['Barbell Bench Press', 'Weighted Pushups']
  },
  back: {
    Beginner: ['Superman Stretch', 'Bird-Dogs'],
    Intermediate: ['Dumbbell Rows', 'Resistance Band Pulls'],
    Advanced: ['Barbell Rows', 'Deadlifts']
  }
};

const WorkoutChoiceScreen = ({ route }) => {
  const { height, weight, age } = route.params;

  const [bodyPart, setBodyPart] = useState('');
  const [level, setLevel] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bodyFat, setBodyFat] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  const calculateAndShowPlan = () => {
    if (!bodyPart || !level) {
      Alert.alert('Missing Info', 'Please enter body part and select workout level.');
      return;
    }

    const heightMeters = height / 100;
    const bmiValue = (weight / (heightMeters * heightMeters)).toFixed(1);
    setBmi(bmiValue);

    const bodyFatValue = (1.20 * bmiValue + 0.23 * age - 5.4).toFixed(1); // gender-neutral
    setBodyFat(bodyFatValue);

    const selectedWorkouts = workoutPlans[bodyPart.toLowerCase()]?.[level];
    if (selectedWorkouts) {
      setWorkouts(selectedWorkouts);
    } else {
      setWorkouts(['No workouts found for this body part and level.']);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Info</Text>
      <Text style={styles.info}>Height: {height} cm</Text>
      <Text style={styles.info}>Weight: {weight} kg</Text>
      <Text style={styles.info}>Age: {age} years</Text>

      <TextInput
        style={styles.input}
        placeholder="Body Part to Focus On (e.g., stomach, legs)"
        placeholderTextColor="#ccc"
        value={bodyPart}
        onChangeText={setBodyPart}
      />

      <View style={styles.levelContainer}>
        {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
          <TouchableOpacity
            key={lvl}
            style={[styles.levelButton, level === lvl && styles.selectedLevel]}
            onPress={() => setLevel(lvl)}
          >
            <Text style={styles.levelButtonText}>{lvl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={calculateAndShowPlan}>
        <Text style={styles.submitButtonText}>Show Plan</Text>
      </TouchableOpacity>

      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>BMI: {bmi}</Text>
          <Text style={styles.result}>Estimated Body Fat %: {bodyFat}%</Text>
          <Text style={styles.result}>Suggested Workouts:</Text>
          {workouts.map((workout, index) => (
            <Text key={index} style={styles.workoutItem}>- {workout}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  info: { fontSize: 16, color: '#eee', marginBottom: 5 },
  input: { backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', marginVertical: 10, padding: 10, borderRadius: 10 },
  levelContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  levelButton: { backgroundColor: '#444', padding: 10, borderRadius: 10 },
  selectedLevel: { backgroundColor: '#ffcc00' },
  levelButtonText: { color: '#fff', fontWeight: 'bold' },
  submitButton: { backgroundColor: '#ffcc00', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  submitButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  resultContainer: { marginTop: 30 },
  result: { color: '#fff', fontSize: 18, marginBottom: 10 },
  workoutItem: { color: '#eee', fontSize: 16, marginLeft: 10 },
});

export default WorkoutChoiceScreen;
