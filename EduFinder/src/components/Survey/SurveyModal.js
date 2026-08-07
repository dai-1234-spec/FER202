import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle, ArrowRight, ArrowLeft, Target, MapPin, GraduationCap } from 'lucide-react';

const GOALS = [
  "IELTS",
  "Giao tiếp cơ bản",
  "Giao tiếp cho người đi làm",
  "Tiếng Anh trẻ em",
  "Tiếng Anh mất gốc"
];

const DISTRICTS = [
  "Quận Hải Châu",
  "Quận Thanh Khê"
];

const LEVELS = [
  "Chưa biết gì / Mất gốc",
  "Biết cơ bản",
  "Khá tốt"
];

const SurveyModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    goal: '',
    district: '',
    level: ''
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    // Build query params
    const params = new URLSearchParams();
    
    let queryGoals = [];
    if (selections.goal) {
      queryGoals.push(selections.goal);
    }
    
    if (selections.level === "Chưa biết gì / Mất gốc" && selections.goal !== "Tiếng Anh mất gốc") {
      queryGoals.push("Tiếng Anh mất gốc");
    }

    if (queryGoals.length > 0) {
      params.append('q', queryGoals.join(','));
    }

    if (selections.district) params.append('district', selections.district);
    
    onClose();
    // Reset state after closing
    setTimeout(() => {
      setStep(1);
      setSelections({ goal: '', district: '', level: '' });
    }, 300);
    
    navigate(`/center-list?${params.toString()}`);
  };

  const canProceed = () => {
    if (step === 1) return !!selections.goal;
    if (step === 2) return !!selections.district;
    if (step === 3) return !!selections.level;
    return false;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-black text-[#191c1e]">Khảo sát nhu cầu học tập</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1.5">
          <div 
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Body */}
        <div className="p-8 flex-1 min-h-[350px] flex flex-col">
          {step === 1 && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="flex items-center gap-3 text-primary">
                <Target className="w-6 h-6" />
                <h3 className="text-xl font-bold">Mục tiêu học tập của bạn là gì?</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {GOALS.map(goal => (
                  <button
                    key={goal}
                    onClick={() => setSelections({...selections, goal})}
                    className={`p-4 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between ${
                      selections.goal === goal 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-200 text-gray-600 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                  >
                    <span>{goal}</span>
                    {selections.goal === goal && <CheckCircle className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="flex items-center gap-3 text-primary">
                <MapPin className="w-6 h-6" />
                <h3 className="text-xl font-bold">Bạn muốn học ở khu vực nào?</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {DISTRICTS.map(district => (
                  <button
                    key={district}
                    onClick={() => setSelections({...selections, district})}
                    className={`px-6 py-4 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between gap-3 ${
                      selections.district === district 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-200 text-gray-600 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                  >
                    <span>{district}</span>
                    {selections.district === district && <CheckCircle className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="flex items-center gap-3 text-primary">
                <GraduationCap className="w-6 h-6" />
                <h3 className="text-xl font-bold">Trình độ hiện tại của bạn?</h3>
              </div>
              <div className="flex flex-col gap-4">
                {LEVELS.map(level => (
                  <button
                    key={level}
                    onClick={() => setSelections({...selections, level})}
                    className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between ${
                      selections.level === level 
                        ? 'border-primary bg-primary/5 text-primary shadow-md' 
                        : 'border-gray-200 text-gray-600 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                  >
                    <span>{level}</span>
                    {selections.level === level && <CheckCircle className="w-6 h-6" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50">
          <button 
            onClick={handlePrev}
            disabled={step === 1}
            className={`font-bold flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
              step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ArrowLeft className="w-5 h-5" /> Quay lại
          </button>

          {step < 3 ? (
            <button 
              onClick={handleNext}
              disabled={!canProceed()}
              className={`font-bold flex items-center gap-2 px-8 py-3 rounded-xl transition-all shadow-lg ${
                !canProceed() 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-opacity-90 hover:-translate-y-0.5'
              }`}
            >
              Tiếp tục <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={handleComplete}
              disabled={!canProceed()}
              className={`font-bold flex items-center gap-2 px-8 py-3 rounded-xl transition-all shadow-lg ${
                !canProceed() 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-green-500 text-white hover:bg-opacity-90 hover:-translate-y-0.5 shadow-green-500/30'
              }`}
            >
              Hoàn thành <CheckCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;
