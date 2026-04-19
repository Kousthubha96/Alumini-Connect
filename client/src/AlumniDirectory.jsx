import React, { useEffect, useState } from "react";

function AlumniDirectory() {
  const [alumni, setAlumni] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  // -------------------------
  // FETCH FROM API
  // -------------------------
  useEffect(() => {
    fetch("http://localhost:5000/api/alumni")
      .then((res) => res.json())
      .then((data) => {
        setAlumni(data);
        setFiltered(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // -------------------------
  // SEARCH
  // -------------------------
  const handleSearch = (value) => {
    setSearch(value);

    const result = alumni.filter((a) =>
      a.name.toLowerCase().includes(value.toLowerCase()) ||
      a.branch.toLowerCase().includes(value.toLowerCase()) ||
      a.company.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(result);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Alumni Directory</h1>

      {/* SEARCH BOX */}
      <input
        type="text"
        placeholder="Search alumni..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((a) => (
          <div key={a._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{a.name}</h2>
            <p>{a.branch}</p>
            <p>{a.batch}</p>
            <p>{a.email}</p>
            <p>{a.company}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlumniDirectory;