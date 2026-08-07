import { useId, useMemo, useState, useEffect } from "react";
import { ChevronRight, Star, MapPin, Check, ChevronDown, ChevronLeft, Filter } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SearchResultsSection = () => {
  const navigate = useNavigate();
  const locationId = useId();
  const sortId = useId();

  const courseOptions = [
    { id: "IELTS", label: "IELTS" },
    { id: "Giao tiếp cơ bản", label: "Giao tiếp cơ bản" },
    { id: "Giao tiếp cho người đi làm", label: "Giao tiếp cho người đi làm" },
    { id: "Tiếng Anh trẻ em", label: "Tiếng Anh trẻ em" },
    { id: "Tiếng Anh học thuật", label: "Tiếng Anh học thuật" },
    { id: "Tiếng Anh mất gốc", label: "Tiếng Anh mất gốc" },
  ];

  const learningModes = [
    { id: "Tại trung tâm", label: "Tại trung tâm" },
    { id: "Trực tuyến", label: "Trực tuyến" },
  ];

  const [allCenters, setAllCenters] = useState([]);
  const [filteredCenters, setFilteredCenters] = useState([]);
  const getInitialLocation = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const districtQuery = queryParams.get("district");
    if (districtQuery) {
      return `${districtQuery}, Đà Nẵng`;
    }
    return "Tất cả";
  };

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedMode, setSelectedMode] = useState("Tại trung tâm");
  const [priceRange, setPriceRange] = useState(15);
  const [selectedLocation, setSelectedLocation] = useState(getInitialLocation());
  const [selectedSort, setSelectedSort] = useState("Phổ biến nhất");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch data from database.json via json-server
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

    // Handle URL query parameters for auto-checking filters
    const queryParams = new URLSearchParams(window.location.search);
    const categoryQuery = queryParams.get("q");
    if (categoryQuery) {
      // Map home page categories to filter IDs if they differ
      const categoryMap = {
        "Luyện thi IELTS": "IELTS",
        "Tiếng Anh Giao tiếp": "Giao tiếp cơ bản",
        "Tiếng Anh Thương mại": "Giao tiếp cho người đi làm",
        "Tiếng Anh Trẻ em": "Tiếng Anh trẻ em"
      };
      
      const filterIds = categoryQuery.split(",").map(cat => {
        const trimmedCat = cat.trim();
        return categoryMap[trimmedCat] || trimmedCat;
      });
      setSelectedLanguages(filterIds);
    }
  }, []);

  // Filtering Logic
  useEffect(() => {
    let result = allCenters;

    // Filter by Course Category
    if (selectedLanguages.length > 0) {
      result = result.filter((center) =>
        selectedLanguages.some((courseId) =>
          center.tags.some((tag) => tag === courseId)
        )
      );
    }

    // Filter by Location (District)
    if (selectedLocation !== "Tất cả") {
      const district = selectedLocation.split(",")[0].trim();
      result = result.filter((center) => center.district === district);
    }

    // Sorting
    if (selectedSort === "Mới nhất") {
      result = [...result].sort((a, b) => b.id - a.id);
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
    setPriceRange(15);
    setSelectedLocation("Tất cả");
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

            {/* Course Category Filter */}
            <div className="mb-10">
              <h3 className="mb-5 text-[11px] font-black tracking-[0.1em] text-[#6b7280] uppercase">Loại khóa học</h3>
              <div className="flex flex-col gap-3">
                {courseOptions.map((option) => (
                  <label 
                    key={option.id} 
                    className={`flex items-center gap-3 cursor-pointer group p-2 rounded-lg transition-colors ${selectedLanguages.includes(option.id) ? 'bg-primary/5' : 'hover:bg-gray-50'}`}
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="peer appearance-none w-5 h-5 border-2 border-[#e5e7eb] rounded-md checked:border-primary checked:bg-primary transition-all"
                        checked={selectedLanguages.includes(option.id)}
                        onChange={() => handleLanguageChange(option.id)}
                      />
                      <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className={`text-sm font-bold transition-colors ${selectedLanguages.includes(option.id) ? 'text-primary' : 'text-[#4b5563] group-hover:text-primary'}`}>
                      {option.label}
                    </span>
                  </label>
                ))}
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
                  <option value="Quận Hải Châu, Đà Nẵng">Quận Hải Châu</option>
                  <option value="Quận Thanh Khê, Đà Nẵng">Quận Thanh Khê</option>
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
                  <option>Mới nhất</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {paginatedCenters.map((center) => (
              <article 
                key={center.id} 
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                onClick={() => navigate(`/center-detail?id=${center.id}`)}
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  <img
                    src={center.image || "/center-placeholder.png"}
                    alt={center.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {center.isFeatured && (
                      <div className="rounded-full bg-primary/90 backdrop-blur-md px-4 py-1.5 text-[10px] font-black text-white uppercase tracking-widest shadow-lg border border-white/20">
                        Nổi bật
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div></div>
                    <div className="flex items-center gap-1 text-white text-[10px] font-bold uppercase tracking-wider">
                      <MapPin size={12} className="text-secondary" />
                      {center.district.replace("Quận ", "")}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-black text-[#111827] line-clamp-1 group-hover:text-primary transition-colors mb-2">
                      {center.name}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-medium">
                      {center.description || "Trung tâm đào tạo ngoại ngữ uy tín với đội ngũ giáo viên giàu kinh nghiệm."}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {center.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-gray-50 px-2.5 py-1 text-[10px] font-bold text-gray-600 border border-gray-100 uppercase tracking-tight"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-primary tracking-tight">Liên hệ</span>
                    </div>
                    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <ChevronRight size={20} />
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
