
import React, { createContext, useContext, useReducer } from 'react';

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  profileImage: string;
  availability: TimeSlot[];
  consultationFee: number;
  about: string;
}

export interface TimeSlot {
  date: string;
  slots: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: 'consultation' | 'follow-up' | 'emergency';
  notes?: string;
}

export interface MedicalReport {
  id: string;
  patientId: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  extractedText?: string;
  fileUrl: string;
}

interface AppointmentState {
  doctors: Doctor[];
  appointments: Appointment[];
  reports: MedicalReport[];
}

interface AppointmentContextType extends AppointmentState {
  bookAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  cancelAppointment: (appointmentId: string) => void;
  updateAppointmentStatus: (appointmentId: string, status: Appointment['status']) => void;
  uploadReport: (report: Omit<MedicalReport, 'id'>) => void;
  deleteReport: (reportId: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

type AppointmentAction =
  | { type: 'BOOK_APPOINTMENT'; payload: Appointment }
  | { type: 'CANCEL_APPOINTMENT'; payload: string }
  | { type: 'UPDATE_APPOINTMENT_STATUS'; payload: { id: string; status: Appointment['status'] } }
  | { type: 'UPLOAD_REPORT'; payload: MedicalReport }
  | { type: 'DELETE_REPORT'; payload: string };

const appointmentReducer = (state: AppointmentState, action: AppointmentAction): AppointmentState => {
  switch (action.type) {
    case 'BOOK_APPOINTMENT':
      console.log('Booking appointment:', action.payload);
      return { ...state, appointments: [...state.appointments, action.payload] };
    case 'CANCEL_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(apt =>
          apt.id === action.payload ? { ...apt, status: 'cancelled' } : apt
        )
      };
    case 'UPDATE_APPOINTMENT_STATUS':
      return {
        ...state,
        appointments: state.appointments.map(apt =>
          apt.id === action.payload.id ? { ...apt, status: action.payload.status } : apt
        )
      };
    case 'UPLOAD_REPORT':
      return { ...state, reports: [...state.reports, action.payload] };
    case 'DELETE_REPORT':
      return {
        ...state,
        reports: state.reports.filter(report => report.id !== action.payload)
      };
    default:
      return state;
  }
};

// Mock data - Updated dates to be more recent
const mockDoctors: Doctor[] = [
  {
    id: '2',
    name: 'Dr. Sarah Wilson',
    specialization: 'Cardiology',
    experience: 8,
    rating: 4.8,
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
    consultationFee: 200,
    about: 'Dr. Sarah Wilson is a board-certified cardiologist with over 8 years of experience in treating heart conditions.',
    availability: [
      { date: '2024-12-12', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      { date: '2024-12-13', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      { date: '2024-12-14', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] }
    ]
  },
  {
    id: '3',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatology',
    experience: 5,
    rating: 4.6,
    profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
    consultationFee: 150,
    about: 'Dr. Michael Chen specializes in dermatological treatments and has extensive experience in skin care.',
    availability: [
      { date: '2024-12-12', slots: ['10:00', '11:00', '14:00', '15:00', '16:00'] },
      { date: '2024-12-13', slots: ['10:00', '11:00', '14:00', '15:00', '16:00'] },
      { date: '2024-12-14', slots: ['10:00', '11:00', '14:00', '15:00', '16:00'] }
    ]
  },
  {
    id: '4',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrics',
    experience: 12,
    rating: 4.9,
    profileImage: 'https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=300&h=300&fit=crop&crop=face',
    consultationFee: 180,
    about: 'Dr. Emily Rodriguez is a pediatrician with 12 years of experience in child healthcare.',
    availability: [
      { date: '2024-12-12', slots: ['09:00', '10:00', '11:00', '14:00'] },
      { date: '2024-12-13', slots: ['09:00', '10:00', '11:00', '14:00'] },
      { date: '2024-12-14', slots: ['09:00', '10:00', '11:00', '14:00'] }
    ]
  }
];

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appointmentReducer, {
    doctors: mockDoctors,
    appointments: [],
    reports: []
  });

  const bookAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const appointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString()
    };
    console.log('Creating appointment with data:', appointment);
    dispatch({ type: 'BOOK_APPOINTMENT', payload: appointment });
  };

  const cancelAppointment = (appointmentId: string) => {
    dispatch({ type: 'CANCEL_APPOINTMENT', payload: appointmentId });
  };

  const updateAppointmentStatus = (appointmentId: string, status: Appointment['status']) => {
    dispatch({ type: 'UPDATE_APPOINTMENT_STATUS', payload: { id: appointmentId, status } });
  };

  const uploadReport = (reportData: Omit<MedicalReport, 'id'>) => {
    const report: MedicalReport = {
      ...reportData,
      id: Date.now().toString()
    };
    dispatch({ type: 'UPLOAD_REPORT', payload: report });
  };

  const deleteReport = (reportId: string) => {
    dispatch({ type: 'DELETE_REPORT', payload: reportId });
  };

  return (
    <AppointmentContext.Provider value={{
      ...state,
      bookAppointment,
      cancelAppointment,
      updateAppointmentStatus,
      uploadReport,
      deleteReport
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};
