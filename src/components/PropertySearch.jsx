import React, { useState } from "react";
import axios from "axios";

const PropertySearch = () => {
  const [address, setAddress] = useState("");
  const [propertyData, setPropertyData] = useState(null);
  const [error, setError] = useState("");

  
  const apiUrl = import.meta.env.VITE_API_BASE_URL_1;

  
  const fetchPropertyData = async (searchAddress) => {
    try {
      setError("");
      setPropertyData(null);

      
      const encodedAddress = encodeURIComponent(searchAddress);
      const searchUrl = `${apiUrl}/search?helpers[]=geosearch-v2&helpers[]=bbl&helpers[]=neighborhood&helpers[]=zoning-district&helpers[]=zoning-map-amendment&helpers[]=special-purpose-district&helpers[]=commercial-overlay&q=${encodedAddress}`;

      console.log("Fetching data from URL:", searchUrl);

      
      const response = await axios.get(searchUrl);
      console.log("API Response:", response.data);

      if (response.data.length === 0) {
        setError("Address not found");
        return;
      }

      const result = response.data[0];
      const bbl = result.bbl;

      if (!bbl) {
        setError("BBL not found for the given address");
        return;
      }
      console.log("Found BBL:", bbl);

      
      const propertyUrl = `https://planninglabs.carto.com/api/v2/sql?q=SELECT address, bbl, bldgarea, lotarea, numfloors FROM dcp_mappluto WHERE bbl = '${bbl}'`;
      const propertyResponse = await axios.get(propertyUrl);
      const property = propertyResponse.data.rows[0];

      if (property) {
        setPropertyData(property);
      } else {
        setError("Property details not found");
      }
    } catch (err) {
      console.error("Error fetching property details:", err);
      setError("Failed to fetch property details");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (address.trim()) {
      fetchPropertyData(address);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Property Search</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address (e.g., 93-08 DITMARS BOULEVARD, 11369)"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {error && <div className="text-red-500 mt-4">{error}</div>}
      {propertyData && (
        <div className="mt-6 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Property Details</h2>
          <p>
            <strong>Address:</strong> {propertyData.address}
          </p>
          <p>
            <strong>Building Area:</strong> {propertyData.bldgarea} sq ft
          </p>
          <p>
            <strong>Lot Area:</strong> {propertyData.lotarea} sq ft
          </p>
          <p>
            <strong>Number of Floors:</strong> {propertyData.numfloors}
          </p>

          
          {propertyData.bldgarea && propertyData.lotarea && (
            <p>
              <strong>FAR (Floor Area Ratio):</strong>{" "}
              {(propertyData.bldgarea / propertyData.lotarea).toFixed(2)}
            </p>
          )}

        
          {propertyData.numfloors && (
            <p>
              <strong>Estimated Building Height:</strong>{" "}
              {propertyData.numfloors * 10 + 2} feet
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertySearch;
