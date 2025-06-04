
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/contexts/AppointmentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, TrendingUp, Users } from 'lucide-react';

const AppointmentHistory = () => {
  const { user } = useAuth();
  const { appointments } = useAppointments();

  const userAppointments = appointments.filter(apt => 
    user?.role === 'patient' ? apt.patientId === user.id : apt.doctorId === user.id
  );

  const completedAppointments = userAppointments.filter(apt => apt.status === 'completed');
  const cancelledAppointments = userAppointments.filter(apt => apt.status === 'cancelled');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Group appointments by month
  const groupedAppointments = userAppointments.reduce((groups: any, appointment) => {
    const date = new Date(appointment.date);
    const monthYear = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(appointment);
    
    return groups;
  }, {});

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Appointment History</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              All time appointments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              Successfully completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{cancelledAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              Cancelled appointments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Timeline */}
      {Object.keys(groupedAppointments).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedAppointments)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([monthYear, appointments]: [string, any]) => (
              <Card key={monthYear}>
                <CardHeader>
                  <CardTitle className="text-lg">{monthYear}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments
                      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((appointment: any) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>
                                {user?.role === 'patient' 
                                  ? appointment.doctorName.charAt(0) 
                                  : appointment.patientName.charAt(0)
                                }
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {user?.role === 'patient' ? appointment.doctorName : appointment.patientName}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(appointment.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{appointment.time}</span>
                                </div>
                                <span className="capitalize">{appointment.type}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No appointment history
            </h3>
            <p className="text-gray-600">
              Your appointment history will appear here once you start booking appointments.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AppointmentHistory;
