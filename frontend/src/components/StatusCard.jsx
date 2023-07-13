import React from 'react'

export const StatusCard = () => {
    return (
        <div>
            <div className='bg-red-500 shadow-black shadow-lg w-1/3 mx-auto p-10 my-4 rounded-md'>
                <ul className='mx-auto '>
                    <li>
                        <strong>Status:0</strong>  Rejected
                    </li>
                    <li>
                        <strong>Status:1</strong>  Waiting for Approval
                    </li>
                    <li>
                        <strong>Status:2</strong>  Accepted
                    </li>
                </ul>
            </div>
        </div>
    )
}
