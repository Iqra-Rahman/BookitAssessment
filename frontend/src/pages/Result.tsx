import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const status = query.get('status');

  return (
    <div className="text-center mt-10">
      {status === 'success' ? (
        <>
          <h2 className="text-green-600 text-2xl font-bold">Booking Confirmed!</h2>
          <p>Check your email for confirmation.</p>
        </>
      ) : (
        <>
          <h2 className="text-red-600 text-2xl font-bold">Booking Failed!</h2>
          <p>Please try again later.</p>
        </>
      )}
      <button
        onClick={() => navigate('/')}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Result;
