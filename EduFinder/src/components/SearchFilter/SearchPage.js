import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Search, Filter, Star, MapPin, ChevronLeft, ChevronRight, X, Info } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import TopNavigation from "../Home/TopNavigation";
import Footer from "../Home/Footer";

// Helper to update map view
const MapController = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      const currentCenter = map.getCenter();
      if (currentCenter.lat !== center[0] || currentCenter.lng !== center[1]) {
        map.setView(center, 13, { animate: true });
      }
    }
  }, [center, map]);
  return null;
};

const MapCenterHandler = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      const currentCenter = map.getCenter();
      if (currentCenter.lat !== center.lat || currentCenter.lng !== center.lng) {
        map.setView([center.lat, center.lng], 14, { animate: true });
      }
    }
  }, [center, map]);
  return null;
};

const createPriceIcon = (center, isActive) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="relative">
        <div class="w-8 h-8 rounded-full shadow-xl flex items-center justify-center transition-all border-2 ${
          isActive 
          ? "bg-[#0052cc] text-white border-white scale-125 z-[2000]" 
          : "bg-white text-[#0052cc] border-[#0052cc] hover:scale-110"
        }">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
          </svg>
        </div>
        ${isActive ? '<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0052cc] rotate-45 border-r border-b border-white"></div>' : ''}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });
};

const cityCoords = {
  "Hồ Chí Minh": [10.7769, 106.7009],
  "Hà Nội": [21.0285, 105.8542],
  "Đà Nẵng": [16.0544, 108.2022],
  "Quy Nhơn": [13.782, 109.219],
  "Cần Thơ": [10.0333, 105.7833]
};

const districtsByCity = {
  "Hồ Chí Minh": ["Tất cả Quận/Huyện", "Quận 1", "Quận 3", "Quận 7", "Bình Thạnh", "Gò Vấp", "Thủ Đức", "Tân Bình"],
  "Hà Nội": ["Tất cả Quận/Huyện", "Cầu Giấy", "Đống Đa", "Hai Bà Trưng", "Thanh Xuân", "Hà Đông", "Nam Từ Liêm"],
  "Đà Nẵng": ["Tất cả Quận/Huyện", "Quận Hải Châu", "Quận Thanh Khê", "Quận Sơn Trà", "Quận Ngũ Hành Sơn", "Quận Liên Chiểu", "Quận Cẩm Lệ", "Huyện Hòa Vang", "Huyện Hoàng Sa"],
  "Quy Nhơn": ["Tất cả Quận/Huyện", "Ghềnh Ráng", "Nguyễn Văn Cừ", "Quang Trung", "Trần Phú"],
  "Cần Thơ": ["Tất cả Quận/Huyện", "Ninh Kiều", "Cái Răng", "Bình Thủy", "Ô Môn"]
};

const ITEMS_PER_PAGE = 5;

const SearchFilterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [allCenters, setAllCenters] = useState([]);
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedCity, setSelectedCity] = useState(queryParams.get("city") || "Đà Nẵng");
  const [selectedDistrict, setSelectedDistrict] = useState("Tất cả Quận/Huyện");
  const [searchQuery, setSearchQuery] = useState(queryParams.get("q") || "");

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

  useEffect(() => {
    let result = allCenters;
    
    if (selectedCity) {
      result = result.filter(c => c.city === selectedCity);
    }
    
    if (selectedDistrict !== "Tất cả Quận/Huyện") {
      result = result.filter(c => c.district === selectedDistrict);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    setFilteredCenters(result);
    setCurrentPage(1); // Reset to first page on filter change
    
    if (selectedCenter && (selectedCenter.city !== selectedCity || (selectedDistrict !== "Tất cả Quận/Huyện" && selectedCenter.district !== selectedDistrict))) {
      setSelectedCenter(null);
    }
  }, [allCenters, selectedCity, selectedDistrict, searchQuery]);

  const totalPages = Math.ceil(filteredCenters.length / ITEMS_PER_PAGE);
  const paginatedCenters = filteredCenters.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const centerIcons = React.useMemo(() => {
    const icons = {};
    filteredCenters.forEach(center => {
      icons[center.id] = createPriceIcon(center, selectedCenter?.id === center.id);
    });
    return icons;
  }, [filteredCenters, selectedCenter?.id]);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedDistrict("Tất cả Quận/Huyện");
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f8f9fb]">
      <TopNavigation />
      
      {/* Compact Search and Filters Bar */}
      <div className="px-8 py-3 bg-white border-b border-gray-100 sticky top-[72px] z-[100] shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-3">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm trung tâm..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-primary/10 transition-all text-xs font-medium"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-100 rounded-xl bg-white min-w-[140px]">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <select 
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="bg-transparent border-none outline-none text-[11px] font-bold text-[#191c1e] w-full cursor-pointer"
              >
                {Object.keys(cityCoords).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 border border-gray-100 rounded-xl bg-white min-w-[160px]">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select 
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent border-none outline-none text-[11px] font-bold text-[#191c1e] w-full cursor-pointer"
              >
                {districtsByCity[selectedCity].map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-4 py-4 flex flex-col lg:flex-row gap-4 flex-1 overflow-hidden">
        
        {/* Left Side: Compact Center List */}
        <div className="w-full lg:w-[350px] xl:w-[400px] flex flex-col gap-4 overflow-hidden">
          <div className="flex justify-between items-center px-2">
            <h1 className="text-sm font-black text-[#191c1e] tracking-tight uppercase">
              {filteredCenters.length} kết quả
            </h1>
            <div className="flex items-center gap-1">
               <span className="text-[10px] text-primary font-black uppercase tracking-widest">{selectedCity}</span>
               {selectedDistrict !== "Tất cả Quận/Huyện" && (
                 <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest truncate max-w-[80px]"> • {selectedDistrict}</span>
               )}
            </div>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar flex-1 pr-1">
            {paginatedCenters.map((center) => (
              <div 
                key={center.id}
                onClick={() => setSelectedCenter(center)}
                className={`flex bg-white rounded-2xl overflow-hidden border transition-all cursor-pointer hover:shadow-lg group ${
                  selectedCenter?.id === center.id ? "border-primary ring-1 ring-primary/10 shadow-md" : "border-gray-100 shadow-sm"
                }`}
              >
                <div className="w-24 h-auto min-h-[100px] relative overflow-hidden">
                  <img src={center.image} alt={center.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  {center.isFeatured && (
                    <span className="absolute top-2 left-2 bg-secondary px-1.5 py-0.5 rounded text-[8px] font-black text-[#684300] uppercase shadow-sm">Nổi bật</span>
                  )}
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-[#191c1e] text-xs leading-tight line-clamp-1 group-hover:text-primary transition-colors">{center.name}</h3>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-[10px] font-black text-[#191c1e]">{center.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      <span className="px-1.5 py-0.5 bg-gray-50 text-[#191c1e] text-[8px] font-black rounded border border-gray-100 uppercase">{center.district}</span>
                      {center.tags.slice(0, 1).map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 bg-blue-50 text-primary text-[8px] font-black rounded border border-blue-100 uppercase">{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex flex-col">
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/center-detail?id=${center.id}`); }}
                      className="w-7 h-7 bg-primary/10 text-primary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredCenters.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                <Info className="w-10 h-10 mb-2 opacity-20" />
                <p className="text-xs font-bold uppercase tracking-widest">Không có kết quả</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 py-2 border-t border-gray-50 bg-white sticky bottom-0">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-gray-100 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Trang {currentPage} / {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-gray-100 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Map */}
        <div className="flex-1 min-h-[500px] lg:h-auto lg:min-h-[600px] sticky top-32 z-10 mb-8">
          <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 p-1 relative">
            <div className="w-full h-full rounded-[1.8rem] overflow-hidden">
              <MapContainer 
                center={cityCoords[selectedCity]} 
                zoom={13} 
                className="w-full h-full"
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; CARTO'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <MapController center={cityCoords[selectedCity]} />
                <MapCenterHandler center={selectedCenter} />
                
                {filteredCenters.map((center) => (
                  <Marker 
                    key={center.id}
                    position={[center.lat, center.lng]}
                    icon={centerIcons[center.id]}
                    eventHandlers={{
                      click: () => setSelectedCenter(center),
                    }}
                  />
                ))}

                {selectedCenter && (
                  <Popup 
                    position={[selectedCenter.lat, selectedCenter.lng]}
                    closeButton={false}
                    offset={[0, -20]}
                  >
                    <div className="w-56 overflow-hidden bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col animate-fade-in">
                      <div className="h-20 w-full relative overflow-hidden">
                        <img src={selectedCenter.image} className="w-full h-full object-cover" alt={selectedCenter.name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex flex-col">
                            <h4 className="font-bold text-[#191c1e] text-[10px] leading-tight line-clamp-1">{selectedCenter.name}</h4>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star className="w-2 h-2 text-yellow-500 fill-yellow-500" />
                              <span className="text-[9px] font-black text-[#191c1e]">{selectedCenter.rating}</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => navigate(`/center-detail?id=${selectedCenter.id}`)}
                          className="w-full py-1.5 bg-[#003d9b] text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-primary transition-all"
                        >
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  </Popup>
                )}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchFilterPage;
