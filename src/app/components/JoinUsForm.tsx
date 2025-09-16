import React, { useState } from 'react';
import { User, Building, Phone, Mail, Send } from 'lucide-react';
import { CustomButton } from './ui/CustomButton';

interface FormData {
  fullName: string;
  role?: string;
  company?: string;
  mobile?: string;
  email?: string;
}

export const JoinUsForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    role: '',
    company: '',
    mobile: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Role Field */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <User size={18} />
          <span>What describes you? *</span>
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-transparent transition-colors"
        >
          <option value="" disabled>Select your role</option>
          <option value="Broker">Broker</option>
          <option value="Builder">Builder</option>
          <option value="Dealer">Dealer</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Full Name Field */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <User size={18} />
          <span>Full Name *</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-transparent transition-colors"
          placeholder="Enter your full name"
        />
      </div>

      {/* Company Field (Optional) */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <Building size={18} />
          <span>Company Name (Optional)</span>
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-transparent transition-colors"
          placeholder="Enter your company name"
        />
      </div>

      {/* Mobile Field (Optional) */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <Phone size={18} />
          <span>Mobile (Optional)</span>
        </label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-transparent transition-colors"
          placeholder="Enter your mobile number"
        />
      </div>

      {/* Email Field (Optional) */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <Mail size={18} />
          <span>Email (Optional)</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-transparent transition-colors"
          placeholder="Enter your email address"
        />
      </div>

      <CustomButton type="submit" className="w-full mt-6">
        <Send className="mr-2" size={18} />
        Submit
      </CustomButton>
    </form>
  );
};