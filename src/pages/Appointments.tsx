
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/contexts/AppointmentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Phone, MessageCircle, X } from 'lucide-react';

const Appointments = () => {
  const { user } = useAuth();
  const { appointments, cancelAppointment, updateAppointmentStatus } = useAppointments();
  const { toast } = useToast();

  const userAppointments = appointments.filter(apt => 
    user?.role === 'patient' ? apt.patientId === user.id : apt.doctorId === user.id
  );

  const upcomingAppointments = userAppointments.filter(apt => 
    apt.status === 'confirmed' || apt.status === 'pending'
  );

  const pastAppointments = userAppointments.filter(apt => 
    apt.status === 'completed' || apt.status === 'cancelled'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelAppointment = (appointmentId: string) => {
    cancelAppointment(appointmentId);
    toast({
      title: 'Appointment cancelled',
      description: 'The appointment has been cancelled successfully.',
    });
  };

  const handleConfirmAppointment = (appointmentId: string) => {
    updateAppointmentStatus(appointmentId, 'confirmed');
    toast({
      title: 'Appointment confirmed',
      description: 'The appointment has been confirmed.',
    });
  };

  const handleCompleteAppointment = (appointmentId: string) => {
    updateAppointmentStatus(appointmentId, 'completed');
    toast({
      title: 'Appointment completed',
      description: 'The appointment has been marked as completed.',
    });
  };

  const AppointmentCard = ({ appointment, showActions = true }: any) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-start space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback>
                {user?.role === 'patient' 
                  ? appointment.doctorName.charAt(0) 
                  : appointment.patientName.charAt(0)
                }
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {user?.role === 'patient' ? appointment.doctorName : appointment.patientName}
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="capitalize">{appointment.type}</span>
                </div>
              </div>
              {appointment.notes && (
                <p className="text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                  {appointment.notes}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-3">
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status}
            </Badge>
            
            {showActions && (
              <div className="flex space-x-2">
                {user?.role === 'doctor' && appointment.status === 'pending' && (
                  <Button 
                    size="sm" 
                    onClick={() => handleConfirmAppointment(appointment.id)}
                  >
                    Confirm
                  </Button>
                )}
                
                {user?.role === 'doctor' && appointment.status === 'confirmed' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCompleteAppointment(appointment.id)}
                  >
                    Complete
                  </Button>
                )}
                
                {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                  <>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Appointments</h1>
        {user?.role === 'patient' && (
          <Button>Book New Appointment</Button>
        )}
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastAppointments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingAppointments.length > 0 ? (
            <div>
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No upcoming appointments
                </h3>
                <p className="text-gray-600 mb-4">
                  {user?.role === 'patient' 
                    ? "You don't have any upcoming appointments scheduled."
                    : "You don't have any upcoming patient appointments."
                  }
                </p>
                {user?.role === 'patient' && (
                  <Button>Book Your First Appointment</Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastAppointments.length > 0 ? (
            <div>
              {pastAppointments.map((appointment) => (
                <AppointmentCard 
                  key={appointment.id} 
                  appointment={appointment} 
                  showActions={false}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No past appointments
                </h3>
                <p className="text-gray-600">
                  Your appointment history will appear here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Appointments;
