import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

export type User = {
  id: string;
  email: string;
  password: string;
};

export type MedicalRecord = {
  id: string;
  userId: string;
  currentMedications?: string;
  dosage?: string;
  frequency?: string;
  pastSurgeries?: string;
  surgeryDates?: string;
  complications?: string;
  allergies?: string;
  reactions?: string;
  severity?: string;
  createdAt: string;
  updatedAt: string;
};

const USERS_KEY = '@users';
const MEDICAL_RECORDS_KEY = '@medical_records';

export const storage = {
  // User operations
  async createUser(email: string, password: string): Promise<User> {
    const users = await this.getUsers();
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: uuidv4(),
      email,
      password,
    };

    await AsyncStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    return newUser;
  },

  async authenticateUser(email: string, password: string): Promise<User> {
    const users = await this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  },

  async getUsers(): Promise<User[]> {
    const data = await AsyncStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Medical records operations
  async upsertMedicalRecord(userId: string, data: Partial<MedicalRecord>): Promise<MedicalRecord> {
    const records = await this.getMedicalRecords();
    const existingRecord = records.find(r => r.userId === userId);
    const now = new Date().toISOString();

    let updatedRecord: MedicalRecord;

    if (existingRecord) {
      updatedRecord = {
        ...existingRecord,
        ...data,
        updatedAt: now,
      };
      const updatedRecords = records.map(r => 
        r.id === existingRecord.id ? updatedRecord : r
      );
      await AsyncStorage.setItem(MEDICAL_RECORDS_KEY, JSON.stringify(updatedRecords));
    } else {
      updatedRecord = {
        id: uuidv4(),
        userId,
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      await AsyncStorage.setItem(
        MEDICAL_RECORDS_KEY,
        JSON.stringify([...records, updatedRecord])
      );
    }

    return updatedRecord;
  },

  async getMedicalRecords(): Promise<MedicalRecord[]> {
    const data = await AsyncStorage.getItem(MEDICAL_RECORDS_KEY);
    return data ? JSON.parse(data) : [];
  },

  async getMedicalRecordByUserId(userId: string): Promise<MedicalRecord | null> {
    const records = await this.getMedicalRecords();
    return records.find(r => r.userId === userId) || null;
  },
};