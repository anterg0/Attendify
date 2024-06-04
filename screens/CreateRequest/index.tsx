import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import requestRepository from '../../repositories/requestRepository';

const reqRepo = new requestRepository();

const CreateRequest = ({ navigation }) => {
  const [requestType, setRequestType] = useState('vacation');
  const [fromDate, setFromDate] = useState(new Date());
  const [untilDate, setUntilDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showUntilDatePicker, setShowUntilDatePicker] = useState(false);

  const handleCreateRequest = async () => {
    if (requestType === 'vacation') {
        if (fromDate > untilDate) {
            Alert.alert('Error', "From date can't be set later than until date.");
            return;
        }
        await reqRepo.createVacationRequest(fromDate, untilDate).then(() => {
            Alert.alert('Success', "Vacation request has been sent.");
            navigation.goBack(null);
        })
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Request Type</Text>
      <Picker
        selectedValue={requestType}
        onValueChange={(value) => setRequestType(value)}
        style={styles.picker}
      >
        <Picker.Item label="Vacation" value="vacation" />
      </Picker>

      {requestType === 'vacation' && (
        <View>
          <Text style={styles.label}>From</Text>
          <TouchableOpacity
            onPress={() => setShowFromDatePicker(!showFromDatePicker)}
            style={styles.datePickerContainer}
          >
            <Text>{fromDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showFromDatePicker && (
            <DateTimePicker
              value={fromDate}
              mode="date"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={Platform.OS === 'ios' ? (event, date) => {
                setFromDate(date || fromDate);
              } : (event, date) => {
                setShowFromDatePicker(!showFromDatePicker);
                setFromDate(date || fromDate);
              }}
            />
          )}

          <Text style={styles.label}>Until</Text>
          <TouchableOpacity
            onPress={() => setShowUntilDatePicker(!showUntilDatePicker)}
            style={styles.datePickerContainer}
          >
            <Text>{untilDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showUntilDatePicker && (
            <DateTimePicker
              value={untilDate}
              mode="date"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={Platform.OS === 'ios' ? (event, date) => {
                setUntilDate(date || untilDate);
              } : (event, date) => {
                setShowUntilDatePicker(!showUntilDatePicker);
                setUntilDate(date || untilDate);
              }}
            />
          )}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleCreateRequest}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  picker: {
    marginBottom: 16
  },
  datePickerContainer: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    borderColor: 'black',
    borderRadius: 7,
  },
  button: {
    backgroundColor: '#6358EC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 7,
    marginBottom: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default CreateRequest;