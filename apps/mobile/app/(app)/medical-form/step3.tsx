import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input, Text } from 'react-native-elements';
import { storage } from '@/lib/storage';
import { useAuth } from '@/providers/AuthProvider';

export default function Step3() {
  const router = useRouter();
  const { user } = useAuth();
  const [allergies, setAllergies] = useState('');
  const [reactions, setReactions] = useState('');
  const [severity, setSeverity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExistingData();
  }, []);

  const loadExistingData = async () => {
    try {
      const record = await storage.getMedicalRecordByUserId(user!.id);
      if (record) {
        setAllergies(record.allergies || '');
        setReactions(record.reactions || '');
        setSeverity(record.severity || '');
      }
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      await storage.upsertMedicalRecord(user!.id, {
        allergies,
        reactions,
        severity,
      });

      router.replace('/medical-form/step1');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text h4 style={styles.title}>Step 3: Allergies</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <Input
        label="Allergies"
        placeholder="List any known allergies"
        value={allergies}
        onChangeText={setAllergies}
        multiline
      />

      <Input
        label="Reactions"
        placeholder="Describe allergic reactions"
        value={reactions}
        onChangeText={setReactions}
        multiline
      />

      <Input
        label="Severity"
        placeholder="Rate the severity (mild/moderate/severe)"
        value={severity}
        onChangeText={setSeverity}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Back"
          onPress={() => router.back()}
          containerStyle={styles.button}
          type="outline"
        />
        <Button
          title="Submit"
          onPress={handleSubmit}
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