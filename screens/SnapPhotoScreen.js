// --- SnapPhotoScreen.js ---

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const SnapPhotoScreen = ({ navigation, route }) => {
  const { height, weight, age } = route.params;
  const [image, setImage] = useState(null);
  const [bodyFat, setBodyFat] = useState(null);
  const [focusAreas, setFocusAreas] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 6],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      dummyAnalyzeBody(height, weight, age); // Basic AI Placeholder
    }
  };

  const dummyAnalyzeBody = (height, weight, age) => {
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    const estimatedBodyFat = (1.2 * bmi + 0.23 * age - 5.4).toFixed(1);

    setBodyFat(estimatedBodyFat);

    if (estimatedBodyFat > 25) {
      setFocusAreas(['Stomach', 'Arms']);
    } else if (estimatedBodyFat > 18) {
      setFocusAreas(['Stomach', 'Legs']);
    } else {
      setFocusAreas(['Overall Toning']);
    }
  };

  const handleNext = () => {
    navigation.navigate('WorkoutChoiceScreen', {
      height,
      weight,
      age,
      bodyFat,
      focusAreas,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snap or Upload a Body Photo</Text>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Take a Photo</Text>
      </TouchableOpacity>

      {bodyFat && (
        <View style={styles.resultsContainer}>
          <Text style={styles.result}>BMI and Fat Analysis:</Text>
          <Text style={styles.result}>Body Fat %: {bodyFat}%</Text>
          <Text style={styles.result}>Focus Areas: {focusAreas.join(", ")}</Text>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next: Choose Workout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', padding: 20 },
  title: { color: '#fff', fontSize: 22, marginBottom: 20, textAlign: 'center' },
  image: { width: 200, height: 300, marginVertical: 20, borderRadius: 15 },
  button: { backgroundColor: '#ffcc00', padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: '#000', fontWeight: 'bold' },
  resultsContainer: { marginTop: 30, alignItems: 'center' },
  result: { color: '#fff', fontSize: 16, marginBottom: 5 },
});

export default SnapPhotoScreen;
