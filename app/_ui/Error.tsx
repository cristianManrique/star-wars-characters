interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="text-center py-12 text-sp-red">
      <p className="font-semibold">Connection error</p>
      <p className="text-sm mt-1">{message || "Something is wrong..."} 😮</p>
    </div>
  );
};

export default Error;
