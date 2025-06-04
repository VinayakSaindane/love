
import { useParams, Link } from 'react-router-dom';
import { useAppointments } from '@/contexts/AppointmentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Calendar, DollarSign, Clock, Award } from 'lucide-react';

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { doctors } = useAppointments();
  
  const doctor = doctors.find(d => d.id === id);

  if (!doctor) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor not found</h2>
        <p className="text-gray-600 mb-4">The doctor you're looking for doesn't exist.</p>
        <Link to="/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const availableSlots = doctor.availability.reduce((total, day) => total + day.slots.length, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Doctor Header */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage src={doctor.profileImage} alt={doctor.name} />
              <AvatarFallback className="text-2xl">{doctor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
              <p className="text-xl text-blue-100 mb-3">{doctor.specialization}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{doctor.rating} Rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span>{doctor.experience} years experience</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>${doctor.consultationFee} consultation</span>
                </div>
              </div>
            </div>
            <div className="md:text-right">
              <Link to={`/book/${doctor.id}`}>
                <Button size="lg" variant="secondary" className="w-full md:w-auto">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* About Section */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Dr. {doctor.name.split(' ').pop()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
            </CardContent>
          </Card>

          {/* Specializations & Expertise */}
          <Card>
            <CardHeader>
              <CardTitle>Specialization & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Primary Specialization</h4>
                  <Badge variant="secondary" className="text-sm">
                    {doctor.specialization}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Experience</h4>
                  <p className="text-gray-600">
                    {doctor.experience} years of clinical practice in {doctor.specialization}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education & Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Education & Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Doctor of Medicine (MD)</p>
                    <p className="text-sm text-gray-600">Harvard Medical School</p>
                  </div>
                  <span className="text-sm text-gray-500">2010</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Residency in {doctor.specialization}</p>
                    <p className="text-sm text-gray-600">Johns Hopkins Hospital</p>
                  </div>
                  <span className="text-sm text-gray-500">2014</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Board Certification</p>
                    <p className="text-sm text-gray-600">American Board of {doctor.specialization}</p>
                  </div>
                  <span className="text-sm text-gray-500">2015</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">${doctor.consultationFee}</p>
                  <p className="text-sm text-gray-600">Consultation fee</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">{availableSlots} slots</p>
                  <p className="text-sm text-gray-600">Available this week</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">City Hospital</p>
                  <p className="text-sm text-gray-600">Primary location</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Times */}
          <Card>
            <CardHeader>
              <CardTitle>Available This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {doctor.availability.slice(0, 3).map((day, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <p className="font-medium mb-2">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {day.slots.slice(0, 4).map((slot, slotIndex) => (
                        <span 
                          key={slotIndex} 
                          className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                        >
                          {slot}
                        </span>
                      ))}
                      {day.slots.length > 4 && (
                        <span className="px-2 py-1 text-xs text-gray-500">
                          +{day.slots.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link to={`/book/${doctor.id}`}>
                <Button className="w-full mt-4">
                  View All Available Times
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Patient Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{doctor.rating}</div>
                  <div className="flex justify-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(doctor.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Based on 127 reviews</p>
                </div>
                
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-3">
                    <p className="text-sm text-gray-600">
                      "Excellent doctor, very thorough and caring. Highly recommend!"
                    </p>
                    <p className="text-xs text-gray-500 mt-1">- Sarah M.</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-3">
                    <p className="text-sm text-gray-600">
                      "Professional and knowledgeable. Great experience overall."
                    </p>
                    <p className="text-xs text-gray-500 mt-1">- John D.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
