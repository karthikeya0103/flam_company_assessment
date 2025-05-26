import Link from 'next/link';
import Image from 'next/image';
import RatingStars from './RatingStars';

export default function UserCard({ user, isBookmarked, onBookmark, onUnbookmark, onPromote }) {
  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      onUnbookmark(user);
    } else {
      onBookmark(user);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <Image 
            src={user.image} 
            alt={`${user.firstName} ${user.lastName}`}
            width={60}
            height={60}
            className="rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">{user.firstName} {user.lastName}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{user.email}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Age: {user.age}</span>
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded">
              {user.department}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Performance:</span>
            <RatingStars rating={user.performanceRating} />
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <Link 
            href={`/employee/${user.id}`}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            View
          </Link>
          <button 
            onClick={handleBookmarkToggle}
            className={`px-3 py-1.5 text-sm rounded transition ${
              isBookmarked 
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          <button 
            onClick={() => onPromote(user.id)}
            className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
          >
            Promote
          </button>
        </div>
      </div>
    </div>
  );
}
