"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PasscodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (passcode: string) => boolean;
}

export function PasscodeDialog({ isOpen, onClose, onSubmit }: PasscodeDialogProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = onSubmit(passcode);
    if (!isValid) {
      setError(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-normal text-gray-700">Enter Passcode</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <Input
            type="password"
            placeholder="Enter passcode"
            value={passcode}
            onChange={(e) => {
              setPasscode(e.target.value);
              setError(false);
            }}
            className={`w-full p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-200'}`}
          />
          {error && (
            <p className="text-red-500 text-sm">Incorrect passcode. Please try again.</p>
          )}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-black hover:bg-black/90 text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}