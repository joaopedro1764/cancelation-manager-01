export function CancelationInPeriodSkeleton() {

    return (

        <div className="p-4 sm:p-6 space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="h-6 bg-gray-200 rounded w-48"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </div>
                        <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                ))}
            </div>

            {/* Chart Skeleton */}
            <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-40"></div>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="h-4 bg-gray-200 rounded w-48"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="h-3 bg-gray-300 rounded-full"
                                style={{ width: `${Math.random() * 80 + 20}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );


}