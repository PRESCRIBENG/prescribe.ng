"use client";

import { useState, useEffect } from "react";

interface Pharmacy {
  pharmacy: string;
  proprietaryName: string;
  unitPrice: string;
  address: string;
  distance: string;
  lat: string;
  lng: string;
}

const PrescriptionSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const [pharmacies, setPharmacies] = useState<Pharmacy[] | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  // Get user location
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      (err) => console.error("Location error:", err.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError("Please enter a reference ID");
      return;
    }
    if (!lat || !lng) {
      setError("Location data missing!");
      return;
    }

    setIsSearching(true);
    setError("");
    setPharmacies(null);

    try {
      const url = `https://gelataskia.prescribe.ng/web/search_prescription_item?q=${encodeURIComponent(
        //const url = `http://127.0.0.1:5002/web/search_prescription_item?q=${encodeURIComponent(
        searchQuery
      )}&lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setPharmacies(data.pharmacies); // ✅ Access the array correctly
      } else {
        setError("Item not found or invalid.");
        setPharmacies([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred. Please try again.");
      setPharmacies([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="overflow-hidden bg-[#F5F5F5] mt-20 text-[16px]">
      <div className="p-8 md:p-16 lg:p-[130px]">
        <div className="flex flex-col items-center space-y-8">
          <div className="bg-white space-y-6 w-full max-w-3xl rounded-lg shadow-sm">
            <form className="w-full px-8 py-8 space-y-8" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  Enter prescription item
                </label>
                <input
                  type="text"
                  placeholder="Enter prescription item"
                  value={searchQuery}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                />
              </div>

              {error && <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>}

              <button
                type="submit"
                disabled={isSearching}
                className="w-full bg-[#FF6B00] text-white py-2 rounded-md font-semibold hover:bg-[#e65b00]"
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </form>

            <div className="p-8 w-full overflow-x-auto text-[#002A40]">
              {pharmacies !== null && (
                pharmacies.length === 0 ? (
                  <div className="text-gray-700">No results found.</div>
                ) : (
                  <table className="w-full border border-gray-300 table-auto">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Pharmacy</th>
                        <th className="border px-4 py-2">Medication</th>
                        <th className="border px-4 py-2">Unit Price</th>
                        <th className="border px-4 py-2">Address</th>
                        <th className="border px-4 py-2">Distance</th>
                        <th className="border px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {pharmacies.map((p, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="border px-4 py-2">{p.pharmacy}</td>
                          <td className="border px-4 py-2">{p.proprietaryName}</td>
                          <td className="border px-4 py-2">{p.unitPrice}</td>
                          <td className="border px-4 py-2">{p.address}</td>
                          <td className="border px-4 py-2">{p.distance}</td>
                          <td className="border px-4 py-2">
                            {p.lat && p.lng ? (
                              <button
                                onClick={() => {
                                  window.open(
                                    `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`,
                                    '_blank'
                                  );
                                }}
                                className="bg-[#FF6B00] text-white px-2 py-1 rounded hover:bg-[#e65b00] text-sm"
                              >
                                Open Map
                              </button>
                            ) : (
                              <span className="text-gray-400 text-sm">No location</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionSearch;
