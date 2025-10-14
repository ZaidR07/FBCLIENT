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
      fill="#FFF"
      className="ml-auto absolute right-3 cursor-pointer"
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
    <div className="fixed top-[10vh] right-0 h-[90vh] bg-[#FF5D00] w-[70vw] shadow-2xl px-[10%] pb-[4vh] pt-2 z-10 font-semibold">
      <CloseIcon onClick={onClose} />

      <form
        className="space-y-6 mt-10 text-[#FFF] "
        onSubmit={onSubmit}
      >
        <div>
          <h1 className="text-center text-2xl text-[#FFF] font-bold mb-4 ">
            Update Broker
          </h1>
          <label className="w-full" htmlFor="">
            Broker Name
          </label>
          <input
            name="brokername"
            value={formdata.brokername}
            onChange={onChange}
            className="bg-transparent border-b-2 border-[#FFF] text-white font-light w-full"
          />
        </div>
        <div>
          <label className="" htmlFor="">
            Company Name
          </label>
          <input
            name="companyname"
            value={formdata.companyname}
            onChange={onChange}
            className="bg-transparent border-b-2 border-[#FFF] text-white font-light w-full"
          />
        </div>
        <div>
          <label className="" htmlFor="">
            Email ID
          </label>
          <input
            name="emailid"
            value={formdata.emailid}
            onChange={onChange}
            className="bg-transparent border-b-2 border-[#FFF] text-white font-light w-full"
          />
        </div>
        <div>
          <label className="" htmlFor="">
            Primary Mobile
          </label>
          <input
            name="mobile1"
            value={formdata.mobile1}
            onChange={onChange}
            className="bg-transparent border-b-2 border-[#FFF] text-white font-light w-full"
          />
        </div>
        <div>
          <label className="" htmlFor="">
            Secondary Mobile
          </label>
          <input
            name="mobile2"
            value={formdata.mobile2}
            onChange={onChange}
            className="bg-transparent border-b-2 border-[#FFF] text-white font-light"
          />
        </div>
        <div>
          <label className="" htmlFor="">
            Address
          </label>
          <input
            name="address"
            value={formdata.address}
            onChange={onChange}
            className="bg-transparent border-b-2 border-[#FFF] text-white font-light"
          />{" "}
        </div>

        <input
          type="submit"
          value="Update"
          className="px-4 py-2 border-2 border-white rounded-xl cursor-pointer"
        />
      </form>
    </div>
  );
};
