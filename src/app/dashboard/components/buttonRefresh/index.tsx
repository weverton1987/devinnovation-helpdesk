"use client"

import { useRouter } from 'next/navigation';
import { FiRefreshCcw } from 'react-icons/fi';

export function ButtonRefresh() {
    const router = useRouter();

    function handleRefresh() {
        router.refresh();
    }

    return (
        <button onClick={handleRefresh} className="p-2 rounded-md hover:bg-gray-100">
            <FiRefreshCcw size={24} color='#3B82F6'/>
        </button>
    );
}
