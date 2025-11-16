"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { X } from "lucide-react";
import { validateAdminPasskey } from "@/lib/actions/admin.actions";

interface PasskeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasskeyModal = ({ isOpen, onClose }: PasskeyModalProps) => {
  const router = useRouter();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPasskey("");
      setError("");
    }
  }, [isOpen]);

  const closeModal = () => {
    setPasskey("");
    setError("");
    onClose();
  };
const handleValidatePasskey = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
    // Server-side validation - passkey never exposed to client
    const result = await validateAdminPasskey(passkey);

    if (result.success) {
      // ✅ Set session flag after successful validation
      if (typeof window !== "undefined") {
        sessionStorage.setItem("admin_verified", "true");
      }
      closeModal();
      router.push("/admin");
    } else {
      setError(result.error || "Invalid passkey. Please try again.");
    }
  } catch (error) {
    setError("An error occurred. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogTitle>
          <DialogDescription>
            To access the admin page, please enter the passkey.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
            disabled={isLoading}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleValidatePasskey}
              className="shad-primary-btn w-full"
              disabled={passkey.length !== 6 || isLoading}
            >
              {isLoading ? "Verifying..." : "Enter Admin Passkey"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasskeyModal;

