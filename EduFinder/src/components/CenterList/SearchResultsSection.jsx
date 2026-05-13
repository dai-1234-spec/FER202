import { useId, useMemo, useState, useEffect } from "react";
import { ChevronRight, Star, MapPin, Check, ChevronDown, ChevronLeft, Filter } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SearchResultsSection = () => {
  const navigate = useNavigate();
  const locationId = useId();
  const sortId = useId();

  const languageOptions = [
    { id: "Tiếng Anh", label: "Tiếng Anh (IELTS)" },
    { id: "Tiếng Nhật", label: "Tiếng Nhật (JLPT)" },
    { id: "Tiếng Hàn", label: "Tiếng Hàn (TOPIK)" },
  ];

  const learningModes = [
    { id: "Tại trung tâm", label: "Tại trung tâm" },
    { id: "Trực tuyến", label: "Trực tuyến" },
  ];

  const [allCenters, setAllCenters] = useState([]);
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState(["Tiếng Anh"]);
  const [selectedMode, setSelectedMode] = useState("Tại trung tâm");
  const [priceRange, setPriceRange] = useState(15);
  const [selectedLocation, setSelectedLocation] = useState("Quận 1, TP. HCM");
  const [selectedSort, setSelectedSort] = useState("Phổ biến nhất");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch data from database.json via json-server
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get("http://localhost:3001/centers");
        setAllCenters(response.data);
      } catch (err) {
        console.error("Error fetching centers:", err);
      }
    };
    fetchCenters();
  }, []);

  // Filtering Logic
  useEffect(() => {
    let result = allCenters;

    // Filter by Language
    if (selectedLanguages.length > 0) {
      result = result.filter((center) =>
        selectedLanguages.some((lang) =>
          center.tags.some((tag) => tag.includes(lang))
        )
      );
    }

    // Filter by Learning Mode
    if (selectedMode) {
      result = result.filter((center) =>
        center.tags.some((tag) => tag.includes(selectedMode)) || (selectedMode === "Tại trung tâm" && !center.tags.includes("Trực tuyến"))
      );
    }

    // Filter by Price
    result = result.filter((center) => {
      const priceValue = parseInt(center.price.replace(/\./g, "").replace("đ", ""));
      return priceValue <= priceRange * 1000000;
    });

    // Filter by Location (District)
    if (selectedLocation !== "Tất cả") {
      const district = selectedLocation.split(",")[0].trim();
      result = result.filter((center) => center.district === district);
    }

    // Sorting
    if (selectedSort === "Đánh giá cao nhất") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === "Học phí thấp nhất") {
      result = [...result].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/\./g, "").replace("đ", ""));
        const priceB = parseInt(b.price.replace(/\./g, "").replace("đ", ""));
        return priceA - priceB;
      });
    }

    setFilteredCenters(result);
    setCurrentPage(1);
  }, [allCenters, selectedLanguages, selectedMode, priceRange, selectedLocation, selectedSort]);

  const handleLanguageChange = (id) => {
    setSelectedLanguages((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearAllFilters = () => {
    setSelectedLanguages([]);
    setSelectedMode("Tại trung tâm");
    setPriceRange(15);
    setSelectedLocation("Quận 1, TP. HCM");
    setSelectedSort("Phổ biến nhất");
  };

  const paginatedCenters = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCenters.slice(start, start + itemsPerPage);
  }, [filteredCenters, currentPage]);

  const totalPages = Math.ceil(filteredCenters.length / itemsPerPage);

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-[#434654]">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-primary transition-colors">Trang chủ</a></li>
          <ChevronRight size={14} className="text-gray-400" />
          <li><a href="/center-list" className="hover:text-primary transition-colors">Trung tâm ngoại ngữ</a></li>
          <ChevronRight size={14} className="text-gray-400" />
          <li className="font-bold text-primary">Kết quả tìm kiếm</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-80 shrink-0" aria-label="Bộ lọc tìm kiếm">
          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm sticky top-24">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <Filter size={20} className="text-primary" /> Bộ lọc
              </h2>
              <button
                onClick={clearAllFilters}
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Xóa tất cả
              </button>
            </div>

            {/* Language Filter */}
            <div className="mb-10">
              <h3 className="mb-5 text-[11px] font-black tracking-[0.1em] text-[#6b7280] uppercase">Ngôn ngữ</h3>
              <div className="space-y-4">
                {languageOptions.map((option) => (
                  <label key={option.id} className="flex cursor-pointer items-center group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedLanguages.includes(option.id)}
                        onChange={() => handleLanguageChange(option.id)}
                        className="peer sr-only"
                      />
                      <div className="h-6 w-6 rounded-md border-2 border-[#d1d5db] bg-white transition-all peer-checked:border-primary peer-checked:bg-primary group-hover:border-primary/50">
                        <Check size={16} className="mx-auto mt-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="ml-3 text-sm font-semibold text-[#374151] group-hover:text-primary transition-colors">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Learning Mode Filter */}
            <div className="mb-10">
              <h3 className="mb-5 text-[11px] font-black tracking-[0.1em] text-[#6b7280] uppercase">Hình thức học</h3>
              <div className="flex gap-2">
                {learningModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`flex-1 rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all ${
                      selectedMode === mode.id
                        ? "border-primary bg-[#eef2ff] text-primary"
                        : "border-[#e5e7eb] text-[#6b7280] hover:border-[#d1d5db] hover:bg-gray-50"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-10">
              <h3 className="mb-5 text-[11px] font-black tracking-[0.1em] text-[#6b7280] uppercase">Mức giá trung bình</h3>
              <div className="px-1">
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="1"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#e5e7eb] accent-primary transition-all"
                />
                <div className="mt-4 flex justify-between text-xs font-bold text-[#6b7280]">
                  <span className="bg-gray-100 px-2 py-1 rounded">2tr</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">15tr+</span>
                </div>
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <h3 className="mb-5 text-[11px] font-black tracking-[0.1em] text-[#6b7280] uppercase">Khu vực</h3>
              <div className="relative group">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full appearance-none rounded-xl border-2 border-[#e5e7eb] bg-gray-50/50 py-3 pl-12 pr-10 text-sm font-bold text-[#374151] outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5"
                >
                  <option value="Tất cả">Tất cả khu vực</option>
                  <option value="Quận 1, TP. HCM">Quận 1, TP. HCM</option>
                  <option value="Quận 3, TP. HCM">Quận 3, TP. HCM</option>
                  <option value="Thủ Đức, TP. HCM">Thủ Đức, TP. HCM</option>
                  <option value="Cầu Giấy, Hà Nội">Cầu Giấy, Hà Nội</option>
                  <option value="Hải Châu, Đà Nẵng">Hải Châu, Đà Nẵng</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-[#111827] tracking-tight">
                {filteredCenters.length} Trung tâm được tìm thấy
              </h1>
              <p className="text-sm text-gray-500 mt-1 font-medium">Tìm thấy các lựa chọn tốt nhất dựa trên bộ lọc của bạn</p>
            </div>
            
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sắp xếp:</span>
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="appearance-none rounded-xl border border-gray-200 bg-white py-2 pl-4 pr-10 text-xs font-black text-primary outline-none hover:border-primary/50 transition-colors cursor-pointer shadow-sm"
                >
                  <option>Phổ biến nhất</option>
                  <option>Đánh giá cao nhất</option>
                  <option>Học phí thấp nhất</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {paginatedCenters.map((center) => (
              <article 
                key={center.id} 
                className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm transition-all hover:shadow-xl hover:border-primary/20 cursor-pointer"
                onClick={() => navigate(`/center-detail?id=${center.id}`)}
              >
                {/* Image Section */}
                <div className="relative h-56 w-full sm:w-52 shrink-0 overflow-hidden">
                  <img
                    src={center.image}
                    alt={center.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {center.isFeatured && (
                    <div className="absolute left-3 top-3 rounded-full bg-primary/90 backdrop-blur-sm px-3 py-1 text-[10px] font-black text-white uppercase tracking-wider">
                      Nổi bật
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <h2 className="text-lg font-bold text-[#111827] line-clamp-1 group-hover:text-primary transition-colors">
                        {center.name}
                      </h2>
                      <div className="flex items-center gap-1 rounded-lg bg-[#fff7ed] px-2 py-1 text-xs font-black text-[#9a3412] border border-[#ffedd5]">
                        <Star size={14} className="fill-current" />
                        {center.rating}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 mb-4 text-[#6b7280]">
                      <MapPin size={14} />
                      <span className="text-xs font-bold truncate">{center.district}, {center.city}</span>
                    </div>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {center.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className={`rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border transition-colors ${
                            tag.includes("Tiếng Anh") || tag.includes("IELTS")
                            ? "bg-blue-50 text-blue-700 border-blue-100"
                            : tag.includes("Tiếng Nhật") || tag.includes("JLPT")
                            ? "bg-red-50 text-red-700 border-red-100"
                            : "bg-gray-50 text-gray-600 border-gray-100"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                    <div>
                      <span className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-1">Học phí từ</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-primary tracking-tighter">{center.price}</span>
                        <span className="text-[10px] font-bold text-gray-400">/ khóa</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/center-detail?id=${center.id}`); }}
                      className="rounded-xl bg-primary px-5 py-2.5 text-xs font-black text-white transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95"
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredCenters.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Filter size={32} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Không tìm thấy kết quả</h3>
              <p className="text-gray-500 mt-2 max-w-xs text-center font-medium">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm khác để có kết quả tốt hơn.</p>
              <button 
                onClick={clearAllFilters}
                className="mt-8 text-sm font-bold text-primary hover:underline"
              >
                Đặt lại tất cả bộ lọc
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-3">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-current"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-11 w-11 rounded-xl text-sm font-black transition-all ${
                      currentPage === i + 1
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-current"
              >
                <ChevronRight size={20} />
              </button>
            </nav>
          )}
        </main>
      </div>
    </section>
  );
};

export default SearchResultsSection;
