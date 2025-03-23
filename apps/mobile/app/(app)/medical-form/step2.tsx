import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input, Text } from 'react-native-elements';
import { storage } from '@/lib/storage';
import { useAuth } from '@/providers/AuthProvider';

export default function Step2() {
  const router = useRouter();
  const { user } = useAuth();
  const [pastSurgeries, setPastSurgeries] = useState('');
  const [surgeryDates, setSurgeryDates] = useState('');
  const [complications, setComplications] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExistingData();
  }, []);

  const loadExistingData = async () => {
    try {
      const record = await storage.getMedicalRecordByUserId(user!.id);
      if (record) {
        setPastSurgeries(record.pastSurgeries || '');
        setSurgeryDates(record.surgeryDates || '');
        setComplications(record.complications || '');
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
        pastSurgeries,
        surgeryDates,
        complications,
      });

      router.push('/medical-form/step3');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text h4 style={styles.title}>Step 2: Past Surgeries</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <Input
        label="Past Surgeries"
        placeholder="List any past surgeries"
        value={pastSurgeries}
        onChangeText={setPastSurgeries}
        multiline
      />

      <Input
        label="Surgery Dates"
        placeholder="When were these surgeries performed?"
        value={surgeryDates}
        onChangeText={setSurgeryDates}
      />

      <Input
        label="Complications"
        placeholder="Any complications during or after surgeries?"
        value={complications}
        onChangeText={setComplications}
        multiline
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Back"
          onPress={() => router.back()}
          containerStyle={styles.button}
          type="outline"
        />
        <Button
          title="Next"
          onPress={handleNext}
          loading={loading}
          containerStyle={styles.button}
        />
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});