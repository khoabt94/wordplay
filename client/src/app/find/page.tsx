
import React, { Suspense } from 'react'
import FindForm from '../../lib/find/find-form';
import OpponentList from '../../lib/opponent';

export default function FriendPage() {
  return (
    <div className="w-full grid grid-cols-[7fr_3fr] gap-x-5 h-full">
      <div className="w-full bg-gray-900 rounded-lg p-4 h-full">
        <h3 className='font-bold text-xl pb-4 border-b-[1px] border-b-gray-700'>Select mode</h3>
        <Suspense>
          <FindForm />
        </Suspense>
      </div>
      <div className="w-full bg-gray-900 rounded-lg p-4 h-full">
        <h3 className='font-bold text-xl pb-4 border-b-[1px] border-b-gray-700'>Opponents</h3>
        <Suspense>
          <OpponentList />
        </Suspense>
      </div>
    </div >
  );
}
