import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const WorkoutProgressScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const formatBirthday = (input) => {
    const cleaned = input.replace(/[^\d]/g, '');
    const mm = cleaned.slice(0, 2);
    const dd = cleaned.slice(2, 4);
    const yyyy = cleaned.slice(4, 8);
    let formatted = mm;
    if (dd) formatted += '/' + dd;
    if (yyyy) formatted += '/' + yyyy;
    return formatted;
  };

  const calculateAge = (birthday) => {
    const [month, day, year] = birthday.split('/');
    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async () => {
    if (!name || !email || !birthday || !height || !weight) {
      Alert.alert('Missing Information', 'Please fill all fields.');
      return;
    }
  
    const age = calculateAge(birthday);
    const birthdayFormatted = `${birthday.slice(6, 10)}-${birthday.slice(0, 2)}-${birthday.slice(3, 5)}`;
  
    try {
      const response = await fetch('http://10.111.90.148:3000/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          birthday: birthdayFormatted,
          age,
          height: Number(height),
          weight: Number(weight),
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save user');
      }
  
      Alert.alert(
        'Next Step',
        'Would you like to snap a photo or choose workout manually?',
        [
          { text: 'Snap Photo', onPress: () => navigation.navigate('SnapPhotoScreen', { height: Number(height), weight: Number(weight), age: age }) },
          { text: 'Choose Workout', onPress: () => navigation.navigate('WorkoutChoiceScreen', { height: Number(height), weight: Number(weight), age: age }) }
        ]
      );
  
    } catch (error) {
      console.error('Error saving user:', error);
      Alert.alert('Error', error.message || 'Unknown error occurred');
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Details</Text>

      <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#ccc" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#ccc" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Birthday (MM/DD/YYYY)" placeholderTextColor="#ccc" value={birthday} keyboardType="number-pad" onChangeText={(text) => setBirthday(formatBirthday(text))} />
      <TextInput style={styles.input} placeholder="Current Height (cm)" placeholderTextColor="#ccc" keyboardType="numeric" value={height} onChangeText={setHeight} />
      <TextInput style={styles.input} placeholder="Current Weight (kg)" placeholderTextColor="#ccc" keyboardType="numeric" value={weight} onChangeText={setWeight} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#000' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: '#ffcc00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default WorkoutProgressScreen;
