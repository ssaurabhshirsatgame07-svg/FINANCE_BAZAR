import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, CreditCard, FileText, TrendingUp } from 'lucide-react';

const UserDetailPage: React.FC = () => {
  const { id } = useParams();

  // Mock user data - in real app, fetch based on ID
  const user = {
    id: id,
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 9876543210',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    joinDate: '2024-01-15',
    lastLogin: '2024-01-20',
    status: 'verified',
    cibilScore: 750,
    monthlyIncome: '₹85,000',
    occupation: 'Software Engineer',
    company: 'Tech Solutions Pvt Ltd',
    totalApplications: 3,
    approvedAmount: '₹15,00,000',
    profilePicture: null
  };

  const applications = [
    {
      id: '1',
      type: 'Personal Loan',
      amount: '₹5,00,000',
      status: 'approved',
      appliedDate: '2024-01-15',
      approvedDate: '2024-01-17',
      partner: 'HDFC Bank'
    },
    {
      id: '2',
      type: 'Credit Card',
      amount: '₹2,00,000',
      status: 'approved',
      appliedDate: '2024-01-10',
      approvedDate: '2024-01-12',
      partner: 'ICICI Bank'
    },
    {
      id: '3',
      type: 'Home Loan',
      amount: '₹50,00,000',
      status: 'pending',
      appliedDate: '2024-01-20',
      approvedDate: null,
      partner: 'SBI'
    }
  ];

  const cibilHistory = [
    { month: 'Oct 2023', score: 720 },
    { month: 'Nov 2023', score: 735 },
    { month: 'Dec 2023', score: 745 },
    { month: 'Jan 2024', score: 750 }
  ];

  const getStatusBadge = (status: string) => {
    const colors = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/admin/users"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600 mt-1">Detailed information and activity for {user.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full mt-2 ${
                user.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{user.phone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <span className="text-gray-900">{user.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">Joined {user.joinDate}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Professional Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Occupation:</span>
                  <span className="text-gray-900">{user.occupation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Company:</span>
                  <span className="text-gray-900">{user.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Income:</span>
                  <span className="text-gray-900 font-medium">{user.monthlyIncome}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">CIBIL Score</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{user.cibilScore}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applications</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{user.totalApplications}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved Amount</p>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">{user.approvedAmount}</p>
                </div>
                <CreditCard className="w-8 h-8 text-indigo-500" />
              </div>
            </div>
          </div>

          {/* Applications History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 rounded-lg">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Partner</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Applied Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{app.type}</td>
                      <td className="py-3 px-4 text-gray-900">{app.amount}</td>
                      <td className="py-3 px-4 text-gray-900">{app.partner}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(app.status)}`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{app.appliedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CIBIL Score History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">CIBIL Score History</h3>
            <div className="space-y-3">
              {cibilHistory.map((entry, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-gray-600">{entry.month}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                        style={{ width: `${(entry.score / 900) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-gray-900 w-12">{entry.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;