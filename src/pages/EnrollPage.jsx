import React from 'react';

export default function EnrollPage() {
  return (
    <section className="max-w-xl mx-auto p-2 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Enroll a Student</h2>
        <p className="text-sm text-slate-500 mt-1">
          Select a course and enter the student ID to create a new active enrollment.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          {/* Labeled Student ID Input */}
          <div>
            <label htmlFor="studentId" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Student ID
            </label>
            <input
              id="studentId"
              type="number"
              placeholder="e.g., 101"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-150"
            />
          </div>

          {/* Labeled Course Select */}
          <div>
            <label htmlFor="courseSelect" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Course
            </label>
            <div className="relative">
              <select
                id="courseSelect"
                defaultValue="1"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-150 cursor-pointer appearance-none"
              >
                <option value="1">Sample Course One ($120) — 18 seats left</option>
                <option value="2">Sample Course Two ($200) — 0 seats left</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button with Hover State */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-2.5 px-4 rounded-lg text-sm shadow-xs transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            Enroll Student
          </button>
        </form>

        {/* ⚠️ REQUIRED FOR S3.2: BOTH BOXES HARDCODED & VISIBLE */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
          {/* Green Success Box */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm font-medium flex items-center gap-2.5 shadow-2xs">
            <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Successfully enrolled student in the course!</span>
          </div>

          {/* Red Error Box */}
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-sm font-medium flex items-center gap-2.5 shadow-2xs">
            <svg className="w-5 h-5 text-rose-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>Failed to enroll: No available seats or invalid student ID.</span>
          </div>
        </div>
      </div>
    </section>
  );
}