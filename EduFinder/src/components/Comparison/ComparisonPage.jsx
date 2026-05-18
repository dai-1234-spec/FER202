import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Plus, X, ArrowRight, Info, MapPin } from "lucide-react";
import TopNavigation from "../Home/TopNavigation";
import Footer from "../Home/Footer";
import ComparisonIntroSection from "./ComparisonIntroSection";
import ComparisonGridDisplaySection from "./ComparisonGridDisplaySection";
import GuidanceCalloutSection from "./GuidanceCalloutSection";

export const ComparisonPage = () => {
  const [allCenters, setAllCenters] = useState([]);
  const [selectedIds, setSelectedIds] = useState(() => {
    const saved = localStorage.getItem("selectedComparisonIds");
    return saved ? JSON.parse(saved) : [];
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("selectedComparisonIds", JSON.stringify(selectedIds));
  }, [selectedIds]);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get("/api/centers");
        setAllCenters(response.data);
      } catch (err) {
        console.error("Error fetching centers:", err);
      }
    };
    fetchCenters();
  }, []);

  const toggleCenter = (id) => {
    setSelectedIds(prev => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter(item => item !== id);
      } else if (prev.length >= 3) {
        alert("Bạn chỉ có thể so sánh tối đa 3 trung tâm cùng lúc.");
        return prev;
      } else {
        updated = [...prev, id];
      }
      return updated;
    });
  };

  const selectedCenters = allCenters.filter(c => selectedIds.includes(c.id));
  const filteredCenters = allCenters.filter(c => 
    (c.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.city || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fb]">
      <TopNavigation />
      
      <main className="flex-grow py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <ComparisonIntroSection />

          {/* Selection Control Bar */}
          <div className="flex flex-col gap-6 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-primary/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-black text-[#191c1e]">Trung tâm đang so sánh</h2>
                <p className="text-gray-400 text-sm font-medium">Chọn tối đa 3 trung tâm để xem sự khác biệt.</p>
              </div>
              <button 
                onClick={() => setIsPickerOpen(true)}
                className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Thêm trung tâm
              </button>
            </div>

            <div className="flex flex-wrap gap-4 min-h-[100px] items-center justify-start border-2 border-dashed border-gray-100 rounded-2xl p-4">
              {selectedCenters.length === 0 ? (
                <div className="w-full text-center py-4 flex flex-col items-center gap-2 text-gray-300">
                  <Info className="w-8 h-8 opacity-20" />
                  <p className="text-sm font-bold uppercase tracking-widest">Chưa có trung tâm nào được chọn</p>
                </div>
              ) : (
                selectedCenters.map(center => (
                  <div key={center.id} className="flex items-center gap-3 bg-gray-50 pr-2 pl-4 py-2 rounded-xl border border-gray-100 animate-fade-in group">
                    <span className="text-xs font-black text-[#191c1e]">{center.name}</span>
                    <button 
                      onClick={() => toggleCenter(center.id)}
                      className="p-1 hover:bg-red-50 hover:text-red-500 rounded-md transition-all text-gray-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Comparison Content */}
          {selectedCenters.length > 0 ? (
            <ComparisonGridDisplaySection providers={selectedCenters} />
          ) : (
            <div className="py-20 flex flex-col items-center gap-6 bg-white/50 rounded-[3rem] border-4 border-dashed border-white/80">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <Search className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-black text-[#191c1e] mb-2">Hãy chọn các đối thủ cạnh tranh</h3>
                <p className="text-gray-400 max-w-sm">Dữ liệu so sánh sẽ tự động xuất hiện ngay sau khi bạn chọn trung tâm.</p>
              </div>
            </div>
          )}
          
          <GuidanceCalloutSection />
        </div>
      </main>

      {/* Selection Drawer / Modal */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-[1000] flex justify-end">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in" 
            onClick={() => setIsPickerOpen(false)}
          ></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-slide-left flex flex-col overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-black text-[#191c1e] uppercase tracking-tight">Chọn trung tâm</h3>
              <button 
                onClick={() => setIsPickerOpen(false)}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all border border-gray-100 shadow-sm"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input 
                  type="text" 
                  placeholder="Tìm theo tên hoặc thành phố..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 no-scrollbar">
              {filteredCenters.map(center => {
                const isSelected = selectedIds.includes(center.id);
                return (
                  <div 
                    key={center.id}
                    onClick={() => toggleCenter(center.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${
                      isSelected ? "bg-primary/5 border-primary shadow-lg shadow-primary/10" : "bg-white border-gray-100 hover:border-primary/30"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <img src={center.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#191c1e] text-sm group-hover:text-primary transition-colors">{center.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span>{center.city}</span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? "bg-primary border-primary text-white" : "border-gray-200 group-hover:border-primary"
                    }`}>
                      {isSelected ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-8 border-t border-gray-100 bg-white">
              <button 
                onClick={() => setIsPickerOpen(false)}
                className="w-full py-4 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all uppercase text-xs tracking-widest"
              >
                Xong ({selectedIds.length}/3)
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ComparisonPage;
