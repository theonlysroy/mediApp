import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input, Text } from 'react-native-elements';
import { storage } from '@/lib/storage';
import { useAuth } from '@/providers/AuthProvider';

export default function Step1() {
  const router = useRouter();
  const { user } = useAuth();
  const [currentMedications, setCurrentMedications] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExistingData();
  }, []);

  const loadExistingData = async () => {
    try {
      const record = await storage.getMedicalRecordByUserId(user!.id);
      if (record) {
        setCurrentMedications(record.currentMedications || '');
        setDosage(record.dosage || '');
        setFrequency(record.frequency || '');
      }
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const handleNext = async () => {
    try {
      setLoading(true);
      setError(null);

      await storage.upsertMedicalRecord(user!.id, {
        currentMedications,
        dosage,
        frequency,
      });

      router.push('/medical-form/step2');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text h4 style={styles.title}>Step 1: Medicines Usage</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <Input
        label="Current Medications"
        placeholder="List your current medications"
        value={currentMedications}
        onChangeText={setCurrentMedications}
        multiline
      />

      <Input
        label="Dosage"
        placeholder="Enter dosage details"
        value={dosage}
        onChangeText={setDosage}
      />

      <Input
        label="Frequency"
        placeholder="How often do you take these medications?"
        value={frequency}
        onChangeText={setFrequency}
      />

      <Button
        title="Next"
        onPress={handleNext}
        loading={loading}
        containerStyle={styles.button}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});