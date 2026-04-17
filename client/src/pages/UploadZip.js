import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadZip() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.name.endsWith(".zip")) {
      setError("Sirf .zip file upload karo");
      return;
    }
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("File 50MB se chhoti honi chahiye");
      return;
    }
    setFile(selectedFile);
    setError("");
    setResult(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const upload = async () => {
    if (!file) { setError("Pehle ZIP file chunno"); return; }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:5000/upload/zip",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResult(res.data);
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Upload mein error aaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate("/")}>← Back</button>
        <h2 style={s.title}>ZIP Upload</h2>
        <div style={{ width: 60 }} />
      </div>

      <div style={s.content}>
        {/* Info Card */}
        <div style={s.infoCard}>
          <div style={s.infoTitle}>ZIP Structure kaisi honi chahiye:</div>
          <div style={s.codeBlock}>
            <div style={s.codeLine}>📦 students.zip</div>
            <div style={s.codeLine}>├── 📊 students.xlsx</div>
            <div style={s.codeLine}>└── 📁 photos/</div>
            <div style={s.codeLine}>{"    "}├── 21IT001.jpg</div>
            <div style={s.codeLine}>{"    "}├── 21IT002.jpg</div>
            <div style={s.codeLine}>{"    "}└── 21IT003.jpg</div>
          </div>
          <div style={s.infoNote}>
            ⚠ Photo ka naam = Roll Number (jaise 21IT001.jpg)
          </div>
          <div style={s.infoNote}>
            ⚠ Excel mein columns: Name, Roll No, Department, Semester, Password
          </div>
        </div>

        {/* Upload Area */}
        <div
          style={{
            ...s.dropZone,
            ...(dragOver ? s.dropZoneActive : {}),
            ...(file ? s.dropZoneFilled : {}),
          }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => document.getElementById("zip-input").click()}
        >
          <input
            id="zip-input"
            type="file"
            accept=".zip"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])}
          />

          {file ? (
            <>
              <div style={s.fileIcon}>📦</div>
              <div style={s.fileName}>{file.name}</div>
              <div style={s.fileSize}>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </div>
              <div style={s.changeFile}>Change karo</div>
            </>
          ) : (
            <>
              <div style={s.uploadIcon}>⬆</div>
              <div style={s.uploadText}>ZIP file yahan drop karo</div>
              <div style={s.uploadSub}>ya click karke select karo</div>
            </>
          )}
        </div>

        {/* Error */}
        {error && <div style={s.errorBanner}>{error}</div>}

        {/* Upload Button */}
        {file && !result && (
          <button
            style={{ ...s.uploadBtn, opacity: loading ? 0.7 : 1 }}
            onClick={upload}
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <span style={s.btnSpinner} /> Upload ho raha hai...
              </span>
            ) : (
              "Upload & Import Karo"
            )}
          </button>
        )}

        {/* Result */}
        {result && (
          <div style={s.resultCard}>
            <div style={s.resultTitle}>✓ Upload Complete!</div>

            {/* Stats */}
            <div style={s.resultStats}>
              <div style={s.resultStat("#e8f5e9", "#2e7d32")}>
                <div style={s.resultNum("#2e7d32")}>{result.added}</div>
                <div style={s.resultLbl}>Added</div>
              </div>
              <div style={s.resultStat("#fff8e1", "#f57f17")}>
                <div style={s.resultNum("#f57f17")}>{result.skipped}</div>
                <div style={s.resultLbl}>Skipped</div>
              </div>
              <div style={s.resultStat("#ffebee", "#c62828")}>
                <div style={s.resultNum("#c62828")}>{result.failed}</div>
                <div style={s.resultLbl}>Failed</div>
              </div>
            </div>

            {/* Added list */}
            {result.details?.added?.length > 0 && (
              <div style={s.detailSection}>
                <div style={s.detailTitle("#2e7d32")}>Successfully Added:</div>
                {result.details.added.map((s, i) => (
                  <div key={i} style={s_list.addedRow}>
                    <span style={s_list.roll}>{s.rollNumber}</span>
                    <span style={s_list.name}>{s.name}</span>
                    <span style={s_list.photo}>{s.hasPhoto ? "📷" : "—"}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Skipped list */}
            {result.details?.skipped?.length > 0 && (
              <div style={s.detailSection}>
                <div style={s.detailTitle("#f57f17")}>Already Existed (Skipped):</div>
                {result.details.skipped.map((s, i) => (
                  <div key={i} style={s_list.skippedRow}>
                    <span style={s_list.roll}>{s.rollNumber}</span>
                    <span style={s_list.name}>{s.name}</span>
                  </div>
                ))}
              </div>
            )}

            <button style={s.doneBtn} onClick={() => navigate("/")}>
              Dashboard pe jao
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f5f5f5", fontFamily: "inherit" },
  header: {
    background: "#1a1a2e", padding: "14px 20px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    position: "sticky", top: 0, zIndex: 10,
  },
  backBtn: { background: "none", border: "none", color: "#aaa", fontSize: 14, cursor: "pointer" },
  title: { fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 },
  content: { maxWidth: 520, margin: "0 auto", padding: "20px 16px" },
  infoCard: {
    background: "#fff", borderRadius: 14, padding: "16px",
    marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  infoTitle: { fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 10 },
  codeBlock: {
    background: "#1a1a2e", borderRadius: 10, padding: "12px 16px",
    marginBottom: 10,
  },
  codeLine: { fontSize: 13, color: "#a8d8a8", fontFamily: "monospace", lineHeight: 1.8 },
  infoNote: { fontSize: 12, color: "#f57f17", marginTop: 6 },
  dropZone: {
    border: "2px dashed #d0d0d0", borderRadius: 16,
    padding: "40px 20px", textAlign: "center",
    cursor: "pointer", background: "#fff",
    marginBottom: 14, transition: "all 0.2s",
  },
  dropZoneActive: { border: "2px dashed #1565c0", background: "#e3f2fd" },
  dropZoneFilled: { border: "2px solid #4caf50", background: "#f1f8f1" },
  uploadIcon: { fontSize: 40, marginBottom: 10 },
  uploadText: { fontSize: 15, fontWeight: 600, color: "#1a1a2e", marginBottom: 6 },
  uploadSub: { fontSize: 13, color: "#aaa" },
  fileIcon: { fontSize: 40, marginBottom: 8 },
  fileName: { fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 },
  fileSize: { fontSize: 13, color: "#888", marginBottom: 6 },
  changeFile: { fontSize: 12, color: "#1565c0", textDecoration: "underline" },
  errorBanner: {
    background: "#ffebee", color: "#c62828",
    padding: "10px 14px", borderRadius: 8,
    fontSize: 13, fontWeight: 500, marginBottom: 14,
  },
  uploadBtn: {
    width: "100%", padding: "15px 0",
    background: "#1a1a2e", color: "#fff",
    border: "none", borderRadius: 12,
    fontSize: 16, fontWeight: 700, cursor: "pointer",
    marginBottom: 16,
  },
  btnSpinner: {
    width: 18, height: 18,
    border: "3px solid rgba(255,255,255,0.3)",
    borderTop: "3px solid #fff",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.8s linear infinite",
  },
  resultCard: {
    background: "#fff", borderRadius: 14, padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  resultTitle: { fontSize: 17, fontWeight: 700, color: "#2e7d32", marginBottom: 16 },
  resultStats: { display: "flex", gap: 10, marginBottom: 16 },
  resultStat: (bg, color) => ({ flex: 1, background: bg, borderRadius: 12, padding: "12px 0", textAlign: "center" }),
  resultNum: (color) => ({ fontSize: 24, fontWeight: 700, color }),
  resultLbl: { fontSize: 12, color: "#666", marginTop: 2 },
  detailSection: { marginBottom: 14 },
  detailTitle: (color) => ({ fontSize: 13, fontWeight: 700, color, marginBottom: 8 }),
  doneBtn: {
    width: "100%", padding: "13px 0",
    background: "#1a1a2e", color: "#fff",
    border: "none", borderRadius: 12,
    fontSize: 15, fontWeight: 600, cursor: "pointer",
    marginTop: 8,
  },
};

const s_list = {
  addedRow: { display: "flex", gap: 10, padding: "6px 10px", background: "#f1f8f1", borderRadius: 8, marginBottom: 4, alignItems: "center" },
  skippedRow: { display: "flex", gap: 10, padding: "6px 10px", background: "#fff8e1", borderRadius: 8, marginBottom: 4, alignItems: "center" },
  roll: { fontSize: 12, fontWeight: 700, color: "#1a1a2e", minWidth: 80 },
  name: { fontSize: 13, color: "#555", flex: 1 },
  photo: { fontSize: 14 },
};

export default UploadZip;