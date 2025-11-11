import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function QRCodeModal({ open, onClose, slug }) {
  const [qrSrc, setQrSrc] = useState("");

  useEffect(() => {
    if (open && slug) {
      axiosClient.get(`/api/qr/${slug}`, { withCredentials: true })
        .then((res) => setQrSrc(res.data.qrCode))
        .catch(() => setQrSrc(""));
    }
  }, [open, slug]);

  const downloadQR = () => {
    const a = document.createElement("a");
    a.href = qrSrc;
    a.download = `${slug}-qr.png`;
    a.click();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-900 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>QR Code for /{slug}</DialogTitle>
        </DialogHeader>

        {qrSrc ? (
          <div className="flex flex-col items-center gap-4">
            <img src={qrSrc} alt="QR Code" className="w-48 h-48" />
            <Button onClick={downloadQR}>Download QR</Button>
          </div>
        ) : (
          <p>Generating QR...</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
