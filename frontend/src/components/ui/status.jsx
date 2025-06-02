const Status = ({ status }) => {
  let statusClass = '';

  if (status === "Active") {
    statusClass = 'text-lime-900 px-4 py-1/2 bg-green-200 rounded-full';
  } else if (status === "Pending") {
    statusClass = 'text-yellow-900 px-4 py-1/2 bg-yellow-200 rounded-full';
  } else {
    statusClass = 'text-red-900 px-4 py-1/2 bg-red-200 rounded-full';
  }

  return (
    <span className={`font-bold ${statusClass}`}>
      {status || "Inactive"} 
    </span>
  );
};

export default Status;
