import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Sparkles } from "lucide-react";
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

  // Detect if the device is mobile
  const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);

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
      <body class="bg-gray-100 p-4">
        <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-bold mb-2">${college.name}</h3>
          <p class="text-sm mb-1">Area: ${college.area}</p>
          <p class="text-sm mb-4">NIRF: ${college.nirfRanking}</p>
          <div class="chart-container">
            <canvas id="placementChart"></canvas>
          </div>
          <h4 class="text-sm font-semibold mt-4 mb-2">Pre-requisite Courses/Requirements:</h4>
          <ul class="list-disc pl-5 text-sm">
            ${collegeData.preRequisites.map((req) => `<li>${req}</li>`).join("")}
          </ul>
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
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="p-2 sm:px-3"
              >
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Back to Dashboard</span>
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
        <div className="w-full" style={{ height: 'calc(100vh - 64px)' }}>
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
                  <Tooltip className="bg-orange-100 text-orange-800 font-semibold p-2 rounded-lg shadow-md border border-orange-300 max-w-[200px] break-words whitespace-normal text-left text-xs">
                    <div className="space-y-1">
                      <p className="text-xs font-bold">{college.name}</p>
                      <p className="text-xs">Area: {college.area}</p>
                      <p className="text-xs">NIRF Ranking: {college.nirfRanking}</p>
                    </div>
                  </Tooltip>
                  {!isMobile && (
                    <Popup
                      className="p-2 min-w-[200px] max-w-[300px] bg-white rounded-lg shadow-lg"
                      autoPan={true}
                      keepInView={true}
                    >
                      <div className="flex flex-col space-y-3">
                        <div>
                          <h3 className="text-sm font-bold mb-2">{college.name}</h3>
                          <p className="text-xs mb-1">Area: {college.area}</p>
                          <p className="text-xs mb-2">NIRF: {college.nirfRanking}</p>
                        </div>
                        <div className="w-full h-[150px]">
                          <Bar
                            data={collegeData.placementChartData}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              scales: {
                                y: { beginAtZero: true, title: { display: true, text: "LPA" } },
                              },
                              plugins: {
                                legend: { display: true },
                                title: { display: true, text: "Placement Statistics" },
                              },
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold mb-2">Pre-requisite Courses/Requirements:</h4>
                          <ul className="list-disc pl-4 text-xs space-y-1">
                            {collegeData.preRequisites.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Popup>
                  )}
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </main>
    </div>
  );
};

export default CollegeMap;