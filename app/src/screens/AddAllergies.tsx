import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const AddAllergiesScreen: React.FC = () => {
  const [allergen, setAllergen] = useState('');
  const [reaction, setReaction] = useState('');
  const [severity, setSeverity] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Allergen</Text>
          <TextInput
            style={styles.input}
            value={allergen}
            onChangeText={setAllergen}
            placeholder="What are you allergic to?"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Reaction</Text>
          <TextInput
            style={styles.input}
            value={reaction}
            onChangeText={setReaction}
            placeholder="What reaction do you experience?"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Severity</Text>
          <TextInput
            style={styles.input}
            value={severity}
            onChangeText={setSeverity}
            placeholder="e.g., Mild, Moderate, Severe"
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
          <Text style={styles.buttonText}>Save Allergy Record</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddAllergiesScreen;

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
