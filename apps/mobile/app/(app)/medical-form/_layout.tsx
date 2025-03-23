import { Stack } from 'expo-router';

export default function MedicalFormLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="step1"
        options={{ title: 'Medicines Usage' }}
      />
      <Stack.Screen
        name="step2"
        options={{ title: 'Past Surgeries' }}
      />
      <Stack.Screen
        name="step3"
        options={{ title: 'Allergies' }}
      />
    </Stack>
  );
}