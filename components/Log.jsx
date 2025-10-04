"use client";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import dayjs from "dayjs";
import { supabase } from "../lib/supabase";

export default function Log({ onClose, user }) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchRows = async () => {
      if (!user) return;
      setFetching(true);
      const { data, error } = await supabase
        .from("sprints")
        .select("id, category, start_time_utc, end_time_utc")
        .order("start_time_utc", { ascending: false })
        .limit(200);
      if (!error) setRows(data ?? []);
      setFetching(false);
    };
    fetchRows();
  }, [user]);

  const signInWithMagicLink = async (e) => {
    e?.preventDefault?.();
    if (!email) return;
    setLoading(true);
    const redirectTo =
      typeof window !== "undefined" ? window.location.origin : undefined;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    setLoading(false);
    if (!error) setEmailSent(true);
    else console.error(error);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-center" role="dialog" aria-modal="true">
        <div className="modal-card">
          {/* Header */}
          <div className="modal-header">
            <div className="modal-title">{user ? "Sprint Log" : "Sign in"}</div>
            <button
              className="text-neutral-300 hover:text-white"
              onClick={onClose}
              aria-label="Close"
              title="Close"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {!user ? (
              <form
                onSubmit={signInWithMagicLink}
                className="max-w-sm mx-auto space-y-3 p-4"
              >
                <label className="block text-sm text-neutral-300">
                  Enter your email to receive a magic link.
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-text"
                />
                <button
                  type="submit"
                  disabled={loading || emailSent}
                  className="btn btn-primary w-full"
                >
                  {emailSent
                    ? "Email Sent!"
                    : loading
                      ? "Sending…"
                      : "Send Link"}
                </button>
              </form>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Your sprints</h2>
                  <button onClick={signOut} className="btn btn-ghost text-sm">
                    Sign out
                  </button>
                </div>

                <div className="table-wrap max-h-[60vh] overflow-y-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="th w-[46%]">When</th>
                        <th className="th w-[26%]">Category</th>
                        <th className="th w-[28%]">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetching ? (
                        <tr>
                          <td className="center-muted" colSpan={3}>
                            Loading…
                          </td>
                        </tr>
                      ) : rows.length === 0 ? (
                        <tr>
                          <td className="center-muted" colSpan={3}>
                            No sprints yet.
                          </td>
                        </tr>
                      ) : (
                        rows.map((r, i) => {
                          const start = Number(r.start_time_utc);
                          const end = Number(r.end_time_utc);
                          const mins = Math.max(
                            0,
                            Math.round((end - start) / 60000),
                          );
                          return (
                            <tr key={r.id} className="tr-odd">
                              <td className="td code">
                                {dayjs(start).format("YYYY-MM-DD HH:mm")}
                              </td>
                              <td className="td capitalize">
                                {r.category.replace("_", " ")}
                              </td>
                              <td className="td code">{mins} min</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
