"use client";

interface CreditModalProps {
  isOpen: boolean;
  brokerId: string;
  creditCount: string;
  validityOption: string;
  onClose: () => void;
  onCreditCountChange: (value: string) => void;
  onValidityChange: (value: string) => void;
  onSave: () => void;
  isSending: boolean;
}

export const CreditModal = ({
  isOpen,
  brokerId,
  creditCount,
  validityOption,
  onClose,
  onCreditCountChange,
  onValidityChange,
  onSave,
  isSending,
}: CreditModalProps) => {
  if (!isOpen) return null;

  const getExpiryDate = () => {
    const d = new Date();
    if (validityOption === "2m") d.setMonth(d.getMonth() + 2);
    else if (validityOption === "6m") d.setMonth(d.getMonth() + 6);
    else d.setFullYear(d.getFullYear() + 1);
    return d.toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Give Credits</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Broker ID</label>
            <input
              value={brokerId}
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Number of Credits</label>
            <input
              type="number"
              min={1}
              value={creditCount}
              onChange={(e) => onCreditCountChange(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. 199"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Validity</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={validityOption}
              onChange={(e) => onValidityChange(e.target.value)}
            >
              <option value="2m">2 Months</option>
              <option value="6m">6 Months</option>
              <option value="1y">1 Year</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Expires on: {getExpiryDate()}
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              className="px-4 py-2 rounded border"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-[#FF5D00] text-white"
              onClick={onSave}
              disabled={isSending}
            >
              {isSending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
