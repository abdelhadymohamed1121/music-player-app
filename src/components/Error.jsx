const Error = ({ title }) => (
  <div className="w-full flex justify-center items-center">
    <h1 className="font-bold text-2xl text-white">
      {title ? title : 'Something went wrong Please try again'}
    </h1>
  </div>
);

export default Error;
