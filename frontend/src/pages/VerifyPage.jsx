import React from "react";
import { useSearchParams } from "react-router-dom";

const VerifyPage = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success") === "true";
    const orderId = searchParams.get("orderId");

    const styles = {
        page: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "linear-gradient(to bottom, #f9f9f9, #ffffff)",
            fontFamily: "Arial, sans-serif",
            color: "#333",
        },
        messageBox: {
            textAlign: "center",
            padding: "30px",
            borderRadius: "10px",
            background: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "500px",
            width: "90%",
        },
        heading: {
            fontSize: "2rem",
            marginBottom: "20px",
            color: success ? "#28a745" : "#dc3545",
        },
        text: {
            fontSize: "1rem",
            margin: "10px 0",
        },
        orderId: {
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "#555",
            margin: "20px 0",
            wordWrap: "break-word",
        },
        button: {
            padding: "10px 20px",
            fontSize: "1rem",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
            textDecoration: "none",
        },
        buttonHover: {
            backgroundColor: "#0056b3",
        },
    };

    return (
        <div style={styles.page}>
            <div style={styles.messageBox}>
                <h1 style={styles.heading}>
                    {success ? "🎉 Payment Successful!" : "❌ Payment Failed!"}
                </h1>
                <p style={styles.text}>Order ID:</p>
                <p style={styles.orderId}>{orderId}</p>
                <button
                    style={styles.button}
                    onClick={() => (window.location.href = "/")}
                >
                    Go Back to Home
                </button>
            </div>
        </div>
    );
};

export default VerifyPage;
