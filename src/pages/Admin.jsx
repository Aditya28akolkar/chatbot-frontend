
import { useState, useEffect } from "react";
import {
  uploadPdf,
  getDocuments,
} from "../services/adminService";

function Admin() {
  const [file, setFile] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [documents, setDocuments] =
    useState([]);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const data =
        await getDocuments();

      setDocuments(
        data.documents || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert(
        "Please select a PDF file"
      );
      return;
    }

    try {
      setLoading(true);

      const data =
        await uploadPdf(file);

      setResult(data);

      await loadDocuments();

      setFile(null);

    } catch (error) {
      console.log(error);

      alert(
        "Upload failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "#f4f7fb",
        padding: "40px",
        fontFamily:
          "Arial, sans-serif",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#7c3aed)",
          color: "white",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "30px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            margin: 0,
          }}
        >
          📄 GST AI Admin Dashboard
        </h1>

        <p
          style={{
            marginTop: "10px",
          }}
        >
          Manage company documents,
          knowledge base and vector
          search system
        </p>
      </div>

      {/* STATS */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            flex: 1,
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>
            📚 Documents
          </h3>

          <h1
            style={{
              color: "#2563eb",
            }}
          >
            {documents.length}
          </h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            flex: 1,
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>
            🤖 Vector Search
          </h3>

          <h1
            style={{
              color: "#10b981",
            }}
          >
            Active
          </h1>
        </div>
      </div>

      {/* UPLOAD CARD */}

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "20px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <h2>
          📤 Upload Document
        </h2>

        <p>
          Upload PDF files to
          index them into the
          knowledge base.
        </p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
          style={{
            marginTop: "10px",
          }}
        />

        {file && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              background:
                "#f8fafc",
              borderRadius: "8px",
            }}
          >
            📄 {file.name}
          </div>
        )}

        <button
          onClick={
            handleUpload
          }
          disabled={
            loading
          }
          style={{
            marginTop: "20px",
            background:
              "#2563eb",
            color: "white",
            border: "none",
            padding:
              "12px 24px",
            borderRadius:
              "10px",
            cursor:
              "pointer",
            fontSize: "16px",
            fontWeight:
              "bold",
          }}
        >
          {loading
            ? "⏳ Uploading..."
            : "📤 Upload PDF"}
        </button>

        {result && (
          <div
            style={{
              marginTop:
                "20px",
              background:
                "#ecfdf5",
              border:
                "1px solid #10b981",
              padding:
                "15px",
              borderRadius:
                "10px",
            }}
          >
            <h3>
              ✅ Upload Success
            </h3>

            <p>
              <strong>
                File:
              </strong>{" "}
              {
                result.filename
              }
            </p>

            <p>
              <strong>
                Text Length:
              </strong>{" "}
              {
                result.text_length
              }
            </p>
          </div>
        )}
      </div>

      {/* DOCUMENT LIST */}

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "20px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>
          📂 Uploaded Documents
        </h2>

        {documents.length ===
        0 ? (
          <p>
            No documents
            uploaded yet.
          </p>
        ) : (
          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(250px,1fr))",
              gap: "15px",
              marginTop:
                "20px",
            }}
          >
            {documents.map(
              (
                doc,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  style={{
                    background:
                      "#f8fafc",
                    padding:
                      "15px",
                    borderRadius:
                      "12px",
                    border:
                      "1px solid #e2e8f0",
                  }}
                >
                  📄 {doc}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;

