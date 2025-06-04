
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Eye, Download, Calendar, User } from 'lucide-react';

interface MedicalReport {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  doctor: string;
  extractedText?: string;
  fileSize: string;
  status: 'processed' | 'processing' | 'failed';
}

const MedicalReports = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reports, setReports] = useState<MedicalReport[]>([
    {
      id: '1',
      name: 'Blood Test Results - January 2024',
      type: 'PDF',
      uploadDate: '2024-01-15',
      doctor: 'Dr. Sarah Wilson',
      extractedText: 'Blood glucose: 95 mg/dL (Normal)\nCholesterol: 180 mg/dL (Normal)\nHemoglobin: 14.2 g/dL (Normal)',
      fileSize: '2.3 MB',
      status: 'processed'
    },
    {
      id: '2',
      name: 'X-Ray Chest - December 2023',
      type: 'JPEG',
      uploadDate: '2023-12-20',
      doctor: 'Dr. Michael Brown',
      extractedText: 'Chest X-ray shows clear lung fields. No abnormalities detected.',
      fileSize: '5.1 MB',
      status: 'processed'
    }
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    
    // Simulate upload and OCR processing
    setTimeout(() => {
      const newReport: MedicalReport = {
        id: Date.now().toString(),
        name: selectedFile.name,
        type: selectedFile.type.split('/')[1].toUpperCase(),
        uploadDate: new Date().toISOString().split('T')[0],
        doctor: 'Dr. Pending Assignment',
        extractedText: 'OCR processing completed. Sample extracted text from uploaded document.',
        fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        status: 'processed'
      };

      setReports(prev => [newReport, ...prev]);
      setSelectedFile(null);
      setIsUploading(false);
      
      toast({
        title: 'Upload successful',
        description: 'Your medical report has been uploaded and processed.',
      });
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Medical Reports</h1>
        <p className="text-gray-600 mt-2">
          Upload and manage your medical documents with automatic text extraction
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload New Report
          </CardTitle>
          <CardDescription>
            Upload medical documents (PDF, JPEG, PNG) for automatic text extraction
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Select Document</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </div>
          
          {selectedFile && (
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
                <span className="text-xs text-gray-500">
                  ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)
                </span>
              </div>
              <Button 
                onClick={handleUpload} 
                disabled={isUploading}
                size="sm"
              >
                {isUploading ? 'Processing...' : 'Upload'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Reports</h2>
        
        {reports.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No medical reports uploaded yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(report.uploadDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {report.doctor}
                        </span>
                        <span>{report.fileSize}</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      <span className="text-sm text-gray-500">{report.type}</span>
                    </div>
                  </div>
                </CardHeader>
                
                {report.extractedText && (
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Extracted Text:</h4>
                      <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 whitespace-pre-wrap">
                        {report.extractedText}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Full Document
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalReports;
