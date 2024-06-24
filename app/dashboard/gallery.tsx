import moment from 'moment';
import Image from 'next/image';

export default function Gallery({images, onDelete}: any) {
  return (
    <>
      <h5 className="text-xl font-bold mb-8 mb-22">Your Gallery</h5>
      <div className="container mx-auto">
        {images?.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images?.map((image: any, index: number) => (
            <div key={image.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full h-64">
                <Image
                  src={image.image}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-md"
                />
                </div>
              <div className='flex justify-between p-4 items-center'>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{image.mimeType}</h2>
                  <p className="text-sm text-gray-600">{moment(image.createdAt).format('DD MMMM YYYY')}</p>
                </div>
                <div>
                <Image
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert cursor-pointer"
                  src="/delete.png"
                  alt="Delete"
                  width={30}
                  height={30}
                  onClick={() => onDelete(image._id)}
                />
                </div>
              </div>
            </div>
          ))}
        </div> : 
        <div>No images found</div>}
      </div>
    </>
  );
}
