"use client";

interface BrokerFormData {
  broker_id: string;
  brokername: string;
  companyname: string;
  emailid: string;
  mobile1: string;
  mobile2: string;
  address: string;
}

interface BrokerUpdateDrawerProps {
  isOpen: boolean;
  formdata: BrokerFormData;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const CloseIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      width={35}
      fill="#FF5D00"
      className="cursor-pointer"
      onClick={onClick}
    >
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
    </svg>
  );
};

export const BrokerUpdateDrawer = ({
  isOpen,
  formdata,
  onClose,
  onChange,
  onSubmit,
}: BrokerUpdateDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000000]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative h-full w-full flex items-start justify-center pt-[12vh] px-4 sm:px-6">
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl border overflow-hidden">
          <div className="flex items-center justify-between px-5 lg:px-6 py-4 border-b">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Update Broker</h2>
            <CloseIcon onClick={onClose} />
          </div>
          <form onSubmit={onSubmit} className="p-5 lg:p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Broker ID</label>
                <input
                  name="broker_id"
                  value={formdata.broker_id}
                  disabled
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 text-gray-600 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Broker Name</label>
                <input
                  name="brokername"
                  value={formdata.brokername}
                  onChange={onChange}
                  className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Company Name</label>
                <input
                  name="companyname"
                  value={formdata.companyname}
                  onChange={onChange}
                  className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email ID</label>
                <input
                  name="emailid"
                  value={formdata.emailid}
                  onChange={onChange}
                  className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Primary Mobile</label>
                <input
                  name="mobile1"
                  value={formdata.mobile1}
                  onChange={onChange}
                  className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Secondary Mobile</label>
                <input
                  name="mobile2"
                  value={formdata.mobile2}
                  onChange={onChange}
                  className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 px-3 py-2 text-sm"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                <input
                  name="address"
                  value={formdata.address}
                  onChange={onChange}
                  className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700">Cancel</button>
              <button type="submit" className="px-5 py-2 rounded-lg bg-[#FF5D00] text-white hover:bg-[#e45500]">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
