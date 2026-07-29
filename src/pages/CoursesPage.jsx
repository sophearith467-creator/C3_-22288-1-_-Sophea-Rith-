import { useState, useEffect } from 'react';
import { BASE_URL } from '../api';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // S4.1 & S4.2: Fetch courses on mount and whenever `searchQuery` changes
  useEffect(() => {
    let isMounted = true;

    async function fetchCourses() {
      try {
        setLoading(true);
        setError('');

        // S4.2: Append ?search=<text> query parameter if input is not empty
        const url = searchQuery.trim()
          ? `${BASE_URL}/courses?search=${encodeURIComponent(searchQuery.trim())}`
          : `${BASE_URL}/courses`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Failed to load courses');
        }

        const data = await res.json();
        if (isMounted) {
          setCourses(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  return (
    <section className="max-w-4xl mx-auto p-2 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Courses Catalog</h2>
        <p className="text-sm text-slate-500 mt-1">
          Explore available courses, track remaining seats, and view fees.
        </p>
      </div>

      {/* S4.2: Search Bar Input */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex gap-3 items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses by name or code..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-150"
          />
        </div>
      </div>

      {/* S4.1: Display "Loading..." while request is pending */}
      {loading && (
        <div className="flex items-center justify-center p-8 bg-white rounded-xl border border-slate-200 shadow-xs text-slate-600 font-medium text-sm gap-3">
          <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-sm font-medium flex items-center gap-2.5 shadow-2xs">
          <svg className="w-5 h-5 text-rose-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Courses Table */}
      {!loading && !error && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide">Available Courses</h3>
            <span className="text-xs font-semibold text-slate-500">
              {courses.length} {courses.length === 1 ? 'course' : 'courses'} found
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm text-slate-700">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <th scope="col" className="px-5 py-3.5 border-r border-slate-200/80">ID</th>
                  <th scope="col" className="px-5 py-3.5 border-r border-slate-200/80">Course Name</th>
                  <th scope="col" className="px-5 py-3.5 border-r border-slate-200/80">Capacity</th>
                  <th scope="col" className="px-5 py-3.5 border-r border-slate-200/80">Seats Left</th>
                  <th scope="col" className="px-5 py-3.5">Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <tr
                      key={course.id}
                      className={index % 2 === 0 ? 'bg-white hover:bg-slate-50/80' : 'bg-slate-50/50 hover:bg-slate-100/60'}
                    >
                      <td className="px-5 py-3.5 border-r border-slate-200/70 font-mono text-xs font-semibold text-indigo-600">
                        #{course.id}
                      </td>
                      <td className="px-5 py-3.5 border-r border-slate-200/70 font-semibold text-slate-800">
                        {course.name}
                      </td>
                      <td className="px-5 py-3.5 border-r border-slate-200/70 text-slate-600 font-medium">
                        {course.capacity}
                      </td>
                      <td className="px-5 py-3.5 border-r border-slate-200/70 font-medium">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            (course.seatsLeft ?? course.availableSeats ?? 0) > 0
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {course.seatsLeft ?? course.availableSeats ?? 0} left
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-bold text-slate-900">
                        ${course.fee}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-slate-500">
                      No courses found matching "{searchQuery}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}