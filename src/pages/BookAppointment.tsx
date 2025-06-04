
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/contexts/AppointmentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, FileText, ArrowLeft } from 'lucide-react';

const BookAppointment = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const { user } = useAuth();
  const { doctors, bookAppointment } = useAppointments();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<'consultation' | 'follow-up' | 'emergency'>('consultation');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const doctor = doctors.find(d => d.id === doctorId);

  if (!doctor) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor not found</h2>
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: 'Missing information',
        description: 'Please select both date and time',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to book an appointment',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      bookAppointment({
        doctorId: doctor.id,
        doctorName: doctor.name,
        patientId: user.id,
        patientName: user.name,
        date: selectedDate,
        time: selectedTime,
        status: 'pending',
        type: appointmentType,
        notes: notes
      });

      toast({
        title: 'Appointment booked!',
        description: 'Your appointment has been successfully booked.',
      });

      navigate('/appointments');
    } catch (error) {
      toast({
        title: 'Booking failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Book Appointment</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Doctor Info */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={doctor.profileImage} alt={doctor.name} />
                  <AvatarFallback className="text-lg">{doctor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialization}</p>
                  <p className="text-sm text-gray-500">{doctor.experience} years experience</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultation Fee:</span>
                  <span className="font-medium">${doctor.consultationFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium">{doctor.rating}/5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Select Date & Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Selection */}
              <div>
                <Label className="text-base font-medium mb-3 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Available Dates
                </Label>
                <RadioGroup
                  value={selectedDate}
                  onValueChange={setSelectedDate}
                  className="grid grid-cols-1 gap-3"
                >
                  {doctor.availability.map((day, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={day.date} id={`date-${index}`} />
                      <Label htmlFor={`date-${index}`} className="flex-1 cursor-pointer">
                        <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="font-medium">
                            {new Date(day.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric',
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="text-sm text-gray-600">
                            {day.slots.length} slots available
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <Label className="text-base font-medium mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Available Times
                  </Label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {doctor.availability
                      .find(day => day.date === selectedDate)
                      ?.slots.map((slot, index) => (
                        <Button
                          key={index}
                          variant={selectedTime === slot ? "default" : "outline"}
                          onClick={() => setSelectedTime(slot)}
                          className="h-auto py-3"
                        >
                          {slot}
                        </Button>
                      ))}
                  </div>
                </div>
              )}

              {/* Appointment Type */}
              <div>
                <Label className="text-base font-medium mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Appointment Type
                </Label>
                <RadioGroup
                  value={appointmentType}
                  onValueChange={(value: 'consultation' | 'follow-up' | 'emergency') => setAppointmentType(value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="consultation" id="consultation" />
                    <Label htmlFor="consultation" className="cursor-pointer">
                      <div>
                        <div className="font-medium">New Consultation</div>
                        <div className="text-sm text-gray-600">First time visit or new health concern</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="follow-up" id="follow-up" />
                    <Label htmlFor="follow-up" className="cursor-pointer">
                      <div>
                        <div className="font-medium">Follow-up Visit</div>
                        <div className="text-sm text-gray-600">Continuing treatment or check-up</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emergency" id="emergency" />
                    <Label htmlFor="emergency" className="cursor-pointer">
                      <div>
                        <div className="font-medium">Emergency Consultation</div>
                        <div className="text-sm text-gray-600">Urgent medical attention needed</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Additional Notes */}
              <div>
                <Label htmlFor="notes" className="text-base font-medium mb-3 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Describe your symptoms, concerns, or any specific requests..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Booking Summary */}
              {selectedDate && selectedTime && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Appointment Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Doctor:</span>
                      <span>{doctor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{new Date(selectedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="capitalize">{appointmentType}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1 mt-2">
                      <span>Consultation Fee:</span>
                      <span>${doctor.consultationFee}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Book Button */}
              <Button 
                onClick={handleBookAppointment}
                disabled={!selectedDate || !selectedTime || isLoading}
                className="w-full h-12 text-lg"
                size="lg"
              >
                {isLoading ? 'Booking...' : 'Book Appointment'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
