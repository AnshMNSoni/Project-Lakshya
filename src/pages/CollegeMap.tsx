import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Sparkles, BookOpen, Search, Filter, MoreHorizontal } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import "leaflet/dist/leaflet.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

// Fix for default marker icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const defaultCenter: LatLngTuple = [23.0225, 72.5714]; // Ahmedabad, India

interface College {
  id: string;
  name: string;
  lat: number;
  lon: number;
  area: string;
  nirfRanking?: string;
}

interface CollegeData {
  placementChartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  preRequisites: string[];
}

const CollegeMap: React.FC = () => {
  const navigate = useNavigate();
  const [center, setCenter] = useState<LatLngTuple>(defaultCenter);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if the device is mobile and update on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // College data with NIRF rankings and placement info
  const collegeDataMap: { [key: string]: { nirfRanking: string; placement: CollegeData['placementChartData']; preRequisites: string[] } } = {
    "Nirma University": {
      nirfRanking: "Management: 53 (Score: 53.48), Pharmacy: 32 (Score: 57.08), Law: 33 (Score: 53.70)",
      placement: {
        labels: ["Average Package", "Highest Package"],
        datasets: [
          {
            label: "Placement (in LPA)",
            data: [7.5, 42],
            backgroundColor: "rgba(255, 159, 64, 0.6)",
          },
        ],
      },
      preRequisites: [
        "Class 12 with at least 45% in PCM (40% for SC/ST)",
        "JEE Main or GUJCET qualified",
        "Admission through ACPC for Gujarat seats",
      ],
    },
    "Pandit Deendayal Energy University": {
      nirfRanking: "Engineering: 98 (Score: 45.97), Management: 89 (Score: 46.81)",
      placement: {
        labels: ["Average Package", "Highest Package"],
        datasets: [
          {
            label: "Placement (in LPA)",
            data: [7.5, 42],
            backgroundColor: "rgba(255, 159, 64, 0.6)",
          },
        ],
      },
      preRequisites: ["Class 12 with at least 45% in PCM/PCB (40% for SC/ST)", "JEE Main mandatory"],
    },
    "Indian Institute of Management Ahmedabad": {
      nirfRanking: "Management: 1 (Score: 83.29)",
      placement: {
        labels: ["Average Package", "Highest Package"],
        datasets: [
          {
            label: "Placement (in LPA)",
            data: [34.36, 115],
            backgroundColor: "rgba(255, 159, 64, 0.6)",
          },
        ],
      },
      preRequisites: ["Bachelor's degree with at least 50% marks", "CAT/GMAT qualified", "Minimum age 24 for PGPX"],
    },
  };

  // Default college data for unmapped colleges
  const defaultCollegeData: CollegeData = {
    placementChartData: {
      labels: ["Average Package", "Highest Package"],
      datasets: [
        {
          label: "Placement (in LPA)",
          data: [0, 0],
          backgroundColor: "rgba(255, 159, 64, 0.6)",
        },
      ],
    },
    preRequisites: ["No data available"],
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: LatLngTuple = [position.coords.latitude, position.coords.longitude];
          setCenter(userLocation);
          setLoading(false);
        },
        (err) => {
          setError("Unable to get your location. Using Ahmedabad as default.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported by this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchColleges = async () => {
      if (loading) return;
      try {
        const query = `
          [out:json];
          (
            node(around:20000,${center[0]},${center[1]})["amenity"~"university|college"];
            way(around:20000,${center[0]},${center[1]})["amenity"~"university|college"];
            rel(around:20000,${center[0]},${center[1]})["amenity"~"university|college"];
          );
          out body center;
        `;
        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: query,
        });
        const data = await response.json();

        const collegesData: College[] = data.elements
          .map((element: any) => {
            const name = element.tags.name || "Unnamed College/University";
            const collegeInfo = collegeDataMap[name];
            return {
              id: element.type + "/" + element.id,
              name,
              lat: element.lat || element.center?.lat,
              lon: element.lon || element.center?.lon,
              area: element.tags["addr:neighbourhood"] || element.tags["addr:suburb"] || element.tags["addr:city"] || element.tags["addr:district"] || "Unknown Area",
              nirfRanking: collegeInfo?.nirfRanking || "Not ranked in NIRF",
            };
          })
          .filter((college) => college.lat && college.lon);

        setColleges(collegesData);
      } catch (err) {
        setError("Failed to fetch colleges from OpenStreetMap.");
        console.error(err);
      }
    };

    fetchColleges();
  }, [center, loading]);

  const UpdateMapCenter: React.FC<{ center: LatLngTuple }> = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 12);
    }, [center, map]);
    return null;
  };

  const getCollegeData = (name: string): CollegeData => {
    const data = collegeDataMap[name];
    if (!data) return defaultCollegeData;
    
    return {
      placementChartData: data.placement,
      preRequisites: data.preRequisites
    };
  };

  // Function to generate HTML content for new tab
  const openCollegeDetailsInNewTab = (college: College, collegeData: CollegeData) => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${college.name} Details</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
          body { font-family: 'Arial', sans-serif; }
          .chart-container { width: 100%; max-width: 400px; height: 200px; }
        </style>
      </head>
      <body class="bg-gray-100 p-2 sm:p-4">
        <div class="mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <!-- Header with close button -->
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg sm:text-xl font-bold text-gray-800">${college.name}</h3>
            <button onclick="window.close()" class="text-gray-500 hover:text-gray-700 text-xl font-bold">&times;</button>
          </div>
          
          <!-- College Info -->
          <div class="mb-4 p-3 bg-gray-50 rounded-lg">
            <p class="text-sm mb-2"><strong>Area:</strong> ${college.area}</p>
            <p class="text-sm mb-2"><strong>NIRF Ranking:</strong> ${college.nirfRanking}</p>
          </div>
          
          <!-- Chart -->
          <div class="mb-6">
            <h4 class="text-base font-semibold mb-3 text-gray-800">Placement Statistics</h4>
            <div class="chart-container bg-white p-2 rounded border">
              <canvas id="placementChart"></canvas>
            </div>
          </div>
          
          <!-- Prerequisites -->
          <div class="mb-4">
            <h4 class="text-base font-semibold mb-3 text-gray-800">Pre-requisite Courses/Requirements:</h4>
            <div class="bg-blue-50 p-3 rounded-lg">
              <ul class="list-disc pl-5 text-sm space-y-1">
                ${collegeData.preRequisites.map((req) => `<li class="text-gray-700">${req}</li>`).join("")}
              </ul>
            </div>
          </div>
          
          <!-- Mobile-friendly close button -->
          <div class="text-center mt-6">
            <button onclick="window.close()" class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium">
              Close Window
            </button>
          </div>
        </div>
        <script>
          const ctx = document.getElementById('placementChart').getContext('2d');
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ${JSON.stringify(collegeData.placementChartData.labels)},
              datasets: ${JSON.stringify(collegeData.placementChartData.datasets)}
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: { y: { beginAtZero: true, title: { display: true, text: 'LPA' } } },
              plugins: { legend: { display: true }, title: { display: true, text: 'Placement Statistics' } }
            }
          });
        </script>
      </body>
      </html>
    `;
    const newWindow = window.open("", "_blank");
    newWindow?.document.write(htmlContent);
    newWindow?.document.close();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-effect border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="p-2 sm:px-3"
              >
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold font-space-grotesk gradient-text">
                  College Explorer
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-center">
            <p className="font-semibold text-sm">{error}</p>
          </div>
        )}
        <div 
          className="w-full" 
          style={{ 
            height: isMobile ? '70vh' : 'calc(100vh - 64px)' 
          }}
        >
          <MapContainer
            center={center}
            zoom={12}
            style={{ width: "100%", height: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <UpdateMapCenter center={center} />
            <Marker position={center}>
              <Popup>You are here</Popup>
              <Tooltip className="bg-orange-100 text-orange-800 font-semibold p-2 rounded-lg shadow-md border border-orange-300 max-w-[150px] break-words whitespace-normal text-left text-xs">
                Your Location
              </Tooltip>
            </Marker>
            {colleges.map((college) => {
              const collegeData = getCollegeData(college.name);
              return (
                <Marker
                  key={college.id}
                  position={[college.lat, college.lon]}
                  eventHandlers={
                    isMobile
                      ? {
                          click: () => openCollegeDetailsInNewTab(college, collegeData),
                        }
                      : undefined
                  }
                >
                  <Tooltip className={`bg-orange-100 text-orange-800 font-semibold p-2 rounded-lg shadow-md border border-orange-300 break-words whitespace-normal text-left text-xs ${isMobile ? 'max-w-[150px]' : 'max-w-[200px]'}`}>
                    <div className="space-y-1">
                      <p className="text-xs font-bold">{college.name}</p>
                      <p className="text-xs">Area: {college.area}</p>
                      <p className="text-xs">NIRF: {college.nirfRanking.length > 50 && isMobile ? college.nirfRanking.substring(0, 50) + '...' : college.nirfRanking}</p>
                      {isMobile && (
                        <p className="text-xs text-orange-600 font-medium">Tap for details</p>
                      )}
                    </div>
                  </Tooltip>
                  {!isMobile && (
                    <Popup
                      className="min-w-[350px] max-w-[400px]"
                      autoPan={true}
                      keepInView={true}
                    >
                      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-xl border border-gray-200">
                        {/* Header */}
                        <div className="border-b border-gray-200 pb-3 mb-3">
                          <h3 className="text-lg font-bold text-gray-800 mb-1">{college.name}</h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{college.area}</span>
                          </div>
                        </div>

                        {/* College Info Cards */}
                        <div className="space-y-3 mb-4">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <h4 className="text-sm font-semibold text-blue-800 mb-1">NIRF Ranking</h4>
                            <p className="text-xs text-blue-700">{college.nirfRanking}</p>
                          </div>
                        </div>

                        {/* Placement Chart */}
                        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
                          <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                            <Sparkles className="w-4 h-4 mr-1 text-orange-500" />
                            Placement Statistics
                          </h4>
                          <div className="w-full h-[120px]">
                            <Bar
                              data={collegeData.placementChartData}
                              options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                  y: { 
                                    beginAtZero: true, 
                                    title: { display: true, text: "LPA" },
                                    grid: { color: 'rgba(0,0,0,0.1)' }
                                  },
                                  x: {
                                    grid: { display: false }
                                  }
                                },
                                plugins: {
                                  legend: { display: false },
                                  title: { display: false },
                                },
                              }}
                            />
                          </div>
                        </div>

                        {/* Prerequisites */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            Requirements
                          </h4>
                          <ul className="text-xs text-green-700 space-y-1">
                            {collegeData.preRequisites.slice(0, 3).map((req, index) => (
                              <li key={index} className="flex items-start">
                                <span className="w-1 h-1 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                          {collegeData.preRequisites.length > 3 && (
                            <p className="text-xs text-green-600 mt-2 font-medium">
                              +{collegeData.preRequisites.length - 3} more requirements
                            </p>
                          )}
                        </div>

                        {/* Action Button */}
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <button 
                            onClick={() => openCollegeDetailsInNewTab(college, collegeData)}
                            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            View Full Details
                          </button>
                        </div>
                      </div>
                    </Popup>
                  )}
                </Marker>
              );
            })}
          </MapContainer>
        </div>
        
        {/* Mobile Instructions */}
        {isMobile && (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-t border-orange-200 p-4">
            <div className="max-w-sm mx-auto text-center">
              <h3 className="text-sm font-semibold text-orange-800 mb-2">How to Use</h3>
              <div className="space-y-2 text-xs text-orange-700">
                <p className="flex items-center justify-center gap-2">
                  <MapPin className="w-3 h-3" />
                  Tap on college markers to view details
                </p>
                <p className="flex items-center justify-center gap-2">
                  <ArrowLeft className="w-3 h-3" />
                  Use the back button to return to dashboard
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CollegeMap;