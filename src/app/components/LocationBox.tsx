'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';

const LocationBox = ({ location , setLocation}) => {
  const [filter, setFilter] = useState('');

  const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={16} fill="#FF5D00">
      <path d="M256 0c17.7 0 32 14.3 32 32v34.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32h-34.7C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32v-34.7C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h34.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zm-128 256a128 128 0 1 0 256 0 128 128 0 1 0-256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/>
    </svg>
  );

  const stations = [
    {
      line: "Western Line",
      stations: [
        "Churchgate", "Marine Lines", "Charni Road", "Grant Road", "Mumbai Central",
        "Mahalaxmi", "Lower Parel", "Prabhadevi", "Dadar", "Matunga Road",
        "Mahim Junction", "Bandra", "Khar Road", "Santacruz", "Vile Parle",
        "Andheri", "Jogeshwari", "Ram Mandir", "Goregaon", "Malad",
        "Kandivali", "Borivali", "Dahisar", "Mira Road", "Bhayandar",
        "Naigaon", "Vasai Road", "Nallasopara", "Virar", "Vaitarna",
        "Saphale", "Kelve Road", "Palghar", "Umroli", "Boisar", "Vangaon",
        "Dahanu Road"
      ]
    },
    {
      line: "Central Line",
      stations: [
        "Chhatrapati Shivaji Maharaj Terminus (CSMT)", "Masjid", "Sandhurst Road",
        "Byculla", "Chinchpokli", "Currey Road", "Parel", "Dadar", "Matunga",
        "Sion", "Kurla", "Vidyavihar", "Ghatkopar", "Vikhroli", "Kanjurmarg",
        "Bhandup", "Nahur", "Mulund", "Thane", "Kalwa", "Mumbra", "Diva Junction",
        "Dombivli", "Thakurli", "Kalyan Junction", "Vithalwadi", "Ulhasnagar",
        "Ambernath", "Badlapur", "Vangani", "Shelu", "Neral", "Bhivpuri Road",
        "Karjat", "Palasdhari", "Kelavli", "Dolavli", "Lowjee", "Khopoli",
        "Shahad", "Ambivli", "Titwala", "Khadavli", "Vasind", "Asangaon",
        "Atgaon", "Thansit", "Khardi", "Umbermali", "Kasara"
      ]
    },
    {
      line: "Harbour Line",
      stations: [
        "Chhatrapati Shivaji Maharaj Terminus (CSMT)", "Masjid", "Sandhurst Road",
        "Dockyard Road", "Reay Road", "Cotton Green", "Sewri", "Vadala Road",
        "King's Circle", "Mahim Junction", "Bandra", "Khar Road", "Santacruz",
        "Vile Parle", "Andheri", "Jogeshwari", "Ram Mandir", "Goregaon",
        "GTB Nagar", "Chunabhatti", "Kurla", "Tilak Nagar", "Chembur",
        "Govandi", "Mankhurd", "Vashi", "Sanpada", "Juinagar", "Nerul",
        "Seawoods-Darave", "CBD Belapur", "Kharghar", "Mansarovar",
        "Khandeshwar", "Panvel"
      ]
    },
    {
      line: "Trans-Harbour Line",
      stations: [
        "Thane", "Airoli", "Rabale", "Ghansoli", "Koparkhairane", "Turbhe",
        "Sanpada", "Vashi", "Juinagar", "Nerul", "Seawoods-Darave",
        "CBD Belapur", "Kharghar", "Bamandongri", "Kharkopar"
      ]
    },
    {
      line: "Nerul-Uran Line",
      stations: [
        "Nerul", "Seawoods-Darave", "Bamandongri", "Kharkopar"
      ]
    }
  ];

  const filteredStations = stations.map(line => ({
    line: line.line,
    stations: line.stations.filter(station =>
      station.toLowerCase().includes(filter.toLowerCase())
    )
  })).filter(line => line.stations.length > 0);

  const handleSetLocation = (station) => {
    Cookies.set('location', station, { expires: 7 }); // Set cookie for 7 days
    setFilter(''); // Clear filter after selection
    setLocation(station)
  };

  return (
    <div className={`flex flex-col gap-4 w-[70%] lg:w-[20%] bg-white fixed z-[999999999999999999999999] lg:top-[20vh] top-[30vh] left-[15%] lg:left-[40%] p-4 rounded-lg shadow-lg ${location ? "hidden" : "block"}`}>
      <div className="flex items-center gap-4">
       
        <input
          type="text"
          placeholder="Filter stations..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <div className="max-h-48 overflow-y-auto border rounded-md">
        {filteredStations.length > 0 ? (
          filteredStations.map((line, index) => (
            <div key={index}>
              <div className="px-2 py-1 text-sm font-semibold text-gray-600 bg-gray-100">{line.line}</div>
              {line.stations.map((station, stationIndex) => (
                <div key={`${index}-${stationIndex}`} className="flex items-center justify-between px-2 py-1 hover:bg-gray-50">
                  <span className="text-gray-700">{station}</span>
                  <button
                    onClick={() => handleSetLocation(station)}
                    className="px-2 py-1 text-sm text-white bg-orange-500 rounded hover:bg-orange-600"
                  >
                    Set Location
                  </button>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="px-2 py-1 text-gray-500">No stations found</div>
        )}
      </div>
    </div>
  );
};

export default LocationBox;