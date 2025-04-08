import Image from 'next/image';

export default function Home() {
  const documentData = {
    side1: '/NIC-1.png',  // Replace with actual image paths
    side2: '/NIC-2.png',
    firstName: 'John',
    lastName: 'Wick',
    dob: '27-1-2000',
    gender: 'Male',
    citizen: 'Estonia',
    issueDate: '27-1-2018',
    expiryDate: '27-1-2027',
  };

  return (
    <div className=" bg-gray-100 py-10 flex justify-center items-center">
      <div className="max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Documents</h2>
        <div className="flex space-x-8">
          <div className="w-1/2">
            <Image
              src={documentData.side1}
              alt="Document Side 1"
              className="w-full h-auto rounded-lg"
              width={300}
              height={200}
            />
            <h3 className="text-sm font-medium text-gray-600 mt-2">Side 01</h3>
          </div>
          <div className="w-1/2">
            <Image
              src={documentData.side2}
              alt="Document Side 2"
              className="w-full h-auto rounded-lg"
              width={300}
              height={200}
            />
            <h3 className="text-sm font-medium text-gray-600 mt-2">Side 02</h3>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4">Document Details</h2>
        <div className="flex">
          <div className="w-1/2 grid grid-cols-2 gap-y-4 text-sm text-gray-700">
            <div className="font-medium">First Name:</div>
            <div>{documentData.firstName}</div>

            <div className="font-medium">Last Name:</div>
            <div>{documentData.lastName}</div>

            <div className="font-medium">Date of Birth:</div>
            <div>{documentData.dob}</div>

            <div className="font-medium">Gender:</div>
            <div>{documentData.gender}</div>

            <div className="font-medium">Citizen:</div>
            <div>{documentData.citizen}</div>

            <div className="font-medium">Issue Date:</div>
            <div>{documentData.issueDate}</div>

            <div className="font-medium">Expiry Date:</div>
            <div>{documentData.expiryDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
