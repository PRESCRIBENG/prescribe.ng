"use client";

import { useState, FormEvent, ChangeEvent } from "react";

type FundraiserFormProps = {
  onSubmit: (data: FormData) => void;
};

type FormData = {
  name: string;
  dateOfBirth: string;
  location: string;
  email: string;
  phone: string;
  hospitalName: string;
  doctorNameContact: string;
  diagnosis: string;
  requiredTreatment: string;
  treatmentStartDate: string;
  medicalReport: File | null;
  totalAmountNeeded: string;
  minimumGoal: string;
  patientPhoto: File | null;
  fundraisingStory: string;
  confirmAccuracy: boolean;
};

const FundraiserForm = ({ onSubmit }: FundraiserFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    dateOfBirth: "",
    location: "",
    email: "",
    phone: "",
    hospitalName: "",
    doctorNameContact: "",
    diagnosis: "",
    requiredTreatment: "",
    treatmentStartDate: "",
    medicalReport: null,
    totalAmountNeeded: "",
    minimumGoal: "",
    patientPhoto: null,
    fundraisingStory: "",
    confirmAccuracy: false,
  });

  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { title: "Personal Information" },
    { title: "Medical Details" },
    { title: "Story & Confirmation" }
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  const isStepValid = () => {
    if (currentStep === 0) {
      return (
        formData.name !== "" && 
        formData.dateOfBirth !== "" && 
        formData.location !== "" && 
        formData.email !== "" && 
        formData.phone !== "" &&
        formData.hospitalName !== "" &&
        formData.doctorNameContact !== ""
      );
    } else if (currentStep === 1) {
      return (
        formData.diagnosis !== "" && 
        formData.requiredTreatment !== "" && 
        formData.treatmentStartDate !== "" &&
        formData.totalAmountNeeded !== "" &&
        formData.minimumGoal !== ""
      );
    } else if (currentStep === 2) {
      return (
        formData.fundraisingStory !== "" &&
        formData.confirmAccuracy
      );
    }
    return true;
  };

  // Indicator dots
  const StepIndicator = () => {
    return (
      <div className="flex justify-center items-center mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center mx-2">
            <button
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentStep
                  ? "bg-[#0077B6]" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => goToStep(index)}
              // aria-label={`Go to step ${index + 1}: ${step.title}`}
            />
            {/* <span className="text-xs mt-1 text-gray-500">{step.title}</span> */}
          </div>
        ))}
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-[16px] font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                required
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
            </div>
            <div>
              <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">Hospital Name</label>
              <input
                type="text"
                id="hospitalName"
                name="hospitalName"
                required
                value={formData.hospitalName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
            </div>
            <div>
              <label htmlFor="doctorNameContact" className="block text-sm font-medium text-gray-700">Doctor&apos;s Name & Contact</label>
              <input
                type="text"
                id="doctorNameContact"
                name="doctorNameContact"
                required
                value={formData.doctorNameContact}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-9">
            <div>
              <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">Diagnosis</label>
              <input
                type="text"
                id="diagnosis"
                name="diagnosis"
                required
                value={formData.diagnosis}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
            </div>
            <div>
              <label htmlFor="requiredTreatment" className="block text-sm font-medium text-gray-700">Required Treatment</label>
              <input
                type="text"
                id="requiredTreatment"
                name="requiredTreatment"
                required
                value={formData.requiredTreatment}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
            </div>
            <div>
              <label htmlFor="treatmentStartDate" className="block text-sm font-medium text-gray-700">Treatment Start Date</label>
              <input
                type="date"
                id="treatmentStartDate"
                name="treatmentStartDate"
                required
                value={formData.treatmentStartDate}
                onChange={handleChange}
                className="mt-1 block w-full text-[14px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
            </div>
            <div>
              <label htmlFor="medicalReport" className="block text-sm font-medium text-gray-700">Upload Medical Report</label>
              <input
                type="file"
                id="medicalReport"
                name="medicalReport"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 text-[12px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
              {formData.medicalReport && (
                <p className="mt-1 text-sm text-gray-500">
                  Selected file: {formData.medicalReport.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="totalAmountNeeded" className="block text-sm font-medium text-gray-700">Total Amount Needed (₦ or $)</label>
              <input
                type="number"
                id="totalAmountNeeded"
                name="totalAmountNeeded"
                required
                value={formData.totalAmountNeeded}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
            </div>
            <div>
              <label htmlFor="minimumGoal" className="block text-sm font-medium text-gray-700">Minimum Goal (₦ or $)</label>
              <input
                type="number"
                id="minimumGoal"
                name="minimumGoal"
                required
                value={formData.minimumGoal}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="patientPhoto" className="block text-sm font-medium text-gray-700">Upload Patient Photo</label>
              <input
                type="file"
                id="patientPhoto"
                name="patientPhoto"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
              {formData.patientPhoto && (
                <p className="mt-1 text-sm text-gray-500">
                  Selected file: {formData.patientPhoto.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="fundraisingStory" className="block text-sm font-medium text-gray-700">Why Are You Fundraising? (Tell Your Story)</label>
              <textarea
                id="fundraisingStory"
                name="fundraisingStory"
                rows={6}
                required
                value={formData.fundraisingStory}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-[#FE6F15]"
              />
            </div>
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="confirmAccuracy"
                  name="confirmAccuracy"
                  type="checkbox"
                  checked={formData.confirmAccuracy}
                  onChange={handleChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="confirmAccuracy" className="font-medium text-gray-700">
                  I confirm that all information provided is accurate and that funds will be used solely for medical expenses.
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="min-h-[400px]">
        {renderStep()}
      </div>

      <StepIndicator />
      
      <div className="flex justify-between pt-4">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={prevStep}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </button>
        )}
        
        <div className="flex-grow"></div>
        
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!isStepValid()}
            className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isStepValid() 
                ? "bg-[#0077B6] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={!isStepValid()}
            className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isStepValid() 
                ? "bg-[#0077B6] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Submit Fundraiser Request
          </button>
        )}
      </div>
    </form>
  );
};

export default FundraiserForm;