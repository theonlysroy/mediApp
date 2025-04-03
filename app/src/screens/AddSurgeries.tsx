import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const AddSurgeriesScreen: React.FC = () => {
  const [procedure, setProcedure] = useState('');
  const [date, setDate] = useState('');
  const [hospital, setHospital] = useState('');
  const [surgeon, setSurgeon] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Procedure Name</Text>
          <TextInput
            style={styles.input}
            value={procedure}
            onChangeText={setProcedure}
            placeholder="Enter procedure name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Surgery</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="MM/DD/YYYY"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hospital</Text>
          <TextInput
            style={styles.input}
            value={hospital}
            onChangeText={setHospital}
            placeholder="Enter hospital name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Surgeon</Text>
          <TextInput
            style={styles.input}
            value={surgeon}
            onChangeText={setSurgeon}
            placeholder="Enter surgeon's name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Additional Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Enter any additional notes"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Surgery Record</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddSurgeriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});
