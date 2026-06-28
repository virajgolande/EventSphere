import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const Scanner = () => {
  const navigate = useNavigate();

  const scannerRef = useRef(null);
  const startedRef = useRef(false);
  const scannedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;

    startedRef.current = true;

    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;

    const startScanner = async () => {
      try {
        const cameras = await Html5Qrcode.getCameras();

        if (!cameras.length) {
          alert("No camera found.");
          return;
        }

        await html5QrCode.start(
          cameras[0].id,
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
          },
          async (decodedText) => {
            // Prevent duplicate scans
            if (scannedRef.current) return;
            scannedRef.current = true;

            const ticketId = decodedText.split("/").pop();

            try {
              if (html5QrCode.isScanning) {
                await html5QrCode.stop();
              }

              await html5QrCode.clear();
            } catch (error) {
              console.log(error);
            }

            navigate(`/verify/${ticketId}`, {
              replace: true,
            });
          },
          () => {}
        );
      } catch (err) {
        console.error(err);
        alert(err?.message || "Unable to access camera.");
      }
    };

    startScanner();

    return () => {
      // Only stop the scanner if the page is closed
      // before a QR code has been scanned.
      if (!scannedRef.current && scannerRef.current) {
        scannerRef.current
          .stop()
          .catch(() => {})
          .finally(() => {
            scannerRef.current.clear().catch(() => {});
          });
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold text-white mb-8">
        Scan Ticket
      </h1>

      <div
        id="reader"
        className="w-full max-w-md bg-white rounded-2xl overflow-hidden"
      />

      <p className="text-gray-400 mt-6 text-center">
        Point your camera at the attendee's QR code.
      </p>
    </div>
  );
};

export default Scanner;